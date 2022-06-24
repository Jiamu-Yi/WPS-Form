<template>
  <a-skeleton-input v-if="loading" style="width: 200px" active="active"/>
  <div class="number" v-if="!loading">共收集&nbsp;{{ totalItems }}&nbsp;份数据</div>
  <Pagination @change-page="changePage" :total="totalItems"></Pagination>
</template>

<script lang="ts">
import {reqDetailForm} from "@/api/form/api";
import {inject, ref} from "vue";
import Pagination from "@/views/exam-result/ExamResultDetailCom/PaginationCom.vue";

export default {
  name: "title-com",
  components: {
    Pagination,
  },
  setup() {
    let totalItems = inject("totalItems"); //分页器 总表单数
    let data = ref();
    let currentPage = ref<number>(1); //分页器，当前是第几页
    let formId: any = inject("formId");
    let formDetail: any = inject("formDetail");
    let loading = inject("loading");
    // 切换页面的函数
    const changePage = async (page: number) => {
      // 将第几页与展示第几份表单填写结果联系起来
      currentPage.value = page;
      let number = currentPage.value - 1;
      data.value = await reqDetailForm(formId.value[number]);
      formDetail.data = data.value.data.data.item.result;
    };

    return {
      totalItems,
      currentPage,
      loading,
      changePage
    };
  },
};
</script>

<style>
.number {
  font-size: 20px;
  color: #3d4757;
}
</style>
