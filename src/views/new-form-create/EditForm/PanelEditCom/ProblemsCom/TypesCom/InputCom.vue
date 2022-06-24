<template>
  <!-- 填空题 -->
  <div class="answer-area">
    <span>填写者回答区</span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'input-com'
})
</script>

<style lang="scss" scoped>
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

  span {
    color: #aeb5c0;
    font-size: 12px;
  }
}

// 重复限制设置
.norepeat {
  display: none;
  margin-right: 8px;
  font-size: 12px;
  color: #1488ed;
  cursor: pointer;

  div {
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

.problems-add:focus-within .norepeat {
  display: block;
}
</style>
