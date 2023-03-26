<!--
 * @Author: SukiYuSijing 15767301655@163.com
 * @Date: 2023-03-26 18:49:43
 * @LastEditors: SukiYuSijing 15767301655@163.com
 * @LastEditTime: 2023-03-26 19:10:16
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
  setup() {
    try {
      aa();
      aa(() => {
        const a = "b";
        const a1 = "b";
        const a2 = "b";
        const a3 = "b";
        const a4 = "b";
        return a;
      })?.catch((err) => err);
      cc().then();
      cc().then();
      bb().then();
      aa().then();
    } catch (error) {}
  },
});
import { defineComponent1 } from "@vue/composition-api";
</script>

<style scoped="">
.read-the-docs {
  color: #888;
}
</style>
