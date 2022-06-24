<template>
  <router-view v-slot="{Component}">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<script lang="ts">

import {defineComponent, onMounted, provide, reactive, ref, watch} from 'vue';
import {useRoute, useRouter} from "vue-router";
import {reqGetForm} from "@/api/form/api";
import {message} from "ant-design-vue";
import {useStore} from "vuex";

export default defineComponent({
  name: 'new-form-create-com',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    //表单
    let form = reactive<any>({});
    let ctgName = ref<any>('');
    //问题处于加载中
    let editLoading = ref<boolean>(true);
    //是否修改
    let changeCount = ref<number>(0);
    /**
     * @description: 提供数据
     */
    onMounted(async () => {
      store.commit('SAVE_CURRENT_PROBLEM_ID', '');
      ctgName.value = route.query.ctgName ? route.query.ctgName : '';
      window.onbeforeunload = function (e: any) {
        if (changeCount.value === 2) {  // 这里要替换成自己的当前页面的路由名称，置换为name即可
          e = e || window.event;
          // 兼容IE8和Firefox 4之前的版本
          if (e) {
            e.returnValue = '关闭提示';
          }
          // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
          return '关闭提示';
        } else {
          window.onbeforeunload = null
        }
      }

      if (ctgName.value === '继续编辑') {
        try {
          const formId = route.query.id?.toString();
          const formData = await reqGetForm(formId);
          form.value = formData.data.data?.item;
        } catch {
          message.error('加载错误，请重新刷新页面！');
          await router.push({name: 'form-list'});
        }
      } else if (ctgName.value === '表单') {
        form.value = {};
        form.value.problems = [];
      }
      editLoading.value = false;
    })
    /**
     * @description: 监控操作步数，如果改改变就自加1为没变，2为变了
     */
    watch(
      form,
      (newVal) => {
        if (changeCount.value < 2) {
          changeCount.value++;
        }
      },
      //深度监听
      {deep: true}
    )

    provide('form', form);

    provide('ctgName', ctgName);

    provide('editLoading', editLoading);

    provide('changeCount', changeCount);

  }
})
</script>

<style scoped>

</style>
