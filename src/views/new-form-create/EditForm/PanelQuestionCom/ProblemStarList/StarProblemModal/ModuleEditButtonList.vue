<template>
  <div class="button-list">
    <a-button class="button" @click="cancel">取消</a-button>
    <a-button type="primary" class="button" @click="confirm">确定</a-button>
  </div>
</template>

<script lang="ts">
import {reqCancelStarProblem, reqStarProblem} from '@/api/problem/api';
import {defineComponent, inject} from 'vue';
import {message} from "ant-design-vue";

export default defineComponent({
  name: 'ModuleEditButtonList',
  setup() {
    let isEdit = inject('isEdit') as any;
    let isVisible = inject('isVisible') as any;
    let currentProblem = inject("currentProblem") as any;
    const getStarProblemList = inject("getStarProblemList") as any;
    const cancel = () => {
      isEdit.value = false;
      isVisible.value = false;
    }
    const confirm = async () => {
      try {
        if (currentProblem.value.id) {
          await reqCancelStarProblem(currentProblem.value.id);
        }
        await reqStarProblem(currentProblem.value.problem);
        message.success('修改成功！');
        getStarProblemList();
        isEdit.value = false;
      } catch {
        message.error('提交失败，请重试！');
      }
    };

    return {
      cancel,
      confirm
    }
  }
})
</script>

<style scoped lang="scss">

.button-list {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 14px;

  .button {
    margin-left: 10px;
  }
}
</style>
