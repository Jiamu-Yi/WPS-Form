<template>
  <div class="problems-add">
    <div class="problem-set"
         tabindex="1"
         @focus="choiceProblem(problemItem.id)"
         @blur="loseProblem"
         ref="itemRef"
    >
      <div class="set-item">
        <!-- 设置问题序号 -->
        <span class="problem-index"><span class="required" v-if="problemItem.required">*</span>{{
            problemIndex + 1
          }}.</span>
        <input
            v-model="problemItem.title"
            class="input-problem"
            placeholder="请输入题目"
            placeholder-style="color: #aeb5c0;"
            @keydown="choiceProblem(problemItem.id)"
        />
      </div>
      <div class="problem-container">
        <template v-if="problemItem.type === 'date'">
          <date-com :problemItem="problemItem"></date-com>
        </template>
        <template v-if="problemItem.type === 'input'">
          <input-com></input-com>
        </template>
        <template v-if="problemItem.type === 'multiSelect'">
          <multi-select-com :problemItem="problemItem"></multi-select-com>
        </template>
        <template v-if="problemItem.type === 'pullSelect'">
          <pull-select-com :problemItem="problemItem"></pull-select-com>
        </template>
        <template v-if="problemItem.type === 'score'">
          <score-com></score-com>
        </template>
        <template v-if="problemItem.type === 'singleSelect'">
          <single-select-com :problemItem="problemItem"></single-select-com>
        </template>
        <template v-if="problemItem.type === 'time'">
          <time-com :problemItem="problemItem"></time-com>
        </template>
      </div>
      <!-- 问题类型 -->
      <options-com :itemid="itemid"
                   class="problem-type"></options-com>
      <!-- 省略号-->
      <i class="iconfont icon-ellipsis ellipsis"/>
      <!-- 工具栏 -->
      <tools-com :problemItem="problemItem" class="tools"></tools-com>
      <!-- 移动 -->
      <div class="index-chang">
        <i class="iconfont icon-drag"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dateCom from "@/views/new-form-create/EditForm/PanelEditCom/ProblemsCom/TypesCom/DateCom.vue";
import inputCom from "@/views/new-form-create/EditForm/PanelEditCom/ProblemsCom/TypesCom/InputCom.vue";
import multiSelectCom from "@/views/new-form-create/EditForm/PanelEditCom/ProblemsCom/TypesCom/MultiSelectCom.vue";
import pullSelectCom from "@/views/new-form-create/EditForm/PanelEditCom/ProblemsCom/TypesCom/PullSelectCom.vue";
import scoreCom from "@/views/new-form-create/EditForm/PanelEditCom/ProblemsCom/TypesCom/ScoreCom.vue";
import singleSelectCom from "@/views/new-form-create/EditForm/PanelEditCom/ProblemsCom/TypesCom/SingleSelectCom.vue";
import timeCom from "@/views/new-form-create/EditForm/PanelEditCom/ProblemsCom/TypesCom/TimeCom.vue";
import optionsCom from "@/views/new-form-create/EditForm/PanelEditCom/ProblemsCom/OptionsCom.vue";
import toolsCom from "@/views/new-form-create/EditForm/PanelEditCom/ProblemsCom/ToolsCom.vue";
import {defineComponent, inject, onBeforeUpdate, provide, ref, toRefs, watch} from "vue";

export default defineComponent({
  name: 'problems-com',
  components: {
    dateCom,
    inputCom,
    multiSelectCom,
    pullSelectCom,
    scoreCom,
    singleSelectCom,
    timeCom,
    optionsCom,
    toolsCom,
  },
  props: ['Item', 'Index', 'itemid'],

  setup(props) {
    //获取props
    let {Item, Index, itemid} = toRefs(props);

    let problemItem = ref<any>(Item);

    let problemIndex = Index;
    //ref,用来获取焦点的定位
    let itemRef = ref<any>(null);

    //表单
    let form: any = inject("form");

    let currentProblemId: any = inject("currentProblemId");

    /**
     * @description: 选中问题触发
     * @param id
     */
    const choiceProblem = (id: string) => {
      console.log(123)
      currentProblemId.value = id;
    };

    /**
     * @description: 丢失焦点触发
     */
    const loseProblem = () => {
      currentProblemId.value = '';
    };

    /**
     * @description: 丢失焦点触发
     */
    watch(
      itemRef,
      () => {
        if (itemid.value === currentProblemId.value) {
          itemRef.value.focus();
          itemRef.value.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
    );

    onBeforeUpdate(() => {
      if (itemid.value === currentProblemId.value) {
        itemRef.value.focus();
        itemRef.value.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    });

    provide('problemItem', problemItem);

    return {
      form,
      problemItem,
      problemIndex,
      itemRef,
      choiceProblem,
      loseProblem
    }
  }
})
</script>

<style lang="scss" scoped>
.problems-add {
  background-color: #ffffff;
  opacity: 1 !important;
  margin-top: 24px;
  position: relative;
  min-height: 30px;
  min-width: 30px;
  outline: none;

  .problem-set {
    opacity: 1 !important;
    overflow: inherit !important;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    padding: 20px 24px 16px;
    outline: none;

    .ellipsis {
      opacity: 0;
      font-size: x-large;
      position: absolute;
      top: 40%;
      left: 50%;
    }

    .set-item {
      opacity: 1 !important;
      position: relative;
      background-color: #fff;
      padding: 8px 0 5px 0;
      border-bottom: 1px solid #fff;
      font-size: 14px;
      line-height: 18px;
      font-weight: bold;
      color: #3d4757;

      .problem-index {
        background-color: #fff;
        font-size: inherit;
        top: 8px;
        position: absolute;
        left: 0;
        z-index: 0;
        color: #3d4757;
        font-weight: initial;

        .required {
          color: red;
          position: absolute;
          left: -0.5rem;
        }
      }

      .input-problem {
        text-indent: 20px;
        height: 18px;
        min-height: 18px;
        max-height: 9007200000000000px;
        max-width: 100%;
        background-color: #fff;
        font-family: Arial;
        font-size: inherit;
        line-height: inherit;
        font-weight: inherit;
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
      }

      textarea::placeholder {
        color: #b7b7b7 !important;
        opacity: 0.9 !important;
      }
    }

    .set-item:hover {
      border-bottom: 1px solid rgba(25, 55, 88, 0.1);
    }

    .problem-type {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(-100%);
      z-index: 19999;

      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 92px;
        padding: 6px 10px;
        background: #fff;
        border-radius: 1px;
        font-size: 12px;
        color: #3d4757;
        box-shadow: 0 -3px 5px 0 rgba(192, 198, 207, 0.5);
        cursor: pointer;
      }

      span {
        flex: 1;
        text-align: center;
      }

      .problem-chang {
        color: #767c85;
      }
    }

    .tools {
      display: none;
    }
  }

  .index-chang {
    display: none;
    flex-wrap: wrap;
    position: absolute;
    top: 4px;
    left: 50%;
    cursor: move;
    color: #bdbdbd;
  }
}

.problem-set:focus-within {
  margin-top: 16px;

  .problem-type {
    display: block !important;
  }

  .tools {
    display: block !important;
  }

  .index-chang {
    display: flex !important;
  }

  box-shadow: 0 4px 16px 0 rgba(192, 198, 207, 0.5);
}
</style>
