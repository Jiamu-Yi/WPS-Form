<template>
  <div class="basic-title">题目模板</div>
  <template v-if="questionLoading">
    <a-skeleton-button style="margin: 5px 5px 5px 0px; width: 84px" active="active" shape="buttonShape" block="block"/>
    <a-skeleton-button style="margin: 5px 5px 5px 0px; width: 84px" active="active" shape="buttonShape" block="block"/>
  </template>
  <ul class="basic-list" v-if="!questionLoading">
    <li v-for="proBas in problemBasic"
        :key="proBas.id"
        class="basic-item"
        @click.prevent="addTemplateProblemByList(proBas)"
        @mousedown.prevent
    >
      {{ proBas.title }}
    </li>
  </ul>
</template>

<script lang="ts">
import {defineComponent, inject} from "vue";

export default defineComponent({
  name: 'problem-template-list',
  setup() {

    const problemBasic = inject("problemBasic");

    const questionLoading = inject("questionLoading");

    const addTemplateProblemByList = inject("addTemplateProblemByList");

    return {
      questionLoading,
      problemBasic,
      addTemplateProblemByList,
    }
  }

})
</script>

<style scoped lang="scss">
//中间列表
.basic-title {
  font-size: 14px;
  font-weight: bold;
  padding: 0;
}

.basic-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-left: 0;
  margin-top: 11px;
  flex-wrap: wrap;

  .basic-item {
    width: 7em;
    margin: 5px 0;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 5px;
    background-color: #ffffff;
    border: 1px solid #e7e9eb;
    border-radius: 2px;
  }

  .basic-item:hover {
    border: 1px solid #1488ed;
    cursor: pointer;
  }

  .basic-item:active {
    color: #1488ed;
  }
}
</style>
