<template>
  <div class="box-container">
    <img class="cover"
         src="data:image/png;base64,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"
         alt="暂无收集结果">
    <span class="title">
      暂无收集结果
    </span>
    <span @click="goToShare" class="invite">
      邀请填写
    </span>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject} from 'vue'
import {useRouter} from "vue-router";

export default defineComponent({
  name: 'NoResultCom',
  setup() {
    let formId: any = inject("formId");
    const router = useRouter();
    const goToShare = () => {
      router.push({
        name: 'share',
        query: {
          id: formId.value
        }
      });
    };

    return {
      goToShare
    }
  }
})
</script>

<style scoped lang="scss">
.box-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .cover {
    margin-top: 25%;
    width: 100px;
  }

  .title {
    font-size: 14px;
    color: #3d4757;
    text-align: center;
    margin-top: 16px;
    font-weight: 400;
  }

  .invite {
    font-size: 12px;
    display: block;
    color: #1488ed;
    margin-top: 4px;
    font-weight: 400;
    cursor: pointer;
  }
}
</style>
