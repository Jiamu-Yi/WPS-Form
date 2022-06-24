<template>
  <div class="add">
    <plus-outlined class="plus"/>
    <span class="title" @click="addNewStarProblem">添加新的常用题</span>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject} from 'vue'
import {PlusOutlined} from "@ant-design/icons-vue";

export default defineComponent({
  name: 'ModalManagePlus',
  components: {
    PlusOutlined
  },
  setup() {
    let isEdit = inject('isEdit') as any;
    let buildProblem = inject('buildProblem') as any;

    let currentProblem = inject("currentProblem") as any;

    const addNewStarProblem = () => {

      const item = buildProblem('input');
      currentProblem.value = {
        id: '',
        uId: '',
        status: 2,
        problem: item
      };
      isEdit.value = true;
    }

    return {
      addNewStarProblem
    }
  }
})
</script>

<style scoped lang="scss">
.add {
  margin-bottom: 16px;

  .plus {
    color: #1488ed;
    margin-right: 4px;
  }

  .title {
    color: #1488ed;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
