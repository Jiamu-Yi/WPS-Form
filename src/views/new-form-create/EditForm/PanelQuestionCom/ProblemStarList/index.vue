<template>
  <div class="title">
    <span class="collect-title">我的常用题</span>
    <span class="manage" @click="showModal" v-if="problemStarList.length !== 0">管理</span>
  </div>
  <template v-if="questionLoading">
    <a-skeleton-button style="margin: 5px 5px 5px 0px; width: 84px" active="active" shape="buttonShape" block="block"/>
    <a-skeleton-button style="margin: 5px 5px 5px 0px; width: 84px" active="active" shape="buttonShape" block="block"/>
    <a-skeleton-button style="margin: 5px 5px 5px 0px; width: 84px" active="active" shape="buttonShape" block="block"/>
    <a-skeleton-button style="margin: 5px 5px 5px 0px; width: 84px" active="active" shape="buttonShape" block="block"/>
  </template>
  <div class="isEmtpy" v-if="problemStarList.length === 0">
    <span class="title1">暂无我的常用题，立即<span class="title2" @click="showModal">添加</span></span>
  </div>
  <ul class="collect-list" v-if="!questionLoading && problemStarList.length !== 0">
    <li v-for="proStar in problemStarList"
        :key="proStar.id"
        class="collect-item"
        @click.prevent="addTemplateProblemByList(proStar.problem)"
        @mousedown.prevent
    >
      {{ proStar.problem.title }}
    </li>
  </ul>
  <modal-star-problem :visible="visible"></modal-star-problem>

</template>

<script lang="ts">
import {defineComponent, inject, provide, ref} from "vue";
import ModalStarProblem
  from "@/views/new-form-create/EditForm/PanelQuestionCom/ProblemStarList/StarProblemModal/index.vue";

export default defineComponent({
  name: 'problem-star-list',
  components: {
    ModalStarProblem
  },
  setup() {
    //添加题目列表
    const visible = ref<boolean>(false);

    let problemStarList = inject("problemStarList") as any;

    const addStarProblemByList = inject("addStarProblemByList");


    const addTemplateProblemByList = inject("addTemplateProblemByList") as any;

    const questionLoading = inject("questionLoading");

    const showModal = () => {
      visible.value = true;
    };

    provide('visible', visible);

    return {
      questionLoading,
      problemStarList,
      addStarProblemByList,
      visible,
      addTemplateProblemByList,
      showModal,
    };
  },

})
</script>

<style scoped lang="scss">
.title {
  display: flex;
  padding: 0;
  width: 100%;
  justify-content: space-between;
  //下面列表
  .collect-title {
    font-size: 14px;
    font-weight: bold;
    padding: 0;
  }

  .manage {
    color: #1488ed;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    padding: 0;
  }
}

.isEmtpy {
  text-align: center;
  padding-top: 18px;
  font-size: 12px;
  padding-bottom: 14px;

  .title2 {
    color: #1488ed;
    cursor: pointer;
  }
}

.collect-list {
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
  margin-top: 11px;
  padding-left: 0;

  .collect-item {
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

  .collect-item:hover {
    border: 1px solid #1488ed;
    cursor: pointer;
  }

  .collect-item:active {
    color: #1488ed;
  }

}
</style>
