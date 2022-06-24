<template>
  <div class="info">
    <div class="avatar">
      <div class="avatar-icon">
        <div class="user-avatar" @click="showModal">
          <a-avatar v-if="this.$store.state.userInfo.avatar === '' || this.$store.state.userInfo.avatar === ' ' "
                    :size="80">
            <template #icon>
              <UserOutlined/>
            </template>
          </a-avatar>
          <img v-else :src="avatar" class="img-circle">
          <div class="avatar-mask">
            <span data-v-79e1366c="">修改头像</span>
          </div>
        </div>
      </div>
      <div class="avatar-username">
        <p>{{ nickname }}</p>
      </div>
      <div class="avatar-userid-level">
        <span class="avatar-userid">ID  {{ id }}</span>
      </div>
    </div>
  </div>

  <a-modal v-model:visible="visible" title="修改头像" @ok="handleOk" style="top: 30%">
    <div class="upload-btn">
      <a-upload
        accept=".jpg,.jpeg,.png"
        name="file"
        :max-count="1"
        :before-upload="beforeUpload"
        @remove="removeFile"
        @change="picChange"
      >
        <template #footer>
          <a-button key="back" @click="handleCancel">取消</a-button>
          <a-button key="submit" type="primary" @click="handleOk">确定</a-button>
        </template>
        <a-button class="choosepic">
          <upload-outlined></upload-outlined>
          请选择要上传的图片
        </a-button>
      </a-upload>
      <div class="cover-container">
        <img class="cover" :src="fileSrc">
      </div>

    </div>
  </a-modal>

</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import {useStore} from "vuex";
import type {UploadChangeParam} from 'ant-design-vue';
import {message} from "ant-design-vue";
import {UploadOutlined, UserOutlined} from '@ant-design/icons-vue';
import {reqSetInfo, reqUpload, resGetInfo} from "@/api/user/api";

export default defineComponent({
  name: 'user-info-com',
  components: {
    UploadOutlined,
    UserOutlined
  },
  setup() {
    const store = useStore();
    //是否展示对话框
    const visible = ref<boolean>(false);
    //上传文件列表
    const fileList = ref<any>([]);
    //图片链接
    let fileSrc = ref<string>('');
    //文件
    const file = ref<any>();
    //展示用户ID
    const id = computed(() => {
      return store.state.userInfo.id ? store.state.userInfo.id : '';
    });
    //展示用户用户名
    const nickname = computed(() => {
      return store.state.userInfo.nickname ? store.state.userInfo.nickname : '';
    });
    //展示用户头像
    const avatar = computed(() => {
      //添加一个刚注册用户的默认头像
      return store.state.userInfo.avatar !== '' && store.state.userInfo.avatar !== ' ' ? store.state.userInfo.avatar : 'https://img.qwps.cn/671714982_8e1530b95e9deae0fb218bb7a25e4c3f?imageMogr2/thumbnail/180x180!';
    });
    //显示对话框
    const showModal = async () => {
      visible.value = true;
    };
    //对话框取消
    const handleCancel = () => {
      visible.value = false;
    };
    //对话框确定
    const handleOk = async () => {
      try {
        await reqSetInfo(nickname.value, fileSrc.value);
        message.success('修改成功')
        let userInfo = await resGetInfo();
        store.commit('SAVEUSERINFO', userInfo.data.data?.user);
      } catch {
        message.error('修改失败，请重试！');
      }
      visible.value = false;
    };
    //当添加图片时
    const picChange = async (info: UploadChangeParam) => {
      file.value = info.file;
      const data = new FormData();
      // 上传多个文件需要循环
      data.append("file", file.value);
      let res = await reqUpload(data)
      fileSrc.value = res.data.url;
    };

    //在上传之前的钩子
    const beforeUpload = (file: any) => {
      fileList.value = [...fileList.value, file];
      return false;
    };

    //移除文件
    const removeFile = () => {
      fileList.value = null;
      fileSrc.value = '';
    }

    return {
      file,
      id,
      nickname,
      avatar,
      visible,
      fileSrc,
      headers: {
        Authorization: 'cR3mFLeZt5uYM7bIhnXazAiDqgOlwy6v',
      },
      showModal,
      handleCancel,
      handleOk,
      picChange,

      removeFile,
      beforeUpload,
    }
  }
})
</script>

