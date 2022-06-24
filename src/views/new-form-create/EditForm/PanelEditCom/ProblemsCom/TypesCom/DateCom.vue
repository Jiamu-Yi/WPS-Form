<template>
  <!-- 回答区 -->
  <div tabindex="0" @blur="close" class="answer-area">
    <div class="date-type">
      <div @click.stop="openData" style="margin: 0">
        <i class="iconfont icon-date" style="color: #1488ED;"></i>
        <svg width="10" height="8" style="margin-left: 6px" xmlns="http://www.w3.org/2000/svg" class="arrow-icon_2irI9">
          <path d="M2.5 3L5 0H0z" fill="#767C85" fill-rule="evenodd"></path>
        </svg>
      </div>
      <div>
        <div :class="isShowData ? 'DataList DataList_active' : 'DataList'">
          <div style="min-width: 140px; left: 70px;"
               v-for="(item,index) in dateFormat"
               :key="index"
               @mousedown.prevent
               @click="choiceDate(item,index)"
               class="container">
            <svg :class="{passtive:item !== dateValue , active: item === dateValue }" width="16"
                 height="16" xmlns="http://www.w3.org/2000/svg" class="item-icon_unchecked_3PueD">
              <g fill="#1488ED" fill-rule="evenodd">
                <path d="M3.219 8.222l1.414-1.414 4.243 4.242-1.414 1.415z"></path>
                <path d="M6.166 10.932l6.364-6.364 1.414 1.414-6.364 6.364z"></path>
              </g>
            </svg>
            <div class="choosediv">
              <span v-html="item"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="date-picker">
      <div v-html="dateValue"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, toRef} from "vue";

export default defineComponent({
  name: 'data-com',
  props: ['problemItem'],
  setup(props) {
    let dateValue = ref<any>("年&nbsp;&nbsp;&nbsp;&nbsp;月",);
    let item = toRef(props, 'problemItem');
    let isShowData = ref<boolean>(false);
    const dateFormat = [
      "年&nbsp;&nbsp;&nbsp;&nbsp;月",
      "年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日",
      "年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;时&nbsp;&nbsp;&nbsp;&nbsp;分"
    ];
    const openData = async () => {
      isShowData.value = true;
    }
    const close = async () => {
      isShowData.value = false;
    }
    const choiceDate = (data: any, index: number) => {
      item.value.setting.options[0].status = index + 1;
      dateValue.value = data;
      isShowData.value = false;
    }

    return {
      dateValue,
      dateFormat,
      isShowData,
      choiceDate,
      openData,
      close
    }
  }
})
</script>

<style lang="scss" scoped>
// 回答区
.answer-area {
  background: #fff;
  font-size: 12px;
  width: 100%;
  color: #aeb5c0;
  padding: 0 0 6px 0;
  margin-top: 8px;
  border-bottom: 1px dashed #e2e6ed;
  height: 34px;
  box-sizing: border-box;
  line-height: 34px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .date-type {
    display: flex;
    position: relative;
    width: 41px;
    height: 25px;
    align-items: center;

    div {
      margin-left: 7px;
      font-size: 7px;
      white-space: pre;
    }

    .dateshow {
      display: none;
      color: #1488ed;
      position: absolute;
      left: 10px;
      top: 15px;
    }
  }

  .date-picker {
    height: 24px;
    flex-grow: 1;
    position: relative;
    align-items: center;
    display: flex;

    .date-input {
      height: 24px;
      font-size: 12px;
      border: none;
      background-color: #fff;
      text-indent: 3px;
      width: 100%;
      display: flex;
      box-sizing: border-box;
      outline: none;
    }

    input::placeholder {
      color: #aeb5c0;
    }
  }
}

.dropdown-link {
  width: 5px;
  height: 3px;
}

.container {
  display: flex;
  align-items: center;

  .choosediv {
    padding-left: 6px;
    line-height: 30px;
    font-size: 12px;
    color: #3d4757;
  }

  .active {
    opacity: 1;
  }

  .passtive {
    opacity: 0;
  }
}

.choosediv:hover {
  background-color: snow;
}

.dropmenu {
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


.DataList {
  z-index: 999;
  position: absolute;
  top: 0px;
  left: 0;
  padding: 4px;
  width: 157.35px;
  box-shadow: 0 4px 12px 0 rgba(56, 56, 56, 0.15);
  background: #fff;
  transform: scale(0);
  transition: 0.4s;
  visibility: hidden;
  opacity: 0;
  box-sizing: border-box;
}

.DataList_active {
  z-index: 999;
  opacity: 1;
  transform: translateY(40px);
  visibility: visible;
}

// 回答区
.answer-area {
  background: #fff;
  font-size: 12px;
  width: 100%;
  color: #aeb5c0;
  padding: 0 0 6px 0;
  margin-top: 8px;
  border-bottom: 1px dashed #e2e6ed;
  height: 34px;
  box-sizing: border-box;
  line-height: 34px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .date-type {
    display: flex;
    position: relative;
    width: 41px;
    height: 25px;
    align-items: center;

    div {
      //margin-left: 7px;
      font-size: 7px;
      white-space: pre;
    }

    .dateshow {
      display: none;
      color: #1488ed;
      position: absolute;
      left: 10px;
      top: 15px;
    }
  }

  .date-picker {
    height: 24px;
    flex-grow: 1;
    position: relative;
    align-items: center;
    display: flex;

    .date-input {
      height: 24px;
      font-size: 12px;
      border: none;
      background-color: #fff;
      text-indent: 3px;
      width: 100%;
      display: flex;
      box-sizing: border-box;
      outline: none;
    }

    input::placeholder {
      color: #aeb5c0;
    }
  }
}

</style>
