<template>
  <div class="answer">
    <a-date-picker
      :picker="options === 1 ? 'week' : ''"
      :show-time="options === 3"
      v-model:value="result"
      placeholder="请输入"
      :bordered="false"
      :showNow=false
      format=""
    >
    </a-date-picker>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, toRef} from "vue";

export default defineComponent({
  name: 'date-com',
  props: ["formItem"],
  setup(props) {
    let formItem = toRef(props, 'formItem');
    const options = computed(() => {
      return formItem.value.setting.options ? formItem.value.setting.options[0].status : 1;
    })
    const result = computed({
      get: () => {
        return formItem.value.result ? formItem.value.result.value : '';
      },
      set: (newValue) => {
        formItem.value.result = {value: newValue};
      },
    });

    return {
      result,
      options
    }
  }
})
</script>

<style lang="scss" scoped>
.answer {
  display: flex;
  border-bottom: #e8ebee 1px solid;
}

:hover {
  border-bottom: #1488ed 1px solid;
}

:deep(.ant-picker) {
  width: 100%;
  padding: 0;

  .ant-picker-input {
    flex-direction: row-reverse !important;
    width: 100%;
  }

  ::placeholder {
    color: #7d838b;
  }

  .ant-picker-suffix {
    margin: 0 8px 0 0;
    color: #7d838b;
  }
}
</style>
