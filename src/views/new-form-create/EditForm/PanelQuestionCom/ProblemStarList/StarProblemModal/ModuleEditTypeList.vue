<template>
  <div class="type-list">
    <span class="title">选择题型</span>
    <div
      v-for="proTye in problemTypes"
      :key="proTye.title"
      @click="chooseType(proTye.type)"
      :class="['type-item', { active: currentProblem.problem.type === proTye.type }]"
    >
      <i :class="'iconfont ' + 'icon-' + proTye.type +' icon'"/>
      {{ proTye.title === '下拉选择题' ? '下拉选择' : proTye.title }}
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject} from 'vue';

export default defineComponent({
  name: 'ModuleEditTypeList',
  setup() {
    const problemTypes = inject("problemTypes");
    let buildProblem = inject('buildProblem') as any;
    let currentProblem = inject("currentProblem") as any;

    const chooseType = (currentType: string) => {
      currentProblem.value.problem.type = currentType;
      currentProblem.value.problem.setting = buildProblem(currentType).setting;
    }
    return {
      currentProblem,
      problemTypes,
      chooseType
    }
  }
})
</script>

<style scoped lang="scss">
.type-list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;

  .title {
    line-height: 28px;
    font-weight: bolder;
    border: none !important;
    color: rgba(0, 0, 0, .65) !important;
  }

  .type-item {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 86px;
    height: 28px;
    box-sizing: border-box;
    padding: 5px 10px;
    background: #fff;
    border-radius: 2px;
    border: 1px solid #e2e6ed;
    margin: 0 0 4px 4px;
    font-size: 12px;
    color: rgba(0, 0, 0, .65);
    cursor: pointer;

    .icon {
      border: none !important;
    }
  }

  .active {
    border: 1px solid #1488ed;
    color: #1488ed;
  }
}
</style>
