<template>
  <a-radio-group v-model:value="result" style="width: 100% ; display: flex;flex-wrap: wrap;">
    <a-radio
      :value="option"
      v-for="(option) in options"
      :key="option.id"
      class="option"
    >{{ option.title }}
    </a-radio>
  </a-radio-group>
</template>

<script lang="ts">
import {computed, defineComponent, toRef} from "vue";

export default defineComponent({
  name: 'single-select-com',
  props: ["formItem"],
  setup(props) {
    let formItem = toRef(props, 'formItem');
    const options = computed(() => {
      return formItem.value.setting.options ? formItem.value.setting.options : [];
    });
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

.option {
  width: 50%;
  margin: 0.5em 0;
}
</style>
