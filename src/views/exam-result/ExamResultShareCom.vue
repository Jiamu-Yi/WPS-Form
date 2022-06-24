<template>
    <div class="outshow">
      <div>
        <div class="qr-container">
          <div class="pc-outer">
            <div class="pc-continer">
              <qrcode-vue :value="writePath" :size="200" level="H"/>
              <div class="pc-title">{{ title }}</div>
              <span class="pc-info">微信扫码或长按识别，填写内容</span>
            </div>
          </div>
        </div>
        <a class="fordownload" download="1.png" href="./pic/1.png">
          <span>下载二维码</span>
        </a>
      </div>

      <div class="links-detail">
        <div class="links-detail_more">
          <div class="generate-poster copy"
               data-clipboard-text="https://f.wps.cn/w/XjLWxS6W/邀你填写「4」" @click="copyEvent()">
            <img
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+57yW57uEIDE4PC90aXRsZT4KICAgIDxkZWZzPgogICAgICAgIDxmaWx0ZXIgaWQ9ImZpbHRlci0xIj4KICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUdyYXBoaWMiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAuMDAwMDAwIDAgMCAwIDAgMC4wMDAwMDAgMCAwIDAgMCAwLjAwMDAwMCAwIDAgMCAxLjAwMDAwMCAwIj48L2ZlQ29sb3JNYXRyaXg+CiAgICAgICAgPC9maWx0ZXI+CiAgICA8L2RlZnM+CiAgICA8ZyBpZD0iwrfliIbkuqsiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLnvJbnu4QtMTgiPgogICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2iIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiPjwvcmVjdD4KICAgICAgICAgICAgPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlci0xKSIgaWQ9IjAw5Zu+5qCHLzk2cHgv5YiG5LqrL+WkjeWItumTvuaOpSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj4KICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuODAyNzUwLCA0LjYyNzMxMSkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik00LjUzMDU4MzM5LDMuMjI1MTIyOTUgQzQuNTMwNTgzMzksMi42ODE2NjEzNCA0LjUzMDU4MzM5LDMuMjQ2MTM0MTQgNC41MzA1ODMzOSwyLjUyNTg0MzQ3IEM0LjUzMDU4MzM5LDAuOTY4NDk5MDY5IDUuNzQwMjAwMDMsLTAuMjkzOTc4MDEgNy4yMzIzMzc3OCwtMC4yOTM5NzgwMSBDOC43MjQ0NzU1MiwtMC4yOTM5NzgwMSA5LjkzNDA5MjE3LDAuOTY4NDk5MDY5IDkuOTM0MDkyMTcsMi41MjU4NDM0NyBMOS45MzQwOTIxNyw1Ljg0MTIwODkgQzkuOTM0MDkyMTcsNy4zOTg1NTMzIDguNzI0NDc1NTIsOC42NjEwMzAzOCA3LjIzMjMzNzc4LDguNjYxMDMwMzggTTkuOTM0MDkyMTcsMTEuMjM5NTUyNiBDOS45MzQwOTIxNywxMS43ODMwMTQyIDkuOTM0MDkyMTcsMTEuMjE4NTQxNCA5LjkzNDA5MjE3LDExLjkzODgzMjEgQzkuOTM0MDkyMTcsMTMuNDk2MTc2NSA4LjcyNDQ3NTUyLDE0Ljc1ODY1MzYgNy4yMzIzMzc3OCwxNC43NTg2NTM2IEM1Ljc0MDIwMDAzLDE0Ljc1ODY1MzYgNC41MzA1ODMzOSwxMy40OTYxNzY1IDQuNTMwNTgzMzksMTEuOTM4ODMyMSBMNC41MzA1ODMzOSw4LjYyMzQ2NjY2IEM0LjUzMDU4MzM5LDcuMDY2MTIyMjYgNS43NDAyMDAwMyw1LjgwMzY0NTE4IDcuMjMyMzM3NzgsNS44MDM2NDUxOCIgaWQ9IlNoYXBlIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS42NjY2NjY2NyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNy4yMzIzMzgsIDcuMjMyMzM4KSByb3RhdGUoNDUuMDAwMDAwKSB0cmFuc2xhdGUoLTcuMjMyMzM4LCAtNy4yMzIzMzgpICI+PC9wYXRoPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=">
            <span>复制链接</span>
          </div>
        </div>
      </div>
    </div>
