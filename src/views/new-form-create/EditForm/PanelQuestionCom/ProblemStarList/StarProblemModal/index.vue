<template>
  <div class="modal" ref="modal">
    <modal-base>
      <template #manageAddButton v-if="!isEdit">
        <module-manage-plus></module-manage-plus>
      </template>
      <template #manageList v-if="!isEdit">
        <module-manage-list></module-manage-list>
      </template>
      <template #editTypeList v-if="isEdit">
        <module-edit-type-list></module-edit-type-list>
      </template>
      <template #editSearch v-if="isEdit">
        <module-edit-search></module-edit-search>
      </template>
      <template #editItemList v-if="isEdit">
        <module-edit-item></module-edit-item>
      </template>
      <template #editButtonList v-if="isEdit">
        <module-edit-button-list></module-edit-button-list>
      </template>
    </modal-base>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, provide, ref} from "vue";
import ModalBase
  from "@/views/new-form-create/EditForm/PanelQuestionCom/ProblemStarList/StarProblemModal/ModalBase.vue";
import moduleManagePlus
  from "@/views/new-form-create/EditForm/PanelQuestionCom/ProblemStarList/StarProblemModal/ModuleManagePlus.vue";
import moduleManageList
  from "@/views/new-form-create/EditForm/PanelQuestionCom/ProblemStarList/StarProblemModal/ModuleManageList.vue";
import moduleEditTypeList
  from "@/views/new-form-create/EditForm/PanelQuestionCom/ProblemStarList/StarProblemModal/ModuleEditTypeList.vue";
import moduleEditSearch
  from "@/views/new-form-create/EditForm/PanelQuestionCom/ProblemStarList/StarProblemModal/ModuleEditSearch.vue";
import moduleEditItem
  from "@/views/new-form-create/EditForm/PanelQuestionCom/ProblemStarList/StarProblemModal/ModuleEditItem.vue";
import moduleEditButtonList
  from "@/views/new-form-create/EditForm/PanelQuestionCom/ProblemStarList/StarProblemModal/ModuleEditButtonList.vue";

export default defineComponent({
  name: 'manage-star-problem-modal',
  props: ['visible'],
  components: {
    ModalBase,
    moduleManagePlus,
    moduleManageList,
    moduleEditTypeList,
    moduleEditSearch,
    moduleEditItem,
    moduleEditButtonList,
  },
  setup() {
    //是否展示对话框
    const isVisible = inject('visible') as any;
    //是否处于编辑收藏问题页面
    let isEdit = ref<any>(false);
    //编辑或创建页面中修改的问题对象
    let currentProblem = ref<any>({});


    /**
     * @description: 显示对话框的函数
     */
    const showModal = () => {
      isVisible.value = true;
    };

    provide('isEdit', isEdit);

    provide('currentProblem', currentProblem);


    return {
      isEdit,
      isVisible,
      showModal,
    };
  },
})
</script>

<style lang="scss" scoped>


</style>
