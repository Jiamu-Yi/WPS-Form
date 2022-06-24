<template>
  <!--    表单编辑区域-->

  <section class="edit">
    <form class="edit-container">
      <!-- 设置主标题 -->
      <a-skeleton-input style="width: 598px;height: 29px;" active="active" v-if="editLoading"/>
      <input v-model="title"
             class="form-title"
             placeholder="请输入表单标题"
             v-if="!editLoading"
             type="text"/>
      <!-- 设置描述 -->
      <div class="form-subtitle">
        <div class="subtitle" tabindex="1">
          <a-skeleton-input style="width: 558px;height: 18px;" active="active" v-if="editLoading"/>
          <textarea
            v-model="subTitle"
            class="describe"
            maxlength="300"
            v-if="!editLoading"
            placeholder="点击设置描述"/>
        </div>
      </div>
      <!-- 添加题目 -->
      <template v-if="editLoading">
        <a-skeleton active="active"/>
        <a-skeleton active="active"/>
      </template>
      <draggable
        v-model="problemList"
        chosen-class="chosen"
        animation="200"
        forceFallback="false"
        handle=".index-chang"
        chosenClass="chosen"
        item-key="id"
        v-if="!editLoading"
        @start="starDrag"
        @end="endDrag">
        <template #item="{element,index}">
          <problems-com
            :itemid="element.id"
            :Item="element"
            :Index="index"
          ></problems-com>
        </template>
      </draggable>
    </form>
    <!-- 底部信息 -->
    <footer-com></footer-com>
  </section>
</template>

<script lang="ts">
import problemsCom from '@/views/new-form-create/EditForm/PanelEditCom/ProblemsCom/index.vue';
import footerCom from '@/views/new-form-create/EditForm/PanelEditCom/FooterCom.vue';
import {computed, defineComponent, inject, provide, ref} from 'vue';
import {message} from "ant-design-vue";
import draggable from 'vuedraggable';

export default defineComponent({
  name: 'edit-com',
  components: {
    problemsCom,
    footerCom,
    draggable
  },
  setup() {
    let form: any = inject('form');

    const getProblemListIndex = inject('getProblemListIndex') as any;

    const editLoading = inject('editLoading');

    let drag = ref<boolean>(false);

    const title = computed({
      get: () => {
        return form.value ? form.value.title : '';
      },
      set: (newValue) => {
        form.value.title = newValue;
      },
    });

    const subTitle = computed({
      get: () => {
        return form.value ? form.value.subTitle : '';
      },
      set: (newValue) => {
        form.value.subTitle = newValue;
      },
    });

    //计算属性，展示列表
    let problemList = computed({
      get: () => {
        return form.value ? form.value.problems : [];
      },
      set: (newValue) => {
        form.value.problems = newValue;
      },
    });

    const delItem = () => {
      try {
        let index = getProblemListIndex && getProblemListIndex();
        problemList.value.splice(index, 1);
      } catch {
        message.error("发生了错误，请重新操作！");
      }
    };

    const starDrag = () => {
      drag.value = true;
    };

    const endDrag = () => {
      drag.value = false;
    };

    provide("delItem", delItem);

    return {
      drag,
      form,
      title,
      subTitle,
      problemList,
      editLoading,
      starDrag,
      endDrag,
    }
  }
})
</script>

<style lang="scss">
//编辑区域
.edit {
  max-width: 775px;
  min-width: 632px;
  min-height: calc(100vh - 92px);
  margin-bottom: 20px;

  .edit-container {
    display: flex;
    flex-direction: column;

    width: 776px;
    min-height: -webkit-calc(100vh - 150px);
    min-height: calc(100vh - 150px);
    padding: 50px 88px;
    background-color: #fff;
    border: 1px solid #e7e9eb;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    flex-shrink: 0;

    .form-title {
      margin: 0;
      border: none;
      font-size: 20px;
      font-weight: 700;
      line-height: 20px;
      color: #3d4757;
      text-align: center;
      overflow: hidden;
      outline: none;
    }

    input:focus::placeholder {
      opacity: 0 !important;
      //display: none;
    }

    input::placeholder {
      color: #3d4757 !important;
    }

    input::-moz-placeholder {
      color: #3d4757 !important;
    }

    input:-moz-placeholder {
      color: #3d4757 !important;
    }

    .chosen {
      padding: 0;
      box-shadow: 0 4px 16px 0 rgba(192, 198, 207, 0.5);

      .problem-set {
        opacity: 0;

        .ellipsis {
          opacity: 1 !important;
        }

        .problem-container {
          opacity: 0 !important;
        }

        .tools {
          display: none !important;
        }

        .problem-type {
          display: none !important;
        }
      }
    }
  }

  .form-subtitle {
    margin-top: 28px;
    padding: 12px 20px;
    padding-bottom: 25px;

    .subtitle {
      padding: 8px 0 5px 0;
      outline: none;
      font-weight: 400;
      position: relative;
      border-bottom: 1px solid #fff;
      font-size: 14px;
      line-height: 18px;
      color: #3d4757;

      .describe {
        height: 18px;
        max-height: 9007200000000000px;
        min-height: 18px;
        max-width: 100%;
        background-color: #fff;
        font-family: Arial;
        font-size: inherit;
        line-height: inherit;
        font-weight: inherit;
        color: inherit;
        border-radius: 0;
        border: none;
        resize: none;
        overflow: hidden;
        box-shadow: none;
        outline: none;
        word-break: break-all;
        width: 100%;
        box-sizing: border-box;
        padding: 0;
        text-align: center;
      }
    }

    .subtitle:hover {
      border-bottom: 1px solid #e7e9eb;
    }

    .subtitle:focus-within {
      border-bottom: 1px solid #1488ed;
    }

    .describe-set {
      display: flex;
      flex-wrap: wrap;
      margin-top: 15px;
      // display: none;

      .describe-add {
        flex: 1;
        text-align: right;
        cursor: pointer;

        .add {
          color: #1488ed;
          font-size: 12px;
          line-height: 16px;
        }
      }
    }
  }

  .form-subtitle:focus-within {
    box-shadow: 0 4px 16px 0 rgba(192, 198, 207, 0.5);
  }

  .edit:active {
    box-shadow: 0 4px 16px 0 rgba(192, 198, 207, 0.5);
  }
}
</style>
