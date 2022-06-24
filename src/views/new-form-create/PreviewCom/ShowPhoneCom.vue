<template>
  <!--    输入框-->
  <div class="wrapper">
    <main class="main">
      <section class="form">

        <form class="form-container">
          <div class="form-item">
            <div class="scrollbar-container">
              <div class="form-detial">
                <div class="form-main">
                  <div class="title">{{ title }}</div>
                  <div class="sub-title">{{ subTitle }}</div>
                  <div class="item-box">
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
                      block
                    >提交
                    </a-button>
                  </div>
                </div>
                </div>
                <div class="form-footer">
                  <p>
                    <span class="logo"></span>
                    由
                    <span class="src-common">金山文档</span>
                    旗下表单提供服务
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>

      </section>
      <aside class="operation">
        <div class="common-button">
          <a-button class="continue" @click="continueWirte">继续编辑</a-button>
          <a-button class="complete" type="primary" @click="finishCommit">完成创建</a-button>
        </div>
      </aside>
    </main>
  </div>
</template>

<script lang="ts">
import formItemCom from '../../write/FormItemCom.vue';
import {computed, defineComponent, inject} from 'vue';
import {message} from "ant-design-vue";
import {reqCreateForm, reqStartForm} from '@/api/form/api';
import router from "@/router";

