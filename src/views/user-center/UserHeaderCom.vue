<template>
  <div class="header">
    <svg
      @click="back"
      class="back"
      height="14"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.36 7.922l4.564 4.44-1.172 1.26L4 7.872l.162-.162-.01-.01L9.892 2l1.22 1.23L6.36 7.922z"
        fill="#A0ACBF"
      ></path>
    </svg>
    <span class="header-word-wps">WPS</span>
    <span class="header-word-center">个人中心</span>
  </div>
  <div class="topbar">
    <div class="logout" @click="loginOut">
      退出帐号
    </div>
  </div>
</template>

<script lang="ts">
import {reqLoginOut} from '@/api/auth/api';
import {defineComponent} from 'vue';
import {useRouter} from "vue-router";
import {message} from "ant-design-vue";

export default defineComponent({
  name: 'user-header-com',
  setup() {
    const router = useRouter();

    const loginOut = async () => {
      try {
        await reqLoginOut();
        router.push({
          name: 'login'
        });
        sessionStorage.clear()
        message.success('退出成功！');
      } catch {
        message.error('退出账号失败，请重试！');
      }
    };

    const back = () => {
      router.back();
    };

    return {
      loginOut,
      back
    }
  }
})
</script>

<style scoped lang="scss">
.header {
  cursor: pointer;
  left: 0;
  top: 0;
  width: 100%;
  height: 46px;
  background: #fafafa;
  box-shadow: 0 1px 0 0 #dbdbdb;
  display: block;
  line-height: 46px;

  .back {
    margin-left: 6px;
  }
  .header-word-wps {
    font-weight: 700;
    padding-left: 24px;
    margin-right: 4px;
    font-size: 14px;
    color: #484848;
    letter-spacing: 0;
    line-height: 14px;
  }

  .header-word-center {
    font-size: 14px;
    color: #484848;
    letter-spacing: 0;
    line-height: 14px;
  }
}

.topbar {
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  max-width: 910px;
  width: 908px;
  margin-right: auto;
  margin-left: auto;

  .logout {
    padding: 0 20px;
    margin: 16px 0;
    font-size: 12px;
    color: #969696;
    cursor: pointer;
  }
}
</style>
