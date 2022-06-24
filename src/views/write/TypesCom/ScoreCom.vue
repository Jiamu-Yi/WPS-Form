<template>
  <div class="answer">
    <a-rate v-model:value="result"/>
    <template v-if="result">
      <span class="ant-rate-text">{{ result }}.0分</span>
    </template>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, toRef} from "vue";

export default defineComponent({
  name: 'score-com',
  props: ["formItem"],
  setup(props) {

    let formItem = toRef(props, 'formItem');

    const result = computed({
      get: () => {
        return formItem.value.result ? formItem.value.result.value : 0;
      },
      set: (newValue) => {
        formItem.value.result = {value: newValue};
      },
    });

    return {
      result
    }
  }
})
</script>

<style lang="scss" scoped>
.answer {
  display: flex;
  height: 100%;
}

:deep(.ant-rate) {
  color: #f8d61d !important;
  font-size: 16px;
}
</style>
