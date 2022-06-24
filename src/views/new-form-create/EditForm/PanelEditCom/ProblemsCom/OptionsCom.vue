<template>
  <div tabindex="0" @blur="close">
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
        v-for="(item, index) in options"
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
</template>

<script lang="ts">
import {computed, defineComponent, inject, onMounted, ref, toRef} from 'vue';

export default defineComponent({
  name: 'options-com',
  props: ['itemid', 'Item'],
  setup(props) {
    let isShow = ref<boolean>(false);
    //下拉列表
    let options = inject('problemTypes') as any;

    const buildProblem = inject('buildProblem') as any;

    const form = inject('form') as any;

    let problemItem = ref<any>('');

    let itemid = toRef(props, 'itemid') as any;

    onMounted(() => {
      form.value.problems.forEach((item: any) => {
        if (item.id === itemid.value) {
          problemItem.value = item;
        }
      });
    });

    //标题
    let title = computed(() => {
      return problemItem.value.type ? translation(problemItem.value.type) : '';
    });

    /**
     * @description: 是否显示
     */
    const open = async () => {
      // isShow控制是否展示下拉框
      isShow.value = !isShow.value;
    };

    /**
     * @description: 返回值
     */
    const choose = (item: {
      title: string,
      type: string,
    }) => {
      form.value.problems.forEach((problem: any) => {
        if (problem.id === itemid.value) {
          problem.type = item.type;
          problem.setting = buildProblem(item.type).setting;
        }
      });
      isShow.value = !isShow.value;
    };

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

    const close = () => {
      isShow.value = false;
    };

    return {
      isShow,
      title,
      options,
      open,
      choose,
      close,
    }
  }
})
</script>

<style lang="scss" scoped>
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
</style>