</template>


<script lang="ts">

import {defineComponent, inject, onMounted, ref} from 'vue'
import {message} from "ant-design-vue";
import {useRoute} from "vue-router";
import QrcodeVue from 'qrcode.vue'

export default defineComponent({
  name: 'exam-result-share-com',
  components: {
    QrcodeVue
  },
  setup() {
    const route = useRoute();
    let href = ref<any>('');
    let tmp = route.params.id;
    let writePath = `http://101.43.140.200:8088/write/${tmp}` as string;
    let imageSrc = '@/assets/logo.png';
    let title = inject('title') as any;      //主标题

    onMounted(() => {
      href.value = window.location.href;
    })

    /**
     * @description: 复制链接的函数
     */
    const copyEvent = () => {
      let textArea = document.createElement('textarea');
      document.body.appendChild(textArea);
      textArea.value = window.location.href; //你的要被复制的链接
      textArea.select();
      if (textArea.setSelectionRange)
        textArea.setSelectionRange(0, textArea.value.length);
      else
        textArea.select();
      document.execCommand("copy");
      message.success('链接已成功复制到剪贴板');
      document.body.removeChild(textArea);
    }
    return {
      imageSrc,
      route,
      writePath,
      title,
      copyEvent,
    }
  }
})
</script>

<style scoped lang="scss">

.outshow {
  position: relative;
  text-align: center;
  padding-top: 80px;
  margin: auto;
  padding-bottom: 210px;
  min-height: 700px;
  width: 994px;
  background-color: #ffffff;
}

.fordownload {
  position: relative;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100px;
  margin: auto;
}

.links-detail {
  position: relative;
  -webkit-tap-highlight-color: transparent;
  text-align: center;

  .links-detail_more {
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    height: 32px;
    margin-top: 20px;
  }
}


.qr-container {
  position: relative;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  margin-bottom: 17px;
}

.links-detail_more .generate-poster {
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  margin-right: 24px;
  border: 1px solid #e2e4e8;
  background-color: #fff;
  cursor: pointer;
  width: 120px;
  height: 32px;
  line-height: 32px;
  color: #3d4757;
  margin-left: 30px;
}

.pc-outer {
  position: relative;
  width: 200px;
  text-align: center;
  height: 236px;
  box-sizing: border-box;
  font-size: 14px;
  color: rgba(0, 0, 0, .65);
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, STHeitiSC-Light, Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", SimSun, sans-serif;
  font-variant: tabular-nums;
  line-height: 1.5;
  --antd-wave-shadow-color: #1890ff;
  -webkit-text-size-adjust: 100%;
  font-feature-settings: "tnum";
}

.generate-poster img {
  margin-left: 10px;
}

.generate-poster span {
  margin-left: 10px;
}

body div {
  outline: none;
}

div {
  display: block;
}

.pc-continer {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 272px;
  height: 323px;
  -webkit-transform: scale(.7);
  -ms-transform: scale(.7);
  transform: scale(.7);
  margin-top: -48px;
  margin-left: -35px;
  background: #fff;
  border: 0.01rem solid #e3e3e3;
}


img {
  border-style: none;
  vertical-align: middle;
}

.pc-title {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 20px;
  font-size: 16px;
  font-weight: 500;
  color: #535252;
  line-height: 21px;
  padding: 0 23px;
  overflow: hidden;
  display: -webkit-box;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: normal !important;
  -webkit-box-orient: vertical;
}

.pc-info {
  position: absolute;
  width: 100%;
  text-align: center;
  padding: 0 30px;
  bottom: 10px;
  left: 0;
  font-size: 14px;
  line-height: 19px;
  color: #9b9b9b;
}

</style>