<style scoped lang="scss">
.choosepic {
  border: 1px solid gainsboro;
  background-color: white;
  color: black;
}

.choosepic:hover {
  border: 1px solid #2e68f8;
  color: black;
  background-color: white;
}

.choosepic:visited {
  color: black;
}

.el-dialog {
  width: 650px;
  height: 300px;
  font-size: 14px;
  position: relative;
  left: 0;
  transform: translateX(0);
  -webkit-transform: translateX(0);
}

.el-dialog {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  box-sizing: border-box;
  margin-bottom: 50px;
}

* {
  box-sizing: border-box;
}

div {
  display: block;
}

.set-avatar-container .upload-btn .el-button .upload-text[data-v-1e8f7c19] {
  display: inline-block;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: .2px;
  color: #626b84;
  margin-left: 6px;
  margin-bottom: 6px;
  vertical-align: middle;
}

.el-button [class*=el-icon-] + span {
  margin-left: 5px;
}

.el-button [class*=el-icon-] + span {
  margin-left: 5px;
}

.set-avatar-container .button-box[data-v-1e8f7c19] {
  position: relative;
  width: 100%;
  margin-top: 30px;
  text-align: right;
}

.set-avatar-container .button-box .footer[data-v-1e8f7c19] {
  display: inline-block;
  text-align: right;
  right: 30px;
}

.footer {
  margin: 24px auto;
  font-size: 12px;
  color: #afafaf;
  text-align: center;
}


.btnsp {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  font-size: 14px;
  padding: 5px 15px;
}


.info {
  height: 291px;
  width: 908px;
  padding-bottom: 24px;
  border: 1px solid #e7e9eb;
  border-radius: 2px;
  position: relative;
  background: #fff url(//qn.cache.wpscdn.cn/s1/avatar-bg.7d147f4.png) no-repeat 100% 100%;
  filter: alpha(opacity=39);

  .avatar {
    padding: 32px 0 48px 0;

    .avatar-icon {
      position: relative;
      width: 112px;
      height: 112px;
      margin: auto;
      padding-top: 16px;
      cursor: pointer;

      .user-avatar {
        position: relative;
        width: 80px;
        height: 80px;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;

        .img-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 0;
        }

        .avatar-mask {

          position: absolute;
          top: 0;
          left: 0;
          display: none;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 0;
          margin: 0 auto;
          background-color: rgba(0, 0, 0, .6);
          z-index: 4;

          span {
            vertical-align: middle;
            text-align: center;
            color: #fff;
            letter-spacing: -.34px;
            z-index: 999;
            margin: 30px 12px;
            font-weight: 700;
          }
        }
      }

      :hover .avatar-mask {
        display: flex;
      }
    }

    .avatar-username {
      display: flex;
      margin: 12px 0 8px 0;
      font-weight: 700;
      font-size: 16px;
      color: #383838;
      letter-spacing: 0;
      justify-content: center;

      p {
        margin: 0;
      }
    }

    .avatar-userid-level {
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 16px;
      font-size: 12px;

      .avatar-userid {
        color: #666;
      }
    }

    .safe-level-normal {
      display: flex;
      align-items: center;
      justify-content: center;

      .safe-score-block {
        display: -ms-inline-flexbox;
        display: inline-flex;
        -ms-flex-align: center;
        align-items: center;
        margin-top: 12px;
        padding: 0 12px;
        line-height: 28px;
        font-size: 12px;
        color: #666;
        border: 1px solid #e7e9eb;
        border-radius: 14px;
        cursor: pointer;

        .score-total {
          color: #f8d61d;
        }
      }
    }

  }
}

.cover-container {
  display: flex;
  justify-content: center;
  align-items: center;

  .cover {
    max-width: 300px;
    max-height: 200px;
    margin-top: 12px;
    border-radius: 4px;
  }
}
</style>
