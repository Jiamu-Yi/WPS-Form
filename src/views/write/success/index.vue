<template>
  <div class="header">
    <header-com :backable="false" :showUser="true">
      <template v-slot:formName>
        表单名称
      </template>
    </header-com>
  </div>
  <section class="form">
    <form class="form-container">
      <div class="box-container">
        <div class="message">
          <div class="cover">
            <img style="width: 40px"
                 src="data:image/png;base64,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"
                 class="src-newform-pc-pages-form-write-components-FormHanded-index__successIcon">
          </div>
          <span class="title">提交成功</span>
        </div>
        <a-button type="primary" @click="writeAgain">再写一份</a-button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useRoute, useRouter} from "vue-router";

export default defineComponent({
  name: 'SuccessCom',
  setup() {
    const route = useRoute();
    const router = useRouter();

    const writeAgain = () => {
      router.replace({
        name: 'write',
        query: {
          id: route.query.id ? route.query.id.toString() : ''
        }
      });
    };

    return {
      writeAgain
    }
  }
})
</script>

<style scoped lang="scss">
.form {
  padding-top: 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  min-height: 775px;
  background-color: #f2f4f7;

  .form-container {
    width: 776px;
    min-height: -webkit-calc(100vh - 88px);
    min-height: calc(100vh - 88px);
    background-color: #fff;
    min-height: -webkit-calc(100vh - 88px);
    min-height: calc(100vh - 88px);
    padding: 48px 102px 90px 102px;
    color: #3d4757;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;

    .box-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 10%;

      .message {
        display: flex;
        align-items: center;
        margin-bottom: 48px;

        .title {
          margin-left: 1rem;
          font-size: 16px;
          color: #767c85;
        }
      }
    }
  }
}

@media only screen and (max-width: 660px) {
  .header {
    display: none;
  }
  .form-container {
    justify-content: center;
  }
}


</style>
