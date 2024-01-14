# 背景

由于最近在项目上碰到了一个问题，测试反馈有些接口报错时没有显示的提示，后来查看项目的代码，发现有一半的接口没有做catch的捕获


# 分析
相关代码的结构大概是这样的

- commonFetch主要是处理了响应码
``` 
// 这是同一拦截文件，主要是处理status的
function commonFetch(options = {}) {
    const { url, method, params } = options
    return fetch(url, {
        method,// *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(params) // body data type must match "Content-Type" header
    }).then(res => {
        return res.json(); // parses JSON response into native JavaScript objects
    }).then(res => {
        //处理res.status
        if (res.status !== 200) {
            if(res.status===401){}
            if(res.status===404){}
            if(res.status===500){}
            else {
              return Promise.reject()
            }
        }
        return res.json(); // parses JSON response into native JavaScript objects
    }).catch(err => {
        return Promise.reject()
    });
}
```
- 各个请求后端的接口又在方法里面独自处理了错误，但由于前期缺少规范且任务比较重，就造成了处理错误的方式不统一或者说遗漏

1. 第一个请求接口方法

```
//  getPerson没有处理catch的逻辑
function getPerson(params){
    return  commonFetch({url:"getPerson",methods:"get",params}).then(res=>{
        if(res.code!== 0) {
            return Promise.reject(res?.msg)
        }
        else return res.data
    }) 
}
```

2 . 第二个请求接口方法

```
//  submitForm处理了catch的逻辑
function submitForm(params){
    return  commonFetch({url:"submit",methods:"post",params}).then(res=>{
        if(res.code!== 200) {
             message.error("提交失败")
             return null
        }
        else return res.data
    }).catch(error=>{
        message.error(error)
})
}
```
3 . 第三个
```
//  getProductList没有任何处理
function getProductList(params){
    return  commonFetch({url:"product-list",methods:"get",params})
}
```

  上面的三个请求接口的方法在vue文件中被调用,但promise的处理各不相同（实际项目中这种方法估计有超过五十个）

```
// 调用getPerson时也没有catch的处理,但其实是需要的
// getPerson在不同的vue文件调用了多次
getPerson({userCode:12345}).then(data=>{
    // 调用下一个接口或处理其他数据
})
getPerson({userCode:12345})
//调用getPerson时处理了
getPerson({userCode:12345}).then(data=>{
    // 调用下一个接口或处理其他数据
}).catch(error=>{
    message.error(err.msg)
})
getPerson({userCode:12345}).catch(error=>{
    message.error(err.msg)
})
// 调用submitForm时不需要catch的处理
submitForm({name:'张三',gender:"male"}).then(data=>{
    // 调用下一个接口或处理其他数据
})
// getProductList在不同的vue文件调用了多次 
// 需要catch的处理,但没有catch处理
 getProductList({catagory:"seefoods"})
 getProductList({catagory:"seefoods"}).then(data=>{
    // 调用下一个接口或处理其他数据
})
// 使用了catch处理。弹出了错误提示
getProductList({catagory:"seefoods"}).catch(err=>{
    message.error(err.msg)
})
getProductList({catagory:"seefoods"}).then().catch(err=>{
    message.error(err.msg)
})
```

这就导致了上面在背景中提到的问题，当请求接口的状态码为200，但是业务码不为0或200（本项目定义了请求成功的业务码为0或200）时，有的请求方法完全没有catch的处理，例如上面说到的getPerson和getProductList（实际项目中，这样的接口有几十个），也就没有message.error(error.msg)的错误提示

# 解决构思

从理想实现方法来说，当然是希望在请求后端接口的方法内部做好处理，commonFetch后面应该有then和catch的处理
但对于历史遗留的问题，下面列出的现状使得上诉的合理方法会导致更多的bug和更繁重的重构压力
1. 这类的请求接口的方法非常多，
2. 一个方法有可能被调用了数次，
3. 每次处理调用结果的方式也不一样，例如上面的getProductList这个方法的调用，就有三种处理结果的方式
```
 getProductList({catagory:"seefoods"})
 getProductList({catagory:"seefoods"}).then(data=>{
    // 调用下一个接口或处理其他数据
})
getProductList({catagory:"seefoods"}).catch(err=>{
    message.error(err.msg)
})
```


