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
      cc();
      cc();
      bb();
      aa();
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
