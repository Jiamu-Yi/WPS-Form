<template>
  <div class="box">
    <div class="line-top">
        <span>使用真实姓名，让工作伙伴认识你
                <span style="font-size: 12px">
                  （一周内仅可修改 2 次昵称）
                </span>
        </span>
    </div>
    <div class="intro-container">
      <div class="nickname-text" v-if="!isEditng">
        <div class="el-row" style="margin-left:-12px;margin-right:-12px;">
          <div class="el-col el-col-20" style="padding-left:12px;padding-right:12px;">
            {{ nickname }}
          </div>
        </div>
      </div>
      <input v-model="tempNickname" v-if="isEditng" class="el-col nickname-input" style=""/>
      <div class="right-el el-col el-col-4" v-if="!isEditng" style="padding-left:12px;padding-right:12px;"
           @click="editNickname">
        修改
      </div>
      <div v-if="isEditng">
        <a-button size="middle" @click="cancel">取消</a-button>
        <a-button size="middle" type="primary" style="margin-left: 10px" @click="confirm">确认</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import {useStore} from "vuex";
import {reqSetInfo, resGetInfo} from "@/api/user/api";
import {message} from "ant-design-vue";

export default defineComponent({
  name: 'user-nickname-com',
  setup() {
    let isEditng = ref<boolean>(false);
    let tempNickname = ref<string>('');
    const store = useStore();

    let nickname = computed(() => {
      return store.state.userInfo.nickname ? store.state.userInfo.nickname : '';
    });

    const editNickname = () => {
      tempNickname.value = nickname.value;
      isEditng.value = true;
    };

    const cancel = () => {
      isEditng.value = false;
    };

    const confirm = async () => {
      try {
        await reqSetInfo(tempNickname.value, store.state.userInfo.avatar);
        let userInfo = await resGetInfo(); //获取用户信息
        store.commit('SAVEUSERINFO', userInfo.data.data?.user);
        message.success('修改成功！');
        isEditng.value = false;
      } catch {
        message.error('设置错误，请重试！');
      }
    };

    return {
      nickname,
      isEditng,
      tempNickname,
      editNickname,
      cancel,
      confirm
    }
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

    .nickname-input {
      border-radius: 2px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-color: #fff;
      background-image: none;
      border: 1px solid #bfcbd9;
      color: #1f2d3d;
      font-size: inherit;
      height: 32px;
      line-height: 1;
      outline: 0;
      padding: 3px 10px;
      width: 266px;
      display: inline-block;
      transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    }

    .right-el {
      font-size: 14px;
      padding: 0 !important;
      color: #2e68f8;
      cursor: pointer
    }
  }
}
</style>
