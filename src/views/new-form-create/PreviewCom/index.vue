<template>
  <div class="body">
    <header-com :backable="true" :preview="true" :showUser="true">
      <template v-slot:formName>
        {{ Topname }}
      </template>
      <template v-slot:icon>
        <!-- 顶部上方电脑和手机图标 -->
        <div class="previewIcon">
          <!-- 这里动态绑定class以展示下方高亮 -->
          <img :class="{'computer':true,'active': computerIndex}" @click="changeComputerPreview"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABXElEQVRoQ+1Yy43CQAy1M1TADQQ1UAGIG1DB8rlTAkVQAncWqAD2hqCCrYHVcqMCEqNBgFBCVkNmTBitc3Y87+coYwTPH/QcPwiBvB0UB97SgWZnUAkpHCNAk4hKeYJExD0BrBWq0Xo5/YljSUToDD46fgNAMU/gD84+qKBQi5NIEKi3u59A1EPAZRCo4SPWrySmBY2icEJAHUCcbVfz/v35CQKNdvdXx0YFhWre4K9AL6nY6ThtVvPynwTqrQ/SBduvxVt9odJwJSMkBHgmRBzg0dW8qzhgrhVPpTjAo6t5V3HAXCueSnGAR1fzruKAuVY8lf/PAR4d7bvG7ymp9wH7o3g6GBOQG5ljA4yH2P9Lve9rFe8XWzq6Xq8WbWcvbdi49k3Ol1dC4MkIiANxwSRCr47QVfEnz72V2/5zWc+A9wSyKu/qPWsHXAHJ2kcIZFXO1XvigCsls/Y5AZK1QkB4n7GvAAAAAElFTkSuQmCC">
          <img :class="{'phone':true,'active':phoneIndex}" @click="changePhonePreview"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABjklEQVRoQ+1ZzVGDUBDehVTgTSepwQqCuQnRO6j3lGARlpC7CgUk4C2SCqwhGb1ZgbDOUzPjaICFPAbezHJ+7O739/h5CIZfaPj8IAC6VrCWAhPvZphRdocAEyI61jk8Ir4RwMpG+3YV32+5tdkAvobPP14A4IhbvOG6d9sanHJBsAGM3eABiK4QMLYse8ZtwAWhCMrzbE5AHiA+rpPwmnMvG4DjBq/KNrY1GOkefjfoj8obZac0CU+0Ahif+6QKrp+iUtCO6y+IYLqvOSIs0yS6KBuM22dXg60At3A5AFykSXjZawAc2QXALwa0W0gUYG4WrYVYFBAFCjzAfQ6IhcRCYqHDUlA3a/IkPozv/3eLAkWM1mWmqTJ1+0gGmjKtS2lRQBT4w4CEuCpcui1TVK/q/1PjT0rjAXCZaQpUMlCVAa4CZ57vEeFc1UOk2XMcxRxVeqOA4wYbIhp+A8BtmoQjAbCHgdZeJXpnIfMPOEw/YjL+kE/lx+hjVs4W2MUa9i7UxXCcngKAw1Kbaz4Br16YQC9B3rgAAAAASUVORK5CYII=">
        </div>
      </template>
    </header-com>
    <show-com v-if="computerIndex" />
    <phone-show-com v-if="phoneIndex" />
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, inject, onMounted, provide, ref} from 'vue';
import ShowCom from './ShowDesktopCom.vue';
import {useRoute, useRouter} from "vue-router";
import PhoneShowCom from './ShowPhoneCom.vue';

export default defineComponent({
  name: 'preview-com',
  components: {
    ShowCom,
    PhoneShowCom
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    // 记录点击电脑图标的ID
    let computerIndex = ref<boolean>(true);
    // 记录点击手机图标的ID
    let phoneIndex = ref<boolean>(false);
    let formId = route.query.id?.toString()
    const ctgName = inject('ctgName') as any;
    //表单
    let form = inject('form') as any;
    // 点击电脑图标显示电脑端部分
    const changeComputerPreview = () => {
      computerIndex.value = true;
      phoneIndex.value = false;
    };
    // 点击手机图标显示移动端部分
    const changePhonePreview = () => {
      computerIndex.value = false;
      phoneIndex.value = true;
    };

    //顶部显示的是新建表单还是title
    const Topname = computed(() => {
      return ctgName.value === '继续编辑' && form.value.title ? form.value.title : '新建表单';
    });

    //监测刷新按钮的时候回退到编辑页面，但还是没数据
    onMounted(() => {
      window.addEventListener("load", () => {
        router.back();
      });
    });

    provide('formId', formId);

    return {
      computerIndex,
      phoneIndex,
      Topname,
      changeComputerPreview,
      changePhonePreview,
    }
  }
})

</script>

<style lang="scss" scoped>
.body {
  width: 100%;
  // height: calc(100vh - 152px);
  background-color: #f2f4f7;
  .previewIcon {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      .active {
        border-bottom: 2px solid #1488ed;
        padding-bottom: 14px;
      }
        img {
          width: 24px;
          padding: 16px 0;
          margin: 0 13px;
          cursor: pointer;
        }
    }
}
</style>
