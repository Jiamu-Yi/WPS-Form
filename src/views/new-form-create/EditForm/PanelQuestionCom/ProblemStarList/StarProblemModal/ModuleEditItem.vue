<template>
  <div class="item-container">
    <div class="problems-add">
      <div class="problem-set"
      >
        <!-- 问题标题 -->
        <div class="set-item">
          <span class="problem-index">1.</span>
          <input
            v-model="currentProblem.problem.title"
            class="input-problem"
            placeholder="请输入题目"
            placeholder-style="color: #aeb5c0;"
          />
        </div>
        <!--详细问题-->
        <div class="problem-container">
          <template v-if="currentProblem.problem.type === 'date'">
            <date-com :problemItem="currentProblem.problem"></date-com>
          </template>
          <template v-if="currentProblem.problem.type === 'input'">
            <input-com></input-com>
          </template>
          <template v-if="currentProblem.problem.type === 'multiSelect'">
            <multi-select-com :problemItem="currentProblem.problem"></multi-select-com>
          </template>
          <template v-if="currentProblem.problem.type === 'pullSelect'">
            <pull-select-com :problemItem="currentProblem.problem"></pull-select-com>
          </template>
          <template v-if="currentProblem.problem.type === 'score'">
            <score-com></score-com>
          </template>
          <template v-if="currentProblem.problem.type === 'singleSelect'">
            <single-select-com :problemItem="currentProblem.problem"></single-select-com>
          </template>
          <template v-if="currentProblem.problem.type === 'time'">
            <time-com :problemItem="currentProblem.problem"></time-com>
          </template>
        </div>
        <!-- 问题类型 -->
        <div @blur="close" class="option-container">
          <div class="optionBox" @click="open">
            <span class="option">{{ title }}</span>
            <img
              alt=""
              class="optionImg"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+MDUg5Zu+5qCHL+WvvOiIqi/lsZXlvIA8L3RpdGxlPgogICAgPGcgaWQ9IjA1LeWbvuaghy/lr7zoiKov5bGV5byAIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i5LiL5ouJ5LiJ6KeSIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjAwMDAwMCwgNi4wMDAwMDApIiBmaWxsPSIjNzY3Qzg1Ij4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlRyaWFuZ2xlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjAwMDAwMCwgMi41MDAwMDApIHNjYWxlKC0xLCAtMSkgdHJhbnNsYXRlKC00LjAwMDAwMCwgLTIuNTAwMDAwKSAiIHBvaW50cz0iNCAwIDggNSAwIDUiPjwvcG9seWdvbj4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="
            />
          </div>
          <div :class="isShow ? 'optionsList optionsList_active' : 'optionsList'">
            <div
              v-for="(item, index) in problemTypes"
              :key="index"
              class="typeOption"
              @click="choose(item)"
            >
              <img
                v-show="title === item.title"
                alt=""
                class="typeOption_img"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzE0ODhFRCIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMy4yMTkgOC4yMjJsMS40MTQtMS40MTQgNC4yNDMgNC4yNDItMS40MTQgMS40MTV6Ii8+PHBhdGggZD0iTTYuMTY2IDEwLjkzMmw2LjM2NC02LjM2NCAxLjQxNCAxLjQxNC02LjM2NCA2LjM2NHoiLz48L2c+PC9zdmc+"
              />
              <span class="typeOption_content">{{ item.title }}</span>
            </div>
          </div>
        </div>
        <!-- 工具栏 -->
        <div class="tools-container">
          <div>
            <span>必填</span>
            <input v-model="isRequired" class="inputText" type="checkbox"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, inject, ref} from 'vue';
import dateCom from "@/views/new-form-create/EditForm/PanelEditCom/ProblemsCom/TypesCom/DateCom.vue";
import inputCom from "@/views/new-form-create/EditForm/PanelEditCom/ProblemsCom/TypesCom/InputCom.vue";
import multiSelectCom from "@/views/new-form-create/EditForm/PanelEditCom/ProblemsCom/TypesCom/MultiSelectCom.vue";
import pullSelectCom from "@/views/new-form-create/EditForm/PanelEditCom/ProblemsCom/TypesCom/PullSelectCom.vue";
import scoreCom from "@/views/new-form-create/EditForm/PanelEditCom/ProblemsCom/TypesCom/ScoreCom.vue";
import singleSelectCom from "@/views/new-form-create/EditForm/PanelEditCom/ProblemsCom/TypesCom/SingleSelectCom.vue";
import timeCom from "@/views/new-form-create/EditForm/PanelEditCom/ProblemsCom/TypesCom/TimeCom.vue";

