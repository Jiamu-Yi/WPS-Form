<template>
  <div class="body">
    <!-- 工具栏 -->
    <div class="tools-container">
      <div>
        <div class="copy" @click.stop="addProblemByCopy(Item)">复制</div>
        <!-- 防止冒泡事件 -->
        <span class="split-line"/>
        <div class="mustinput">
          <span>必填</span>
          <input v-model="isRequired" class="inputText" type="checkbox"/>
          <div class="set-all">
            <a-dropdown placement="bottom" :trigger="['click']">
              <div class="ant-dropdown-link" @click="e => e.preventDefault()">
                <caret-down-outlined/>
              </div>
              <template #overlay>
                <a-menu style="min-width: 150px">
                  <a-menu-item style="font-size:12px;"
                               @click="setAllProblemsUnrequired()"
                               @mousedown.prevent>
                    设置所有题目为非必填
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
        <span class="split-line"/>
        <div class="delete" @click="delItem()">
          <delete-outlined style="color: #767C85;"/>
        </div>
        <div class="more">
          <a-dropdown placement="bottom" :trigger="['click']">
            <div class="ant-dropdown-link" @click="e => e.preventDefault()">
              <more-outlined style="color: #AEB5C0;"/>
            </div>
            <template #overlay>
              <a-menu style="min-width: 140px">
                <a-menu-item style="font-size:12px;"
                             @click="starProblem(Item)"
                             @mousedown.prevent>
                  将此题添加为常用题
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, inject, toRefs} from "vue";
import {CaretDownOutlined, DeleteOutlined, MoreOutlined} from '@ant-design/icons-vue';

export default defineComponent({
  name: "tools-com",
  components: {
    CaretDownOutlined,
    DeleteOutlined,
    MoreOutlined
  },
  props: {
    problemItem: {
      type: Object,
    },
  },
  setup(props) {
    let {problemItem} = toRefs(props);
    //防止Key冲突，做一个变量代理
    let Item = problemItem;
    let isRequired = computed({
      get: () => {
        return Item.value ? Item.value.required : false;
      },
      set: (newValue) => {
        Item.value ? (Item.value.required = newValue) : null;
      },
    });

    const addProblemByCopy = inject("addProblemByCopy") as any;

    const delItem = inject("delItem") as any;

    const setAllProblemsUnrequired = inject("setAllProblemsUnrequired") as any;

    const starProblem = inject("starProblem") as any;

    return {
      Item,
      isRequired,
      addProblemByCopy,
      delItem,
      setAllProblemsUnrequired,
      starProblem
    };
  },
});
</script>

<style lang="scss" scoped>
.body {
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

      .split-line {
        width: 1px;
        height: 12px;
        background: #e2e6ed;
      }

      .copy {
        margin-left: 10px;
        font-size: 12px;
        border: 1px solid #e2e6ed;
        margin-right: 10px;
        border-radius: 2px;
        padding: 0 5px;
        cursor: pointer;
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

      .delete {
        margin-left: 16px;
        line-height: 1;
        cursor: pointer;
      }

      .more {
        margin-left: 16px;
        cursor: pointer;
      }
    }
  }

  .must-tip {
    // display: none;
    position: absolute;
    top: 220px;
    left: 310px;
    transform-origin: 50% -4px 0px;
    padding-top: 8px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 12px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    z-index: 9;

    .must-shape {
      position: absolute;
      left: 45%;
      top: 0px;
      border-right: 7px solid transparent;
      border-left: 7px solid transparent;
      border-bottom: 7px solid #f5f5f5;

      .must-triangle {
        position: absolute;
        left: 45%;
        top: 2px;
        transform: translateX(-50%);
        overflow: hidden;
        background: transparent;
        pointer-events: none;
        border-right: 6px solid transparent;
        border-left: 6px solid transparent;
        border-bottom: 6px solid #fff;
      }
    }

    .must-item {
      height: 29px;
      font-size: 12px;
      color: #3e4858;
      background-color: #fff;
      padding: 6px 10px;
      min-height: 0;
      line-height: 17px;
      min-width: 30px;
      text-align: left;
      text-decoration: none;
      word-wrap: break-word;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      z-index: 10;

      div {
        font-size: 12px;
        line-height: 17px;
        color: #969696;
        align-items: center;
      }
    }
  }

  .delete-tip {
    // display: none;
    position: absolute;
    top: 180px;
    left: 400px;
    transform-origin: 50% -4px 0px;
    padding-top: 8px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 12px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    z-index: 9;

    .delete-shape {
      position: absolute;
      left: 35%;
      top: 0px;
      border-right: 7px solid transparent;
      border-left: 7px solid transparent;
      border-bottom: 7px solid #f5f5f5;

      .delete-triangle {
        position: absolute;
        left: 35%;
        top: 2px;
        transform: translateX(-50%);
        overflow: hidden;
        background: transparent;
        pointer-events: none;
        border-right: 6px solid transparent;
        border-left: 6px solid transparent;
        border-bottom: 6px solid #fff;
      }
    }

    .delete-item {
      height: 29px;
      font-size: 12px;
      color: #3e4858;
      background-color: #fff;
      padding: 6px 10px;
      min-height: 0;
      line-height: 17px;
      min-width: 30px;
      text-align: left;
      text-decoration: none;
      word-wrap: break-word;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      z-index: 10;

      div {
        font-size: 12px;
        line-height: 17px;
        color: #969696;
        align-items: center;
      }
    }
  }
}
</style>
