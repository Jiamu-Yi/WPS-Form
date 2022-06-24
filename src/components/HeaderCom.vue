<template>
  <div class="header">
    <div class="header-c">
      <!--      返回-->
      <div class="container" @click="back">
        <div v-if="backable" class="back">
          <svg
            class="back"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.36 7.922l4.564 4.44-1.172 1.26L4 7.872l.162-.162-.01-.01L9.892 2l1.22 1.23L6.36 7.922z"
              fill="#A0ACBF"
            ></path>
          </svg>
        </div>
        <!--      表头-->
        <div class="left-title">
          <div class="logo-set">
            <slot name="logo">
              <img class="cover"
                   src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+5paH5qGj5qC85byP5Zu+5qCHL+ihqOWNlS8yNDwvdGl0bGU+CiAgICA8ZGVmcz4KICAgICAgICA8bGluZWFyR3JhZGllbnQgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSIgaWQ9ImxpbmVhckdyYWRpZW50LTEiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMzBBOEZGIiBvZmZzZXQ9IjAlIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMxMjdDRjEiIG9mZnNldD0iMTAwJSI+PC9zdG9wPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8L2RlZnM+CiAgICA8ZyBpZD0i5paH5qGj5qC85byP5Zu+5qCHL+ihqOWNlS8yNCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IuihqOWNlSI+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMTkiIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQtMSkiIHg9IjAiIHk9IjAiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgcng9IjIiPjwvcmVjdD4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0xOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNC43MTg3NTAsIDUuNTYyNTAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTMuMjUsMC40NTAwNjgxOTQgQzEzLjgxMDUwMzMsMC40NTAwNjgxOTQgMTQuMjY2NTY1NSwwLjg5NzIzMzUyOSAxNC4yODA5MDI0LDEuNDU0Mjc5OTkgTDE0LjI4MTI1LDEuNDgxMzE4MTkgTDE0LjI4MTI1LDEyLjQwODQxMzIgQzE0LjI4MTI1LDEyLjk2ODkxNjUgMTMuODM0MDg0NywxMy40MjQ5Nzg3IDEzLjI3NzAzODIsMTMuNDM5MzE1NyBMMi4yOTEzMTk5NSwxMy40Mzk2NjMyIEMxLjczMDgxNjY4LDEzLjQzOTY2MzIgMS4yNzQ3NTQ0NiwxMi45OTI0OTc5IDEuMjYwNDE3NTIsMTIuNDM1NDUxNCBMMS4yNjAwNjk5NSw2LjQ0NDg2NTcxIEwzLjI2OTA5NzAyLDYuNDQ0ODY1NzEgTDMuMjY5MDk3MDIsMTEuNDMyODU5MSBMMTIuMjgxMTg2OSwxMS40MzI4NTkxIEwxMi4yODExODY5LDIuNDYwODg3MyBMOS4xMTI1LDIuNDYwODg3MyBMNy40NTAyNTI4NCw0Ljk5NjY2Nzg4IEM3LjI4NDE5Njk0LDUuMjYxNzc3NTcgNi45OTcyOTE4Miw1LjQyNjAyMTc5IDYuNjg1OTQ2MTUsNS40MzYwMjgxNiBMNi42NTU3NDI4Niw1LjQzNjUxMzIzIEwwLjIwMjkxNjA2Niw1LjQzNjA2ODE5IEwxLjM0ODkxNjA3LDMuNDQ5MDY4MTkgTDYuMjQwNDY4NzUsMy40NDkzNDEzOCBMNy45MDI4NTYxOCwwLjg4OTkxMzU0NiBDOC4wNjg5MTIwNywwLjYyNDgwMzg2MiA4LjM1NTgxNzE5LDAuNDYwNTU5NjM2IDguNjY3MTYyODcsMC40NTA1NTMyNjkgTDEzLjI1LDAuNDUwMDY4MTk0IFoiIGlkPSLlvaLnirbnu5PlkIgiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTUuODA3NzM5NTgsMC40Mzc1IEw1LjgwNzI1LDAuNDcyNSBMNC42NzYyNSwyLjQzMDUgTDEuMjgxMjUsMi40MzA1IEwyLjQzMjI1LDAuNDM3NSBMNS44MDc3Mzk1OCwwLjQzNzUgWiIgaWQ9IuW9oueKtue7k+WQiCI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="
              />
            </slot>
          </div>
          <h1 class="title-set">
            <slot name="formName"></slot>
          </h1>
        </div>
      </div>
      <slot name="icon"></slot>

      <!--      用户头像以及姓名-->
      <div v-if="showUser" class="drop-down">
        <div class="user-message">
          <a-avatar
            v-if="this.$store.state.userInfo.avatar === '' || this.$store.state.userInfo.avatar === ' ' "
            :size="28"
            class="avatar-title"
            @click="show"
          >
            <template #icon>
              <UserOutlined/>
            </template>
          </a-avatar>
          <img v-else
               :src="this.$store.state.userInfo.avatar"
               class="avatar-title"
               @click="show"
          >
          <p class="user-name">{{ nickname }}</p>
        </div>
        <div v-show="isShow" class="dropdown--content popover">
          <div class="avatar-popover">
            <div class="nickname">{{ nickname }}</div>
            <ul class="function-list">
              <li class="item" @click="goToUserCenter">个人中心</li>
              <li class="item" @click="loginOut">退出账号</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="height: 56px"></div>