export default defineComponent({
  name: 'ModuleEditItem',
  components: {
    dateCom,
    inputCom,
    multiSelectCom,
    pullSelectCom,
    scoreCom,
    singleSelectCom,
    timeCom,
  },
  setup() {

    let currentProblem = inject("currentProblem") as any;

    let isShow = ref<boolean>(false);

    let problemTypes = inject('problemTypes') as any;

    let isRequired = computed({
      get: () => {
        return currentProblem.value.problem ? currentProblem.value.problem.required : false;
      },
      set: (newValue) => {
        currentProblem.value.problem.required = newValue;
      },
    });

    const buildProblem = inject('buildProblem') as any;

    /**
     * @description: 英汉互译
     * @param name 传入的英文名
     */
    const translation = (name: string) => {
      switch (name) {
        case "input":
          return "填空题"
        case "singleSelect":
          return "单选题"
        case "multiSelect":
          return "多选题"
        case "pullSelect":
          return "下拉选择题"
        case "date":
          return "日期题"
        case "time":
          return "时间题"
        case "score":
          return "打分题"
      }
    };

    //标题
    let title = computed(() => {
      return currentProblem.value.problem.type ? translation(currentProblem.value.problem.type) : '';
    });

    /**
     * @description: 是否显示
     */
    const open = () => {
      // isShow控制是否展示下拉框
      isShow.value = !isShow.value
    };

    const close = () => {
      isShow.value = false
    };

    /**
     * @description: 返回值
     */
    const choose = (item: {
      title: string,
      type: string,
    }) => {
      currentProblem.value.problem.type = item.type;
      currentProblem.value.problem.setting = buildProblem(item.type).setting;
      isShow.value = !isShow.value;
    };

    return {
      isShow,
      title,
      isRequired,
      currentProblem,
      problemTypes,
      open,
      choose,
      close,
    }
  }
})
</script>

<style scoped lang="scss">
.item-container {
  width: 100%;
  max-height: 350px;
  margin-top: 8px;
  height: 40vh;
  background: #eff1f3;
  border-radius: 2px;
  padding: 95px 95px 25px;
  overflow-y: auto;

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

      .tools-container {
        display: flex;
        align-items: center;
        margin: 24px 0 0px 0;
        left: 24px;
        right: 24px;
        bottom: 8px;
        justify-content: flex-end;

        div {
          display: flex;
          align-items: center;

          .packs {
            display: inline-flex;
            align-items: center;
            user-select: none;
            margin-left: 16px;
            line-height: 1;
            padding: 6px 8px;
            background: rgba(25, 55, 88, 0.08);
            border-radius: 1px;
            font-size: 12px;
            color: #3e4858;
            margin-right: 16px;
            position: relative;
            cursor: pointer;

            span {
              font-size: 12px;
              color: #949aae;
            }

            .pack-type {
              margin-left: 3px;
              color: #767c85;
            }
          }


          .mustinput {
            display: inline-flex;
            align-items: center;
            user-select: none;
            margin-left: 16px;
            line-height: 1;
            cursor: pointer;

            .inputText {
              margin: 0 0.3em;
              outline: none;
            }

            span {
              font-size: 12px;
              color: #949aae;
            }

            .ifmust {
              margin-left: 8px;
            }

            div {
              width: 24px;
              height: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              margin-right: 7px;

              .must-tips {
                color: #767c85;
              }
            }
          }
        }
      }

      .option-container {
        position: absolute;
        top: -24px;
        left: 0px;

        .optionBox {
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
          outline: none;

          .option {
            flex: 1;
            text-align: center;
          }

          .optionImg {
            width: 12px;
            height: 12px;
          }
        }

        .optionsList {
          z-index: 999;
          position: absolute;
          top: 0px;
          padding: 4px;
          width: 140px;
          box-shadow: 0 4px 12px 0 rgba(56, 56, 56, 0.15);
          background: #fff;
          transform: scale(0);
          transition: 0.4s;
          visibility: hidden;
          opacity: 0;
          box-sizing: border-box;
        }

        .optionsList_active {
          z-index: 999;
          opacity: 1;
          transform: translateY(40px);
          visibility: visible;
        }

        .typeOption {
          height: 30px;
          line-height: 30px;
          padding: 0 10px 0 36px;
          font-size: 12px;
          color: #3d4757;
          position: relative;
          cursor: pointer;
          z-index: 1999;

        }

        .typeOption_img {
          width: 16px;
          height: 16px;
          position: absolute;
          left: 10px;
          top: 8px;
        }

        .typeOption_content {
          line-height: 30px;
          font-size: 12px;
          color: #3d4757;
        }
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


  :deep(.problem-set) {
    box-shadow: 0 4px 16px 0 rgb(192 198 207 / 50%) !important;
  }

  :deep(.problem-type) {
    display: block !important;
  }

  :deep(.tools) {
    display: block !important;
  }

  :deep(.expand-setting) {
    display: block !important;
  }

  :deep(.set-all) {
    display: none !important;
  }

  :deep(.copy) {
    display: none !important;
  }

  :deep(.delete) {
    display: none !important;
  }

  :deep(.more) {
    display: none !important;
  }

  :deep(.split-line) {
    display: none !important;
  }
}
</style>
