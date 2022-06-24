<template>
  <div class="box">
    <div class="line-top"><span>绑定手机，让登录使用更安全</span></div>
    <div class="intro-container">
      <div class="el-row" style="margin-left:-12px;margin-right:-12px;">
        <div class="el-col el-col-20" style="padding-left:12px;padding-right:12px;">
          ******
        </div>
      </div>
      <div class="right-el el-col el-col-4" style="padding-left:12px;padding-right:12px;" @click="showModal">
        更换密码
      </div>
    </div>
  </div>
  <div>
    <a-modal v-model:visible="visible" title="重设密码" @ok="handleOk">
      <template #footer>
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" @click="handleOk">确定</a-button>
      </template>
      <a-input-password v-model:value="oldPwd" class="item" placeholder="请输入原密码" :allowClear="true"/>
      <a-input-password v-model:value="newPwd" placeholder="请输入新密码" :allowClear="true"/>
      <a-input-password v-model:value="confirmPwd" placeholder="请再次输入新密码" :allowClear="true"/>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {message} from "ant-design-vue";
import {reqChangePwd} from "@/api/user/api";
import {useRouter} from "vue-router";


export default defineComponent({
  name: 'user-password-com',
  setup() {
    const loading = ref<boolean>(false);
    const visible = ref<boolean>(false);
    const oldPwd = ref<string>('');
    const newPwd = ref<string>('');
    const confirmPwd = ref<string>('');
    const router = useRouter()
    const showModal = () => {
      visible.value = true;
    };

    const handleOk = async () => {
      if (newPwd.value !== confirmPwd.value) {
        message.warn('两次密码不相同！');
        return;
      }
      if (newPwd.value && oldPwd.value && confirmPwd.value) {
        try {
            await reqChangePwd(oldPwd.value, newPwd.value, confirmPwd.value);
          visible.value = false;
          sessionStorage.clear()
          router.push({
            name: 'login'
          });
            message.success('修改成功，请重新登陆！');
        } catch {
          message.warn('原填写错误！');
        }
      }
    };

    const handleCancel = () => {
      visible.value = false;
    };

    return {
      loading,
      visible,
      oldPwd,
      newPwd,
      confirmPwd,
      showModal,
      handleOk,
      handleCancel,
    };
  }
})
</script>

<style scoped lang="scss">
.box {
  width: 906px;
  background: #fff;
  border: 1px solid #e7e9eb;
  border-radius: 2px;
  margin-top: 12px;
  padding: 0 30px;

  .line-top {
    margin-top: 30px;
    color: #969696;
  }

  .intro-container {
    display: flex;
    margin-top: 24px;
    margin-bottom: 30px;
    line-height: 32px;
    font-size: 16px;
    justify-content: space-between;

    .right-el {
      font-size: 14px;
      padding: 0 !important;
      color: #2e68f8;
      cursor: pointer
    }
  }
}

.ant-input-password {
  padding: 6px 4px;
  margin: 10px 0;
}
</style>
