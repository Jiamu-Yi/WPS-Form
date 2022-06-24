<template>
  <!--    输入框-->
  <div class="wrapper">
  <section class="form">
    <form class="form-container">
      <div class="title">{{ title }}</div>
      <div class="sub-title">{{ subTitle }}</div>
      <!--  这里直接引用write组件里的form-item-com，即展示问题部分 -->
      <form-item-com
        v-for="(item,index) in problemList"
        :formItem="item"
        :key="item.id"
        :index="index"
      ></form-item-com>

      <div class="submit">
        <a-button
          size="middle"
          type="primary"
          @click="submitForm"
        >提交
        </a-button>
      </div>
    </form>
  </section>
    <aside class="operation">
    <div class="common-button">
      <a-button class="continue" @click="continueWirte">继续编辑</a-button>
    <a-button class="complete" type="primary" @click="finishCommit">完成创建</a-button>
    </div>
  </aside>
</div>
</template>

<script lang="ts">
import formItemCom from '../../write/FormItemCom.vue';
import {computed, defineComponent, inject} from 'vue';
import {message} from "ant-design-vue";
import {reqCreateForm, reqStartForm} from '@/api/form/api';
import router from "@/router";

export default defineComponent({
  name: 'main-com',
  components: {
    formItemCom
  },
  setup() {
    // let formId = route.query.id?.toString()
    let formId = inject('formId', '') as any;
    //表单
    const form = inject('form', {}) as any;

    //主标题
    const title = computed(() => {
      return form.value ? form.value.title : '';
    });

    //副标题
    const subTitle = computed(() => {
      return form.value ? form.value.subTitle : '';
    });

    //问题列表
    const problemList = computed(() => {
      return form.value ? form.value.problems : [];
    });

    /**
     * @description: 预览事件函数
     */
    const edit = async () => {
      try {
        router.push({
          name: 'edit',
          query: {
            id: formId,
            ctgName: "继续编辑"
          }
        });
      } catch {
        message.error('操作失败，请重新操作！');
      }
    };
    /**
     * @description: 上传表单
     */
    const submitForm = () => {
      message.warn('预览状态暂不支持提交！');
    };

    const continueWirte = () => {
      router.back();
    };

    // 预览完成创建按钮功能修改完成
    const finishCommit = async () => {
      try {
        let res = await reqCreateForm(
          title.value,
          subTitle.value,
          problemList.value,
        );
        reqStartForm(res?.data.data?.id ? res?.data.data?.id : '');
        router.push({
          name: 'share',
          params: {
            id: res?.data.data?.id
          }
        });
        message.success('创建并发布成功！');
      } catch {
        message.error('操作失败，请重新操作！');
      }
    };

    return {
      title,
      subTitle,
      problemList,
      form,
      submitForm,
      edit,
      continueWirte,
      finishCommit
    }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: #f2f4f7;
  flex: 1 1;
  overflow: auto;
  min-width: 0;
}
.form {
  margin-top: 16px;
  width: 100%;
  display: flex;
  justify-content: center;

  .form-container {
    width: 790px;
    background-color: #fff;
    height: calc(100vh - 152px);
    padding: 48px 102px 90px 102px;
    color: #3d4757;
    display: flex;
    align-items: center;
    min-height: inherit;
    flex-direction: column;
    overflow:auto;

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

    .problem {
      width: 100%;
      padding: 24px 0;

      .title {
        position: relative;
        padding: 8px 0 5px 0;
        position: relative;
        border-bottom: 1px solid #fff;
        font-size: 14px;
        line-height: 18px;
        font-weight: bold;
        color: #3d4757;
        width: 100%;
        text-align: left;

        .necessary {
          position: absolute;
          top: 5px;
          left: -8px;
          color: #eb5451;
        }
      }

      .answer {
        margin-top: 8px;
        max-height: 440px;
        overflow-y: auto;
        width: 100%;

        .input {
          width: 100%;
          position: relative;
          font-size: 14px;
          line-height: 18px;
          font-weight: bold;
          color: #3d4757;
          padding: 8px 0 5px 0;
          border: none;
          border-bottom: 1px solid rgba(25, 55, 88, .1);
        }

        .input:focus {
          border-bottom: 1px solid rgba(25, 55, 88, .1);
          outline: none;
        }

        .input:hover {
          border-bottom: 1px solid #63b0f3;
          outline: none;
        }

        .input::-ms-input-placeholder {
          color: #aeb5c0;
          font-weight: lighter;
        }

        .input::-webkit-input-placeholder {
          color: #aeb5c0;
          font-weight: lighter;
        }

        .input:focus::-webkit-input-placeholder {
          color: #aeb5c0;
          font-weight: lighter;
        }
      }

      .answer{
        width: 100%;
      }
    }

    .submit {
      display: flex;
      margin-top: 24px;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
      opacity: .4;

      .ant-btn {
        width: 96px;
        cursor: not-allowed;
      }
    }
  }
}
.operation {
  padding: 24px 0;
  display: flex;
  -webkit-box-pack: center;
  //上面普通操作栏
  .common-button {
    display: flex;
    margin: 0 auto;
    .continue {
      margin-right: 24px;
    }
    .continue, .complete {
      width: 165px;
      padding: 0 20px;
    }
  }
}
</style>
