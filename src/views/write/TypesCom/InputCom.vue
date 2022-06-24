<template>
  <div class="answer">
    <input v-model="result" class="input" placeholder="请输入" type="text">
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, toRef} from "vue";

export default defineComponent({
  name: 'input-com',
  props: ["formItem"],
  setup(props) {
    let formItem = toRef(props, 'formItem');
    const result = computed({
      get: () => {
        return formItem.value.result ? formItem.value.result.value : '';
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
  margin-top: 8px;
  max-height: 440px;
  overflow-y: auto;
  width: 100%;

  .input {
    width: 100%;
    position: relative;
    font-size: 14px;
    line-height: 18px;
    font-weight: bold;
    color: #3d4757;
    padding: 8px 0 5px 0;
    border: none;
    border-bottom: 1px solid rgba(25, 55, 88, .1);
  }

  .input:focus {
    border-bottom: 1px solid rgba(25, 55, 88, .1);
    outline: none;
  }

  .input:hover {
    border-bottom: #1488ed 1px solid;
    outline: none;
  }

  .input::-ms-input-placeholder {
    color: #aeb5c0;
    font-weight: lighter;
  }

  .input::-webkit-input-placeholder {
    color: #aeb5c0;
    font-weight: lighter;
  }

  .input:focus::-webkit-input-placeholder {
    color: #aeb5c0;
    font-weight: lighter;
  }
}
</style>