</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {reqLoginOut} from "@/api/auth/api";
import {message} from "ant-design-vue";
import {resGetInfo} from "@/api/user/api";
import {UserOutlined} from '@ant-design/icons-vue';

export default defineComponent({
  name: 'header-com',
  props: {
    backable: Boolean,
    showUser: Boolean,
    preview: Boolean
  },
  components: {
    UserOutlined
  },
  setup() {
    let isShow = ref<boolean>(false);  //是否展示
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    onMounted(async () => {
      //处理刷新没有拿到UserInfo的情况
      if (store.state.userInfo) {
        let userInfo = await resGetInfo();
        store.commit('SAVEUSERINFO', userInfo.data.data?.user);
      }
    });

    const nickname = computed(() => store.state.userInfo.nickname);

    /**
     * @description: 点击后展示用户其他信息
     */
    const show = () => {
      isShow.value = !isShow.value;
    };

    const back = () => {
      if (route.path !== '/form-list') {
        router.back();
      }
    };

    /**
     * @description: 进入个人中心
     */
    const goToUserCenter = () => {
      router.push({
        name: 'user-center'
      });
    };

    /**
     * @description: 退出登录
     */
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

    return {
      nickname,
      isShow,
      show,
      back,
      goToUserCenter,
      loginOut,
    }
  }
})
</script>

<style lang="scss" scoped>

svg:not(:root) {
  overflow: hidden;
}

.header {
  z-index: 10;
  position: fixed;
  background-color: #fff;
  border-bottom: 1px solid #e9e9e9;
  width: 100%;

  .header-c {
    z-index: 10;
    display: flex;
    height: 56px;
    max-width: 1180px;
    align-items: center;
    padding: 0 16px;
    background-color: #ffffff;

    .container {
      display: flex;
      align-items: center;
      cursor: pointer;

      .back {
        width: 16px;
        height: 16px;
        margin: 0 14px 0 -2px;
      }

      .left-title {
        line-height: 25px;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: center;
        justify-content: center;

        .logo-set {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 8px;
          width: 30px;
          height: 30px;

          .cover {
            height: 30px;
            width: 30px;
          }
        }

        .title-set {
          font-size: 18px;
          font-weight: 500;
          color: #3c414b;
          margin: 0.67em 0;
        }
      }
    }


    .drop-down {
      position: absolute;
      right: 20px;

      .user-message {
        display: flex;
        align-items: center;

        .avatar-title {
          width: 28px;
          height: 28px;
          margin-left: 24px;
          border-radius: 50%;
          position: relative;
          cursor: pointer;
        }

        .user-name {
          margin: 0 0 0 0.5em;
          font-size: medium;
          font-weight: bold;
        }
      }

      .dropdown--content {
        position: absolute;
        z-index: 999;
      }

      .popover {
        top: 42px;
        left: -60px;
      }

      .avatar-popover {
        padding: 12px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: white;
        -webkit-box-shadow: 0 2px 12px 0 rgba(56, 56, 56, 0.2);
        box-shadow: 0 2px 12px 0 rgba(56, 56, 56, 0.2);
        border-radius: 2px;
        border: 1px solid #d3d3d3;

        .nickname {
          padding: 0 0 16px 0;
          margin: 0 10px 4px 10px;
          font-size: 14px;
          color: #3d4757;
          line-height: 14px;
          font-weight: 600;
          text-align: left;
          border-bottom: 1px solid #e2e6ed;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .function-list {
          padding: 0;

          .item {
            font-size: 12px;
            line-height: 30px;
            color: #3d4757;
            white-space: nowrap;
            cursor: pointer;
            margin-top: 4px;
            list-style: none;
            padding: 0 10px;
          }
        }
      }
    }
  }
}

</style>
