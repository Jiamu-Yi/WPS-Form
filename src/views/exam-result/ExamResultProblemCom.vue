<template>
  <div class="midouter">
    <form-com :formID="formId"></form-com>
    <div class="write">
      <div class="container">
        <div class="big-btn" @click="goEditForm">修改表单</div>
        <div class="small-btn" @click="goFillInForm">填写表单</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import formCom from '@/views/write/FormCom.vue'
import {useRoute, useRouter} from 'vue-router'
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'exam-result-problem-com',
  components: {formCom},
  setup() {
    const route = useRoute();
    const router = useRouter();
    let formId = route.params.id;

    /**
     * @description: 跳转到继续编辑页面
     */
    const goEditForm = () => {
      router.push({
        name: 'edit',
        query: {
          id: formId,
          ctgName: '继续编辑'
        }
      });
    };

    /**
     * @description: 跳转到填写表单
     */
    const goFillInForm = () => {
      router.push({
        name: 'write',
        params: {
          id: formId
        }
      });
    };

    return {
      formId,
      goEditForm,
      goFillInForm
    }
  }
})
</script>

<style scoped lang="scss">
* {
  outline: none;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.midouter {
  position: relative;
  text-align: center;
  width: 776px;
  margin: auto;

  .write {
    display: flex;
    position: fixed;
    height: 130px;
    width: 100vw;
    left: 0;
    bottom: 0;
    justify-content: center;

    .container {
      width: 920px;
      padding-bottom: 40px;
      background-color: white;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-direction: column;

      .big-btn {
        width: 156px;
        height: 32px;
        color: #ffffff;
        background-color: #1488ed;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px 20px;
        cursor: pointer;
        font-size: 14px;
        box-sizing: border-box;
        margin: 17px 0 21px 0;
      }

      .small-btn {
        color: #1890ff;
        cursor: pointer;
      }
    }
  }
}

</style>
