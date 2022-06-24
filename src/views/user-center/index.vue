<template>
  <div class="user-center">
    <user-header-com></user-header-com>
    <user-info-com></user-info-com>
    <user-nickname-com></user-nickname-com>
    <user-password-com></user-password-com>
  </div>
</template>

<script lang="ts">

import {resGetInfo,} from '@/api/user/api';
import {useStore} from 'vuex';
import {defineComponent, onMounted} from 'vue';
import userHeaderCom from "@/views/user-center/UserHeaderCom.vue";
import UserInfoCom from "@/views/user-center/UserInfoCom.vue";
import userNicknameCom from "@/views/user-center/UserNicknameCom.vue";
import userPasswordCom from "@/views/user-center/UserPasswordCom.vue";

export default defineComponent({
  name: 'user-center-com',
  components: {
    userHeaderCom,
    UserInfoCom,
    userNicknameCom,
    userPasswordCom
  },
  setup() {
    const store = useStore()
    onMounted(async () => {
      //处理刷新没有拿到UserInfo的情况
      if (store.state.userInfo) {
        let userInfo = await resGetInfo();
        store.commit('SAVEUSERINFO', userInfo.data.data?.user);
      }
    });
  }
})
</script>

<style lang="scss" scoped>
.user-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  height: 100vh;
}

</style>
