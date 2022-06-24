<template>
  <!--    左侧题目以及模板列表-->
  <aside class="problems-list">
    <div class="problems-list-container">
      <problem-plain-list></problem-plain-list>
      <problem-template-list></problem-template-list>
      <problem-star-list></problem-star-list>
    </div>
  </aside>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ProblemPlainList from "@/views/new-form-create/EditForm/PanelQuestionCom/ProblemPlainList.vue";
import ProblemTemplateList from "@/views/new-form-create/EditForm/PanelQuestionCom/ProblemTemplateList.vue";
import ProblemStarList from "@/views/new-form-create/EditForm/PanelQuestionCom/ProblemStarList/index.vue";

export default defineComponent({
  name: "mould-com",
  components: {
    ProblemPlainList,
    ProblemTemplateList,
    ProblemStarList,
  },
});
</script>

<style scoped lang="scss">
.problems-list {
  display: flex;
  width: 212px;
  margin-right: 16px;
  margin-left: 10px;
  border-radius: 2px;
  height: 420px;
  flex-shrink: 0;
  flex-direction: column;

  .problems-list-container {
    position: absolute;
    border: 1px solid #e7e9eb;
    background-color: #fff;
      width: 212px;
      padding: 24px 16px 0;
      color: #3d4757;
      //position: static !important;
  }


}
</style>
