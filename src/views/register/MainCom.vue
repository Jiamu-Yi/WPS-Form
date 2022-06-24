<template>
  <main class="main">
    <div class="main-item">
      <div class="nav">
        <router-link to="/login">
          <left-outlined class="return-login"/>
        </router-link>
        <span class="nav-title">账号注册</span>
      </div>
      <div class="login-info">
        <div class="info-item">
          <a-input v-model:value="account" class="info-input" placeholder="用户名"/>
        </div>
        <div class="info-item password">
          <a-input-password v-model:value="pwd" placeholder="密码" size="large"/>
        </div>
        <div class="info-item password">
          <a-input-password v-model:value="confirmPwd" placeholder="确认密码" size="large"/>
        </div>
        <span class="info-password">密码为8-16位大小写字母、数字或符号3种组合</span>
        <a-button block class="register-btn" @click="handleRegister">立即注册</a-button>
      </div>
      <div class="info-checkbox">
        <label>
          <a-checkbox v-model:checked="checked" check-img/>
          <span class="checkbox-txt">已阅读并同意</span>
          <a class="protocal" href="http://www.wps.cn/privacy/privacyprotect/">隐私协议</a>
          <span>和</span>
          <a class="protocal" href="http://www.wps.cn/privacy/account/">在线服务协议</a>
        </label>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import {reqRegister} from '@/api/auth/api';
import {defineComponent, ref} from 'vue';
import {message} from 'ant-design-vue';
import router from "@/router";

export default defineComponent({
  name: 'main-com',
  setup() {
    const account = ref<string>('');
    const pwd = ref<string>('');
    const confirmPwd = ref<string>('');
    const checked = ref<boolean>(false);
    /**
     * @description: 注册功能
     */
    const handleRegister = async () => {
      if (account.value === '' || pwd.value === '' || confirmPwd.value === '' || (account.value && pwd.value && confirmPwd.value === '')) {
        message.warn('当前输入不能为空'); //输出错误
        return;
      } else if (pwd.value !== confirmPwd.value) {
        message.warn('您的确认密码与第一次输入的不一致，请重新输入')
      } else if (!checked.value) {
        message.warn('请同意隐私与在线服务协议！');  //输出错误
      } else {
        try {
          const result = await reqRegister(account.value, pwd.value, confirmPwd.value);
          if (result?.data.stat === 'ok') {
            message.success('注册成功，请登陆！');
            router.push({path: '/login'});
          } else {
            message.warn(result.data?.msg + '，请重新输入用户名'); //输出错误清空输入框
            account.value = '';
            pwd.value = '';
            confirmPwd.value = '';
          }
        } catch {
          message.warn('用户已存在，请重新输入用户名'); //输出错误清空输入框
          account.value = '';
          pwd.value = '';
          confirmPwd.value = '';
        }
      }
    }
    return {
      account,
      pwd,
      confirmPwd,
      checked,
      handleRegister
    }
  },
})
</script>

<style lang="scss" scoped>
// 登录注册
.main {
  overflow: hidden;
  width: 358px;
  margin: 90px auto 0;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #d8d8d8;
  position: relative;

  .main-item {
    overflow: visible;
    position: relative;
    width: 260px;
    min-height: 408px;
    margin: 0 auto;

    // 注册标题容器
    .nav {
      text-align: center;
      padding-top: 37px;

      // 返回按钮
      .return-login {
        margin-top: 4px;
        width: 12px;
        height: 18px;
        position: absolute;
        left: -4px;
        color: #585757;
        font-size: 18px;
      }

      // 返回按钮
      .return-login {
        margin-top: 4px;
        width: 12px;
        height: 18px;
        position: absolute;
        left: -4px;
        color: #585757;
        font-size: 18px;
      }

      // 注册标题
      .nav-title {
        font-size: 18px;
        line-height: 24px;
        color: #535252;
      }
    }

    // 注册信息
    .login-info {
      margin-top: 31px;
      display: block;
      text-align: left;
      width: 100%;
      position: relative;

      // 输入框容器
      .info-item {
        position: relative;
        width: 100%;
        background: #fff;
        border-radius: 3px;

        // 输入框
        .info-input {
          height: 42px;
          position: relative;
          background-color: transparent;

          //.ant-input{
          //  size: large;
          //  height: 42px !important;
          //}

          input::placeholder {
            color: #a8a8a8;
          }
        }
      }

      .password {
        margin-top: 10px;
      }

      // 注册密码要求
      .info-password {
        color: #aaa;
        display: block;
        min-height: 18px;
        margin-top: 0;
        padding-top: 10px;
        font-size: 12px;
        line-height: 18px;
      }

      // 注册按钮
      .register-btn {
        height: 44px;
        line-height: 44px;
        font-size: 14px;
        background-color: #1E86E7;
        color: #fff;
        border-radius: 4px;
        border-style: none;
        padding: 0;
        margin-top: 10px;
      }
    }

    // 协议
    .info-checkbox {
      width: 100%;
      font-size: 12px;
      line-height: 18px;
      color: #aaa;
      text-align: left;
      padding-top: 20px;

      // 协议
      .phoneProtocal {
        position: unset;
        width: 100%;
        padding-top: 18px;
        text-align: center;
        font-size: 12px;
        line-height: 18px;
        color: #aaa;
      }

      .check-img {
        margin-top: 4px;
      }

      .checkbox-txt {
        margin-left: 6px;
      }

      .protocal {
        color: #9B9B9B;
        font-size: 12px;
        text-decoration: underline;
        line-height: 20px;
        outline: 0;
        cursor: pointer;
      }
    }
  }
}
</style>
