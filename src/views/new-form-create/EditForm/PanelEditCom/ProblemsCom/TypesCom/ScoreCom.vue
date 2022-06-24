<template>
  <!-- 分数题 -->
  <!-- 回答区 -->
  <div class="answer-area">
    <div class="star">
      <div class="star-pre">
        <div class="star-wrap">
          <i class="iconfont icon-star"></i>
        </div>
        <div class="star-wrap">
          <i class="iconfont icon-star"></i>
        </div>
        <div class="star-wrap">
          <i class="iconfont icon-star"></i>
        </div>
        <div class="star-wrap">
          <i class="iconfont icon-star"></i>
        </div>
        <div class="star-wrap">
          <i class="iconfont icon-star"></i>
        </div>
      </div>
      <div class="star-result">
        <div class="star-wrap">
          <i class="iconfont icon-star-full"></i>
        </div>
        <div class="star-wrap">
          <i class="iconfont icon-star-full"></i>
        </div>
        <div class="star-wrap">
          <i class="iconfont icon-star-full"></i>
        </div>
        <div class="star-wrap">
          <i class="iconfont icon-star-full"></i>
        </div>
        <div class="star-wrap">
          <i class="iconfont icon-star-full"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'score-com'
})
</script>

<style lang="scss" scoped>
// 回答区
.answer-area {
  padding-top: 15px;

  .star {
    position: relative;
    height: 19px;
    width: 110px;

    .star-pre,
    .star-result {
      display: flex;
      width: 100%;
      position: absolute;

      .star-wrap {
        color: #C2C2C2;
        padding-right: 6px;
      }
    }
  }
}
</style>
