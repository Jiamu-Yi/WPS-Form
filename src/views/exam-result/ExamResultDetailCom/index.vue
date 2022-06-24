<template>
  <div class="formBackground">
    <div class="container" v-if="!isEmpty">
      <title-com></title-com>
      <user-com></user-com>
      <result-com></result-com>
    </div>
    <div class="container" v-if="isEmpty">
      <no-result-com></no-result-com>
    </div>
  </div>
</template>

<script lang="ts">
import {reqDetailForm, reqResultForm} from "@/api/form/api";
import {onMounted, provide, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import ResultCom from "./ResultCom.vue";
import TitleCom from "./TitleCom.vue";
import UserCom from "./UserCom.vue";
import NoResultCom from "@/views/exam-result/ExamResultDetailCom/NoResultCom.vue";

export default {
  name: "exam-result-detail-com",
  components: {
    NoResultCom,
    ResultCom,
    TitleCom,
    UserCom,
  },
  setup() {
    const route = useRoute();
    let totalItems = ref<number>(0); //分页器 收集的表单结果的总份数
    // 要展示的表单结果的所有相关数据
    let formDetail = reactive({
      formTitle: "",
      time: "",
      data: [],
      author: "",
    });
    let data = ref();
    let currentPage = ref<number>(1); //分页器，当前是第几页
    let formId = ref<Array<string>>([]); //表单每一份结果的id
    let loading = ref<boolean>(true); //表单每一份结果的id
    let isEmpty = ref<boolean>(false); //表单每一份结果的id
    // 时间格式化函数
    const formDate = (time: string) => {
      let date = new Date(time);
      // 首先将时间格式化
      let YY = date.getFullYear() + "年";
      let MM =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "月";
      // 三目运算符 如果月份小于10 则补零
      let DD =
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate() + "日";
      // 三目运算符 如果日期小于10 则补零
      let hh =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      // 三目运算符 如果小时小于10 则补零
      let mm =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      // // 三目运算符 如果分钟小于10 则补零
      return YY + MM + DD + hh + mm;
    };

    onMounted(async function () {
      // 获取要展示的表单的id
      let id = route.params.id.toString();
      // 获取要展示的表单的表单收集结果
      let res = await reqResultForm(id);
      if (res.data.data.items.length !== 0) {
        // 将收集到的的每一份表单的id存入formId
        for (let i = 0; i < res.data.data.items.length; i++) {
          formId.value.push(res.data.data.items[i].id);
        }
        // 调用reqDetailForm接口   获取每一份收集到的表单   问题的填写详情
        // 默认展示收集到的第一份表单 formId.value[0]
        data.value = await reqDetailForm(formId.value[0]);
        // 下面是 拿出有用的数据 并存储
        formDetail.time = formDate(res.data.data.info.utime); // 时间格式化
        formDetail.formTitle = res.data.data.info.title;
        formDetail.data = data.value.data.data.item.result;
        formDetail.author = data.value.data.data.item.formAuthor;
        totalItems.value = res.data.data.items.length;
      } else {
        isEmpty.value = true;
      }

      loading.value = false;
    });
    provide("formDetail", formDetail); // 要展示的表单结果的所有相关数据

    provide("totalItems", totalItems); //分页器 收集的表单结果的总份数

    provide("formId", formId); //表单每一份结果的id

    provide("loading", loading); //加载表单结果份数

    return {totalItems, formDetail, currentPage, isEmpty};
  },
};
</script>

<style  scoped>
.container {
  width: 944px;
  margin: 0 auto -1px;
  background-color: #fff;
  min-height: calc(100vh - 111px);
  padding: 24px 40px;
  box-sizing: border-box;
  position: relative;
}
.formBackground {
  background-color: #f2f4f7;
}
</style>
