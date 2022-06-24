<template>
  <div>
    <header-com :backable="false" :showUser="true">
      <template v-slot:formName>
        金山表单
      </template>
    </header-com>
    <section class="list-content">
      <div class="list-container">
        <action-com></action-com>
        <list-com></list-com>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import actionCom from "@/views/form-list/ActionCom.vue";
import listCom from "@/views/form-list/ListCom.vue";

export default defineComponent({
  name: 'form-list-com',
  components: {
    actionCom,
    listCom
  },
})
</script>

<style lang="scss" scoped>
//主体页面
.list-container {
  display: flex;
  height: calc(100vh - 56px);
}
</style>
