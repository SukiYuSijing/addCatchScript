<script setup="">import { ref } from "./vue";
defineProps({
  msg: String
});
const count = ref(0);
console.log(import.meta, import.meta.env);
const url = import.meta.env.VITE_APP_HOST;</script>

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
<script>import { ref } from "vue";
defineProps({
  msg: String
});
const count = ref(0);
console.log(import.meta, import.meta.env);
const url = import.meta.env.VITE_APP_HOST;
import { defineComponent } from "@vue/composition-api";
import { aa, bb, cc } from "./common/apis";
export default defineComponent({
  setup() {
    try {
      aa().then(err => err)?.then()?.catch(err1 => {
        message.error(err1.msg || "this.$message");
      });
      aa()?.catch(err => {
        message.error(err.msg || "this.$message");
      });
      cc().then(err => err)?.catch(err1 => {
        message.error(err1.msg || "this.$message");
      });
      cc()?.catch(err => {
        message.error(err.msg || "this.$message");
      });
      bb()?.catch(err => {
        message.error(err.msg || "this.$message");
      });
      aa()?.catch(err => {
        message.error(err.msg || "this.$message");
      });
    } catch (error) {}
  }
});
import { defineComponent1 } from "@vue/composition-api";</script>

<style scoped="">
.read-the-docs {
  color: #888;
}
</style>
