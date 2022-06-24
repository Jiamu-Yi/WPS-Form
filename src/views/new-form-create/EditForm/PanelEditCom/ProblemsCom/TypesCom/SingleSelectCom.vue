<template>

  <draggable
    v-model="options"
    item-key="id"
    handle=".select-index"
    animation="200"
    forceFallback="false"
    @start="starDrag"
    @end="endDrag"
  >
    <template #item="{element,index}">
      <div class="answer-area">
        <div class="select-options" tabindex="-1">
          <holder-outlined class="select-index"/>
          <div class="select-option">
            <img class="select-btn"
                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAB7UlEQVRIS72WsYsTQRTGv2+dbHWBFKmChXBwau8/IYLeCaZQG8klYUcRLE7sxE68QhCZIYmLjVpEuDsF9Z+wVw8OLOSqFMG7JsmaJxN2JUbN5sC5Lfe9+X4z35t5M8Scr9PpnByNRpdIXhCRZQCVNH2f5J6IvCsUCm/q9fq3f8nwb4E4jivD4fABgBsicmLeJEj+APA8DMP7tVptfzb3D4Ax5iLJFyJSJDkSkR0AO0qpj6VSaSLQ7/crSZKcA7BKclVECiQPROS61vrtNOQ3gLX2tog8BhCQ3A6CYKPZbO7NW0Gr1Voej8ebIrIGYEzyThRFT7IxvwBu5gC208A9rfXmPOHZmDFmA8DD9P9atpIJIPX8s7MFwN2jimewFPLI2RWG4RlXkwnAWtsRkXVnSxRFl48y89lca+2Ws4vksyiK6nRbMUmSr86/IAjO5nmeB09r8snVUSl1isaYmwCeAnitta7mCSwSN8Z0AVwBcIvW2vcich7ANa31q0UE8nKMMVcBvCT5wa3gC4AVpdTpRqOxmzd4kXi73V5JksTp7jrAAYClcrlcrFarh4sI5OV0u92lXq/ndA+9AOI4Lg4Gg+8ZwK9Fx1Fkv9vU+0Hz3iqOpdk5iNd2nR0crxfOVE/3d2VmEK+X/nSf+R/Plp/fkmnyJLuhTAAAAABJRU5ErkJggg=="/>
            <div class="form-input-block">
              <textarea class="ant-input" :placeholder="'选项'+`${index+1}`"
                        style="height: 18px;
                        max-height: 9007200000000000px"
                        v-model="element.title"></textarea>
            </div>
            <div class="close" @click="delChoose" @mousedown.prevent>
              <close-outlined/>
            </div>
          </div>
        </div>
      </div>
    </template>
  </draggable>

  <!-- 选择题设置 -->
  <div class="expand-setting">
    <div>
      <div class="add-block" @click="addChoose">
        <plus-outlined style="margin-right: 4px;"/>
        <span>选项</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, inject, ref, toRef} from "vue";
import {message} from "ant-design-vue";
import draggable from 'vuedraggable';
import {CloseOutlined, HolderOutlined, PlusOutlined} from '@ant-design/icons-vue';

export default defineComponent({
  name: 'single-select-com',
  props: ["problemItem"],
  components: {
    draggable,
    PlusOutlined,
    CloseOutlined,
    HolderOutlined
  },
  setup(props) {
    let problemItem = toRef(props, 'problemItem');
    const getProblemListIndex = inject('getProblemListIndex') as any;
    let drag = ref<boolean>(false);

    /**
     * @description: 添加函数
     */
    const addChoose = () => {
      try {
        const newChoose = Object.assign({title: '', status: 1});
        options.value.push(newChoose);
      } catch {
        message.error("发生了错误，请重新操作！");
      }
    };

    /**
     * @description: 删除函数
     */
    const delChoose = () => {
      if (options.value.length > 1) {
        const index = getProblemListIndex();
        options.value.splice(index, 1);
      } else {
        message.warn("至少设置一个选项！");
      }
    };

    const starDrag = () => {
      drag.value = true;
    };

    const endDrag = () => {
      drag.value = false;
    };

    let options = computed({
      get: () => {
        return problemItem.value.setting.options;
      },
      set: (newValue) => {
        problemItem.value.setting.options = newValue;
      },
    });

    return {
      options,
      starDrag,
      endDrag,
      addChoose,
      delChoose
    }
  }
})
</script>

<style lang="scss" scoped>
// 回答区
.answer-area {
  position: relative;
  min-height: 30px;
  min-width: 30px;
  display: block;
  overflow: inherit !important;
  width: 100%;
  background-color: #fff;

  .select-options {
    position: relative;
    display: flex;
    align-items: center;
    color: #333;

    .select-index {
      position: absolute;
      width: 24px;
      height: 36px;
      top: 0;
      left: -24px;
      color: #BDBDBD;
      padding-top: 6px;
      padding-left: 4px;
      cursor: move;
      opacity: 0;
    }

    :hover {
      opacity: 1;
    }

    .select-option {
      flex: 1 1;

      img {
        cursor: initial;
        width: 12px;
        height: 12px;
        top: 11px;
        position: absolute;
        user-select: none;
        border-style: none;
      }

      .form-input-block {
        margin-left: 20px;
        margin-right: 20px;
        padding: 8px 0 5px 0;
        position: relative;
        border-bottom: 1px solid #fff;
        font-size: 14px;
        line-height: 18px;
        font-weight: bold;
        color: #3d4757;
        outline: none;

        .ant-input {
          font-size: 12px;
          min-height: 18px;
          background-color: #fff;
          color: #3d4757;
          font-family: Arial;
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
          text-overflow: ellipsis;
        }
      }

      .form-input-block:hover {
        border-bottom: 1px solid rgba(25, 55, 88, .1);
      }

      .add-img {
        display: none;
        color: #439ff0;
        font-size: 12px;
        right: 76px;
        bottom: 8px;
        position: absolute;
        user-select: none;
        cursor: pointer;
      }

      .close {
        display: none;
        position: absolute;
        right: 0;
        width: 12px;
        height: 12px;
        bottom: 11px;
        font-size: 12px;
        color: #AFB6C1;
        user-select: none;
        cursor: pointer;
      }
    }
  }

  .select-options:hover .select-index,
  .select-options:hover .add-img,
  .select-options:hover .close,
  .select-options:focus-within .add-img,
  .select-options:focus-within .close {
    display: block;
  }

  .select-options:focus-within .form-input-block {
    border-bottom: 1px solid #1488ed;
  }

}

// 选择题设置
.expand-setting {
  display: none;

  div {
    display: flex;
    align-items: center;
    height: 40px;

    .add-block {
      justify-content: flex-start;
      align-items: center;
      font-size: 12px;
      color: #1488ed;
      cursor: pointer;
    }

    .split-line {
      width: 1px;
      height: 12px;
      background: #e2e6ed;
      margin: 0 12px;
    }
  }
}

// 预设答案设置
.norepeat {
  display: none;
  font-size: 12px;
  color: #1488ed;
  cursor: pointer;

  .answer {
    display: flex;
    align-items: center;
    height: 40px;

    .norepeat-checkbox {
      margin-right: 8px;
    }

    .tips-icon {
      margin-left: 8px;
      font-size: 16px;

      a {
        color: #C0C6CF;
      }
    }
  }
}

.problems-add:focus-within .expand-setting,
.problems-add:focus-within .norepeat {
  display: block;
}

</style>
