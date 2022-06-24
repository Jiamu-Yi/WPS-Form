<template>
  <h1 class="problem-title">添加题目</h1>
  <template v-if="questionLoading">
    <a-skeleton-button style="margin: 5px 5px 5px 0px; width: 84px" active="active" shape="buttonShape" block="block"/>
    <a-skeleton-button style="margin: 5px 5px 5px 0px; width: 84px" active="active" shape="buttonShape" block="block"/>
    <a-skeleton-button style="margin: 5px 5px 5px 0px; width: 84px" active="active" shape="buttonShape" block="block"/>
    <a-skeleton-button style="margin: 5px 5px 5px 0px; width: 84px" active="active" shape="buttonShape" block="block"/>
    <a-skeleton-button style="margin: 5px 5px 5px 0px; width: 84px" active="active" shape="buttonShape" block="block"/>
    <a-skeleton-button style="margin: 5px 5px 5px 0px; width: 84px" active="active" shape="buttonShape" block="block"/>
    <a-skeleton-button style="margin: 5px 5px 5px 0px; width: 84px" active="active" shape="buttonShape" block="block"/>
  </template>
  <ul class="problem-list" v-if="!questionLoading">
    <li
      v-for="proTye in problemTypes"
      :key="proTye.title"
      class="problem-item"
      @click.prevent="addProblemByList(proTye.type)"
      @mousedown.prevent
    >
      <i :class="'iconfont ' + 'icon-' + proTye.type"/>
      {{ proTye.title === '下拉选择题' ? '下拉选择' : proTye.title }}
    </li>
  </ul>
</template>

<script lang="ts">
import {defineComponent, inject} from "vue";

export default defineComponent({
  name: 'problem-plain-list',
  setup() {
    const problemTypes = inject("problemTypes");
    const questionLoading = inject("questionLoading");
    //通过左侧问题列表添加问题
    const addProblemByList = inject("addProblemByList");
    return {
      questionLoading,
      problemTypes,
      addProblemByList,
    }
  }

})
</script>

<style scoped lang="scss">
//上面列表
.problem-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 11px;
  padding: 0;
}

.problem-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 12px;
  box-sizing: border-box;
  padding-left: 0;

  .problem-item {
    width: 7em;
    line-height: 2em;
    margin: 5px 0;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border: 1px solid #e7e9eb;
    border-radius: 2px;

    .iconfont {
      margin-right: 2px;
    }
  }

  .problem-item:hover {
    border: 1px solid #1488ed;
    cursor: pointer;
  }

  .problem-item:active span {
    color: #1488ed;
  }
}
</style>
