<script setup="">import { ref } from './vue';
defineProps({
  msg: String
});
const count = ref(0);
console.log(import.meta, import.meta.env);
const url = import.meta.env.VITE_APP_HOST;</script>

<template>
  <h1>{{ url }}</h1>

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
console.log(import.meta, import.meta.env);
import { defineComponent } from '@vue/composition-api';
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

<style scoped="">
.read-the-docs {
  color: #888;
}
</style>
