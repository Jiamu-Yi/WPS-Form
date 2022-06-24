<template>
  <div class="wps">
    <header-com></header-com>
    <main-com></main-com>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import headerCom from './HeaderCom.vue'
import mainCom from './MainCom.vue'

export default defineComponent({
  name: 'login-com',
  components: {
    headerCom,
    mainCom,
  }
})

</script>

<style lang="scss" scoped>
.wps {
  position: relative;
  height: 100vh;
  font-size: 14px;
  color: #535252;
  padding-top: .1px;
  background-color: #F7F7F7;

}
</style>
