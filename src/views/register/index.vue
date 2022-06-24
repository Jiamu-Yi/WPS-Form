<template>
  <div class="wps">
    <header-com></header-com>
    <main-com></main-com>
  </div>
</template>

<script lang="ts">
import headerCom from '@/views/register/HeaderCom.vue';
import mainCom from '@/views/register/MainCom.vue';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'registerCom',
  components: {
    headerCom,
    mainCom,
  },
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
