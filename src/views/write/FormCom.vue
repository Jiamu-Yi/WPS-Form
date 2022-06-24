<template>
  <!--    输入框-->
  <section class="form">
    <form class="form-container">
      <div class="title">{{ title }}</div>
      <div class="sub-title">{{ subTitle }}</div>
      <template v-if="loading">
        <a-skeleton/>
        <a-skeleton/>
        <a-skeleton/>
      </template>
      <template v-if="!loading">
        <form-item-com
          v-for="(item,index) in problemList"
          :formItem="item"
          :key="item.id"
          :index="index"
        ></form-item-com>
      </template>
      <a-button
        class="submit"
        size="middle"
        v-if="isTrue"
        type="primary"
        @click="submitForm"
      >提交
      </a-button>
      <a-button
        class="submiterror"
        size="middle"
        type="primary"
        v-if="!isTrue"
        @click="submitFormError()"
      >提交
      </a-button>
    </form>
  </section>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, toRef} from 'vue'
import {reqGetForm, reqInputForm} from '@/api/form/api'
import {message} from "ant-design-vue";
import formItemCom from "@/views/write/FormItemCom.vue";
import {useRouter} from "vue-router";

export default defineComponent({
  name: 'form-com',
  components: {
    formItemCom
  },
  props: ["formID"],
  setup(props) {
    let formID = toRef(props, 'formID');    //表单ID
    let formId = formID;
    let title = ref<string>('');      //主标题
    let subTitle = ref<string>('');  //副标题
    let problemList = ref<any>([]);  //问题列表
    let url = window.location.href;        //当前的路由地址
    let isTrue = false;                      //按钮显示依据
    let loading = ref<boolean>(true);                      //按钮显示依据
    const router = useRouter();
    if (url.includes('/write/')) {
      isTrue = true;
    }

    onMounted(() => {
      //测试用，在有父组件传入ID
      getForm(formId.value);
    });

    /**
     * @description: 获取到form
     */
    const getForm = async (Id: string) => {
      try {
        let res = await reqGetForm(Id);   //利用id获取到表单
        if (res.data.data) {
          formId.value = res.data.data.item.id;
          title.value = res.data.data.item.title;    //标题
          subTitle.value = res.data.data.item.subTitle;    //副标题
          problemList.value = res.data.data.item.problems;  //问题列表
        }
        loading.value = false;
      } catch {
        message.error("加载失败，请刷新页面！");
      }
    };

    /**
     * @description: 上传表单
     */
    const submitForm = async () => {
      //判断必选已经填完
      // TODO 这里的判空失效了
      if (problemList.value.every((problem: any) => {
        return (problem.required === true && problem.result) || problem.required === false;
      })) {
        try {
          await reqInputForm(formId.value, problemList.value);
          router.replace({
            name: 'success',
            query: {
              id: formId.value
            },
          })
        } catch {
          message.error('提交错误，请刷新页面重新提交！');
        }
      } else {
        message.warn('请填写必选项！');
      }
    }

    /**
     * @description: 预览无法提交
     */
    const submitFormError = () => {
      message.warn('预览状态暂不支持提交');
    }

    return {
      formId,
      title,
      subTitle,
      problemList,
      isTrue,
      loading,
      getForm,
      submitForm,
      submitFormError,
    }
  }
})

</script>

<style lang="scss" scoped>
.form {
  @media screen and (min-width: 661px) {
    width: 100%;
    display: flex;
    justify-content: center;
    min-height: 775px;
    background-color: #f2f4f7;
    .form-container {
      width: 776px;
      min-height: -webkit-calc(100vh - 88px);
      min-height: calc(100vh - 88px);
      background-color: #fff;
      min-height: -webkit-calc(100vh - 88px);
      min-height: calc(100vh - 88px);
      padding: 48px 102px 90px 102px;
      color: #3d4757;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      align-items: center;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;

      .title {
        width: 100%;
        line-height: 22px;
        font-size: 20px;
        text-align: center;
        color: #3d4757;
        font-weight: 700;
        word-break: break-all;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }

      .sub-title {
        text-align: center;
        width: 100%;
        margin: 0;
        padding: 22px 0 10px;
        line-height: 20px;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }

      .submit {
        margin-top: 24px;
        width: 96px;
      }

      .submiterror {
        width: 96px;
        margin-top: 24px;
        background-color: lightskyblue;
        border: 1px solid skyblue;
        cursor: no-drop;
      }
    }
  }
  @media screen and (max-width: 660px) {
    width: 100%;
    display: flex;
    justify-content: center;
    min-height: 775px;
    background-color: #f2f4f7;
    .form-container {
      width: 100%;
      min-height: -webkit-calc(100vh - 88px);
      min-height: calc(100vh - 88px);
      background-color: #fff;
      min-height: -webkit-calc(100vh - 88px);
      min-height: calc(100vh - 88px);
      display: flex;
      flex-direction: column;
      padding: 24px 42px 85px;
      color: #3d4757;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      align-items: center;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;

      .title {
        width: 100%;
        line-height: 22px;
        font-size: 20px;
        text-align: center;
        color: #3d4757;
        font-weight: 700;
        word-break: break-all;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }

      .sub-title {
        text-align: center;
        width: 100%;
        margin: 0;
        padding: 22px 0 10px;
        line-height: 20px;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }

      .submit {
        margin-top: 24px;
        width: 96px;
      }

      .submiterror {
        width: 96px;
        margin-top: 24px;
        background-color: lightskyblue;
        border: 1px solid skyblue;
        cursor: no-drop;
      }
    }
  }
}
</style>
