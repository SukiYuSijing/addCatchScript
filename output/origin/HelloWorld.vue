<script setup="">import { ref } from './vue';
defineProps({
  msg: String
});
const count = ref(0);
console.log(import.meta, import.meta.env);
const url = import.meta.env.VITE_APP_HOST;</script>

<template>
  <h1>地址：{{ url }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
</template>
<script>import { ref } from 'vue';
defineProps({
  msg: String
});
const count = ref(0);
console.log(import.meta, import.meta.env);
const url = import.meta.env.VITE_APP_HOST;
import { defineComponent } from '@vue/composition-api';
import { getData1, getData2, getData3 } from './common/apis';
export default defineComponent({
  async setup() {
    try {
      getData2({
        a: 1,
        b
      })?.catch(err => {
        message.error(err.msg || "this.$message");
      });
      getData2({
        a: 1,
        b
      }).then(a => {
        a--;
        return a + 'N1111';
      })?.catch(err1 => {
        message.error(err1.msg || "this.$message");
      });
      await getData1({
        a: 1,
        b
      }).then(a => {
        return a + 'N';
      }).catch(err1 => {
        message.error(err1.msg || "this.$message");
      });
      await getData1({
        a: 1,
        b
      }).catch(err1 => {
        message.error(err1.msg || "this.$message");
      }).catch(err1 => {
        message.error(err1.msg || "this.$message");
      });
    } catch (error) {}
    await getData1({
      a: 1,
      b
    }).then().catch(err1 => {
      message.error(err1.msg || "this.$message");
    });
  }
});
import { defineComponent1 } from '@vue/composition-api';</script>

<style scoped="">
.read-the-docs {
  color: #888;
}
</style>
