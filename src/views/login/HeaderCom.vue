<template>
  <header class="head">
    <div class="head-logo">
      <span class="logo"></span>
    </div>
  </header>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'header-com'
})
</script>

<style lang="scss" scoped>
// head
.head {
  background-color: #fff;
  border-bottom: 1px solid #e9e9e9;

  // logo容器
  .head-logo {
    display: flex;
    height: 56px;
    max-width: 1180px;
    margin: 0 auto;
    align-items: center;

    // logo
    .logo {
      display: inline-block;
      margin-left: 64px;
      vertical-align: top;
      width: 88px;
      height: 22px;
      background-image: url(//ac.wpscdn.cn/account/libs/img/v1/logo.676137dd.png);
    }
  }
}
</style>
