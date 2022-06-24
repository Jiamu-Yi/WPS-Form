<template>
  <main class="main">
    <div class="main-item">
      <div class="nav">
        <router-link to="/form-list">
          <left-outlined class="return-form-list"/>
        </router-link>
        <span class="nav-title">账号密码登录</span>
      </div>
      <div class="login-info">
        <div class="info-item">
          <a-input v-model:value="account" class="info-input" placeholder="用户名"/>
        </div>
        <div class="info-item password">
          <a-input-password v-model:value="pwd" autocomplete="new-password" class="info-input" placeholder="密码"
                            type="password"/>
        </div>
        <div class="register">
          <router-link to="/register">
            <div>
              注册新帐号
            </div>
          </router-link>
          <br>
          <a-button block class="login-btn" @click="login">立即登录</a-button>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import {reqLoginIn} from '@/api/auth/api';
import {resGetInfo} from '@/api/user/api';
import {useStore} from 'vuex';
import {message} from 'ant-design-vue';
import {defineComponent, ref} from 'vue';
import {useRouter} from "vue-router";
import {LeftOutlined} from '@ant-design/icons-vue';

export default defineComponent({
  name: 'main-com',
  components: {
    LeftOutlined
  },
  setup() {
    const account = ref<string>('');
    const pwd = ref<string>('');
    const router = useRouter();
    const store = useStore();
    /**
     * @description: 登录函数
     */
    const login = async () => {
      try {
        await reqLoginIn(account.value, pwd.value);  //登录结果
        try {
          let userInfo = await resGetInfo();  //获取用户信息
          if (userInfo.data.stat === 'ok') {          //如果登录成功将用户的个人信息
            store.commit('SAVEUSERINFO', userInfo.data.data?.user);
            message.success('用户登陆成功！');
            sessionStorage.isLogin = true;
            router.push({path: '/form-list'});
          }
        } catch {
          message.warning('用户获取错误，请重新登陆！');//登录失败提示
          pwd.value = '';
        }
      } catch {
        message.warning('账号或密码错误'); //登录失败提示
      }
    }
    return {
      account, //用户名
      pwd,       //密码
      login
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

    // 登录、注册标题容器
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
      .return-form-list {
        margin-top: 4px;
        width: 12px;
        height: 18px;
        position: absolute;
        left: -4px;
        color: #585757;
        font-size: 18px;
      }

      // 登录、注册标题
      .nav-title {
        font-size: 18px;
        line-height: 24px;
        color: #535252;
      }
    }

    // 登录信息
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

        // input:focus{
        //   outline:0
        // }

        // 输入框
        .info-input {
          height: 42px;
          position: relative;
          background-color: transparent;

          input::placeholder {
            color: #a8a8a8;
          }
        }
      }

      .password {
        margin-top: 10px;
      }

      .register {
        height: 30px;
        line-height: 20px;
        margin-top: 20px;
        text-align: left;

        a {
          text-decoration: none;
          color: #417FF9;
        }

        // 登录按钮
        .login-btn {
          height: 44px;
          line-height: 44px;
          font-size: 14px;
          background-color: #1E86E7;
          color: #fff;
          border-radius: 4px;
          border-style: none;
          padding: 0;

        }
      }
    }
  }
}
</style>