那现在如果要快速解决这个问题，修改处理调用结果方式相关的代码会比较合理

```
// as is 调用getPerson时也没有catch的处理,但其实是需要的 to be加上了catch
// getPerson在不同的vue文件调用了多次
getPerson({userCode:12345}).then(data=>{
    // 调用下一个接口或处理其他数据
})?.catch(error=>{
        message.error(error)
})
getPerson({userCode:12345})?.catch(error=>{
        message.error(error)
})
// 调用submitForm时不需要catch的处理,但加上了也不会造成新的问题
submitForm({name:'张三',gender:"male"}).then(data=>{
    // 调用下一个接口或处理其他数据
})?.catch(error=>{
        message.error(error)
})
// getProductList在不同的vue文件调用了多次 
// as is 需要catch的处理,但没有catch处理 to be 加上了catch
getProductList({catagory:"seefoods"}).catch(err=>{
    message.error(err.msg)
})
 getProductList({catagory:"seefoods"}).then(data=>{
    // 调用下一个接口或处理其他数据
})?.catch(error=>{
        message.error(error)
})
// 使用了catch处理。弹出了错误提示,不需要再次加catch了
getProductList({catagory:"seefoods"}).catch(err=>{
    message.error(err.msg)
})
getProductList({catagory:"seefoods"}).then().catch(err=>{
    message.error(err.msg)
})
```
上面的代码能解决绝大多数的接口方法的问题，但的确产生了一些多余的代码，
例如submitForm这个方法，其实已经在内部用catch处理的错误，其实不需要再加上catch
```
// 调用submitForm时不需要catch的处理,但加上了也不会造成新的问题，因为内部处理了错误，所以这里是不会执行到catch里面的
submitForm({name:'张三',gender:"male"}).then(data=>{
    // 调用下一个接口或处理其他数据
})?.catch(error=>{
        message.error(error)
})
```

# 转换代码 
### 转换原理

下面用上面的getProductList举例子


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8b8306c919c466995d9728761b04891~tplv-k3u1fbpfcp-watermark.image?)
上面的函数通过babel.parse和babel.traverse，我们可以识别出哪些缺少了catch，那就需要找到前面的代码,进行替换
****
**定义两份模版代码**

红框内的方法会被上面蓝框内的代码替换，并把替换后的模版代码代替原来的代码

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f83cfe70cc2c401c83cba926a9ee85a1~tplv-k3u1fbpfcp-watermark.image?)

就可以得到下面的代码了

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/842a6261db204b8f905ee697c19c8d8b~tplv-k3u1fbpfcp-watermark.image?)

而且通过ast中的ImportDeclaration这种节点的source判断，可以判断是不是对这些方法加上catch的处理，例如下图中，只对从common/apis这个路径获取的方法做处理，defineProps和ref并不会被处理

```
console.log(import.meta, import.meta.env);
import { defineComponent } from '@vue/composition-api';
//只有functionA, functionB, functionC会被处理
import { functionA, functionB, functionC } from './common/apis';
export default defineComponent({
  setup() {
    try {
      functionA().then(err => err)?.then()?.catch(err1 => {
        message.error(err1.msg || 'this.$message');
      });
      functionA()?.catch(err => {
        message.error(err.msg || 'this.$message');
      });
      functionC().then(err => err)?.catch(err1 => {
        message.error(err1.msg || 'this.$message');
      });
      functionC()?.catch(err => {
        message.error(err.msg || 'this.$message');
      });
      functionB()?.catch(err => {
        message.error(err.msg || 'this.$message');
      });
      functionA()?.catch(err => {
        message.error(err.msg || 'this.$message');
      });
    } catch (error) {}
  }
});</script>
```

### 转换代码

[git地址](https://github.com/SukiYuSijing/addCatchScript.git)

#### 不推荐写成打包插件的原因
1. 当然是写插件的排查错误难度比较大，转换后人工检查是否有些错漏的地方比较保险
2. 此次是为了解决历史遗留问题，不需要多次使用，后面应该定好规范和code review规范防范同样的纰漏
3. 转换脚本还不能很好地处理Promise.all,项目中有几处promise.all的地方还是要靠开发自己识别
```
Promise.all([getProductList,getPerson({userCode:12345}),submitForm({name:'张三',gender:"male"})])
```









