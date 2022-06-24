<template>
  <!--    输入框-->
  <div class="problem">
    <h1 class="title">
      <span v-if="problem.required" class="necessary">*</span>
      {{ index + 1 }}.
      <!-- 当类型为多选时显示该文字 -->
      <span class="mulit-select" v-if="formItem.type === 'multiSelect'">[多选题]</span>
      {{ problem.title }}
    </h1>

    <div class="problem-container">
      <template v-if="formItem.type === 'date'">
        <date-com :formItem="problem"></date-com>
      </template>
      <template v-if="formItem.type === 'input'">
        <input-com :formItem="problem"></input-com>
      </template>
      <template v-if="formItem.type === 'multiSelect'">
        <multi-select-com :formItem="problem"></multi-select-com>
      </template>
      <template v-if="formItem.type === 'pullSelect'">
        <pull-select-com :formItem="problem"></pull-select-com>
      </template>
      <template v-if="formItem.type === 'score'">
        <score-com :formItem="problem"></score-com>
      </template>
      <template v-if="formItem.type === 'singleSelect'">
        <single-select-com :formItem="problem"></single-select-com>
      </template>
      <template v-if="formItem.type === 'time'">
        <time-com :formItem="problem"></time-com>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, toRef} from 'vue';
import dateCom from "@/views/write/TypesCom/DateCom.vue";
import singleSelectCom from "@/views/write/TypesCom/SingleSelectCom.vue";
import multiSelectCom from "@/views/write/TypesCom/MultiSelectCom.vue";
import inputCom from "@/views/write/TypesCom/InputCom.vue";
import pullSelectCom from "@/views/write/TypesCom/PullSelectCom.vue";
import scoreCom from "@/views/write/TypesCom/ScoreCom.vue";
import timeCom from "@/views/write/TypesCom/TimeCom.vue";

export default defineComponent({
  name: 'main-com',
  props: ['formItem', 'index'],
  components: {
    dateCom,
    singleSelectCom,
    multiSelectCom,
    inputCom,
    pullSelectCom,
    scoreCom,
    timeCom,
  },
  setup(props) {
    let formItem = toRef(props, 'formItem');
    let problem = formItem as any;

    const result = computed({
      get: () => {
        return formItem.value.result ? formItem.value.result.value : '';
      },
      set: (newValue) => {
        formItem.value.result = {value: newValue};
      },
    });

    return {
      problem,
      result
    }
  }
})
</script>

<style lang="scss" scoped>
.problem {
  width: 100%;
  padding: 24px 0;

  .title {
    position: relative;
    padding: 8px 0 5px 0;
    border-bottom: 1px solid #fff;
    font-size: 14px;
    line-height: 18px;
    font-weight: bold;
    color: #3d4757;
    width: 100%;
    text-align: left;

    .mulit-select {
      color: rgba(0, 0, 0, .4);
      font-weight: normal;
    }

    .necessary {
      position: absolute;
      top: 5px;
      left: -8px;
      color: #eb5451;
    }
  }
}
</style>
