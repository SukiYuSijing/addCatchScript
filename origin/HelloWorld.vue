<!--
 * @Author: SukiYuSijing 15767301655@163.com
 * @Date: 2023-03-26 18:49:43
 * @LastEditors: SukiYuSijing 15767301655@163.com
 * @LastEditTime: 2023-04-01 18:40:17
 * @FilePath: \astTransform\origin\HelloWorld.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup="">
import { ref } from "./vue";
defineProps({
  msg: String,
});
const count = ref(0);
console.log(import.meta, import.meta.env);
const url = import.meta.env.VITE_APP_HOST;
</script>

<template>
  <h1>{{ 111111 + url }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
</template>
<script>
import { ref } from "vue";
defineProps({
  msg: String,
});
const count = ref(0);
console.log(import.meta, import.meta.env);
const url = import.meta.env.VITE_APP_HOST;
import { defineComponent } from "@vue/composition-api";
import { aa, bb, cc } from "./common/apis";
export default defineComponent({
  async setup() {
    try {
      bb({ a: 1, b });
      bb({ a: 1, b }).then((a) => {
        a--;
        return a + "N1111";
      });
      await aa({ a: 1, b }).then((a) => {
        return a + "N";
      });
      await aa({ a: 1, b });
    } catch (error) {}
    await aa({ a: 1, b }).then();
  },
});
import { defineComponent1 } from "@vue/composition-api";
</script>

<style scoped="">
.read-the-docs {
  color: #888;
}
</style>