export default defineComponent({
  name: 'phone-show-com',
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
      return form.value ? form.value.title : ' ';
    });

    //副标题
    const subTitle = computed(() => {
      return form.value ? form.value.subTitle : ' ';
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
            id: formId, ctgName: "继续编辑"
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
        router.push({path: '/exam-result'});
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
.scrollbar-container {
  height: 100%;
  overflow: auto;

  // 滚动条整体部分
  :deep(::-webkit-scrollbar) {
    width: 6px;
    height: 6px;
  }

  // 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
  :deep(::-webkit-scrollbar-button) {
    display: none;
  }

  // 滚动条的轨道（里面装有Thumb）
  :deep(::-webkit-scrollbar-track) {
    background: transparent;
  }

  // 滚动条的轨道（里面装有Thumb）
  :deep(::-webkit-scrollbar-track-piece) {
    background-color: transparent;
  }

  // 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
  :deep(::-webkit-scrollbar-thumb ) {
    background-color: #d0d4d9;
    cursor: pointer;
    border-radius: 4px;
  }

  // 边角，即两个滚动条的交汇处
  :deep(::-webkit-scrollbar-corner) {
    display: none;
  }

  // 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件
  :deep(::-webkit-resizer) {
    display: none;
  }
}
.wrapper {
  background-color: #f2f4f7;
  display: flex;
  justify-content: center;
  flex: 1 1 auto;
  min-height: calc(100vh - 88px);
  user-select: none;

  .main {
    flex: 1 1;
    margin-top: 16px;
    width: 100%;
    overflow: auto;
    min-width: 0;
    justify-content: center;

    .form{
      width: 75px;
      min-height: calc(100vh - 156px);

      .form-container {
        background-image: url(//kdocs-form.wpscdn.cn/form-3110366ace52a87cc1a686b8107aa44da5be1a04-assets/css/img/06dc186b7118bb813dfa66f837be75cd.png);
        background-size: 390px 610px;

        width: 390px;
        height: 610px;
        transform: scale(1);
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        margin: -305px auto auto;
        top: 50%;
        left: 0;
        bottom: 0;
        right: 0;

        .form-item{
          width: 350px;
          height: 568px;
          border: 1px solid #e2e6ed;
          transform: scale(.73);
          margin-top: -45px;
          margin-left: -6px;
          -webkit-box-flex: inherit;
          flex: inherit;
          overflow: hidden;

          .form-detial {
            width: 100%;
            height: 100%;
            overflow-y: auto;
            border: none;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .form-main {
              // min-height: 100vh;
              background-color: #fff;
              display: flex;
              flex-direction: column;
              padding: 24px 42px 85px;

              .title {
                width: 100%;
                line-height: 28px;
                font-size: 20px;
                text-align: center;
                color: #3d4757;
                font-weight: 700;
                word-break: break-all;
                -webkit-user-select: text;
                -moz-user-select: text;
                -ms-user-select: text;
                user-select: text;
                cursor: pointer;
              }

              .sub-title {
                text-align: center;
                width: 100%;
                margin: 0;
                margin-top: 8px;
                // padding: 22px 0 10px;
                line-height: 20px;
                -webkit-user-select: text;
                -moz-user-select: text;
                -ms-user-select: text;
                user-select: text;
                color: #9b9b9b;
                cursor: pointer;
              }

              .item-box {
                -webkit-box-flex: inherit;
                // height: 568px;
                flex: inherit;

                .submit {
                  display: flex;
                  margin-top: 42px;
                  flex-direction: column;
                  align-items: center;
                  flex-shrink: 0;
                  height: 42px;

                  .ant-btn{
                    height: 42px;
                    font-size: 16px;
                  }
                }
              }

              .problem {
                width: 100%;
                margin-top: 30px;
                padding: 0;

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
              }
            }
            .form-footer{
              width: 100%;
              bottom: 0;
              margin-top: 37.5px;
              font-size: 12px;
              color: #9b9b9b;
              line-height: 8.5px;
              text-align: center;
              background: #f5f5f5;
              font-weight: 400;
              padding: 15px 0 calc(8px + env(safe-area-inset-bottom) / 2);
              flex-shrink: 0;
              cursor: pointer;

              p{
                margin-bottom: 7px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 0;

                .logo{
                  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAABZVBMVEVHcEwzsP0JYO8IcfYun/whjvw7uP8UlvlEvv9OwP8Agf8AYf45tf82s/0LWuIOXOkGZPMAdPUpqPsAd/xEvv8+uv8Nj/wAef0AYv8AYv8tqfsRh/AuqP9Evv82sv0AYf0RUNoRT9gAfPsJU+ItrfwEXfQLcu0RT9oJU94LVuhBvP87uP4AYv8Pkf0VmPkcnvo2s/wAgv8xr/wUTdQST9gaSswIU+QVmfkRifIZS84op/sAauodfe0kpfsrqvwAgP8AYv8vrfwnp/sxr/00sf0VTNM8uP4AYf4Ym/oYSs42s/0OU+ghovsNVusLWfEIU+U5tf0PUeUfofoNUd0NV+4sq/wAX/oAXvUSTtYcnvoQT+IQT9oMUuAAePlAu/4Aff0AXPERTeAAdvYKUuIAV+IAcvAAevsSTN0LW/QJXfYAVdwAb+0AaeQBbOgGVOMAWuwAWOgAZt8IVuoAUtYAZNwWYeQYbutxxtx+AAAAPXRSTlMAZjMkDgki/v4C9/c/+3wXS/7nyqzqiVm3kar9cY2F3GSX6qhc7t7U8ETS+WlAs9DNqvfnxrnj6+/2g/Dv6rk9dgAAAqZJREFUeNrtlPlT2kAUxxcISIRBBQSPEW8O72oPe4GAqIgJVSJaPFABUYTxavv39+0mbGqza8Sf/bCTMGE++e57LwG98RpEh9/veIUnjDiBEaHTOEu/k9BvETvx3DOnzlOC0znjfrHm8G8Ap/iDDxsvLFUIzW78xywu1by4H0a2TUt1L21zWHI/V9zQOps0PgzxSrWHltMcksl0Mr2+HLKzvClv0oy0d8roWeLx/fg+LHoGyHdAvz5kbOeUNwXEU3EDcBEDJ2+4zqrxS8qEb/V6ndPV73xSq8d1gDfHxZ02eztP6PpdJyAeFu8eg60/5xpc0e5Z/WkgUFI5L/FEMRhuNZvDW09YcKAShe31+mq1m1bzvtWla4vz8MMuhaVZfZcnF33E/HXTpfIJXgsT0fYuUS6rJlGHsRcQEGE318bgBbsTCWKeXNTU0PvhBRvSyPFFIYBNGtrCKqJvryRJOSkHS0KsvVJTC0UUiYJYzPuehDb/ERVFUiRYCm+ME9SEUERRKIhj2qFUbF7iHiGKLMuKrMCSEZdePVSf8LSswRV7JquNap82mHbXJiuVB/kKkK9k3hM+fXtXrTaaE4kyqOqtxgvHlUolDyaGvcvRg4OzW1Abja/doJJbRQsFbObzD9cYhmYdKBaLmglqOFFG4tjK0dERiMTMyyxRGNwEsHqmhj5GfbHI4eGhalaI+cAQY5tra6pJt/uYyWSISSMhlLVTEAEwcegdqBkAi7oZiSEGwVEcWtS3m6WRqvlxTORMY9AFqh6azYBKI6MeO+JiGwATUEOz4BETq+M96Flio3poFkxNnLQhM8Q5V9vMtiPfW5E5otgzuEmadA0iViO99K/ATLX6sOoi3gqrlXx1bnqNiJ89gkmc8RF0gWjSSt5oPlgh7Y3O+Qs0glhnhDAzGAAAAABJRU5ErkJggg==) no-repeat;
                  background-size: auto;
                  width: 16px;
                  height: 16px;
                  -webkit-background-size: cover;
                  background-size: cover;
                  display: inline-block;
                  margin-right: 9px;
                }

                .src-common{
                  color: #3692f5;
                  // border-bottom: 1px #3692f5 solid;
                  text-decoration: underline;
                }
              }
            }
          }
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
}

@media screen and (min-width: 1600px) {
  .form-container {
    transform: scale(1.25) !important;
  }
}
</style>
