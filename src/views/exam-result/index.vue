<template>
  <div class="scrollbar-container">
    <header-com :backable="true" :showUser="true">
      <template v-slot:formName>
        {{ title ? title : '表单结果' }}
      </template>
    </header-com>
    <div class="nav">
      <div class="nav-container">
        <router-link :class="{'nav-item':true , 'active': route.name === 'detail'}"
                     :to='{name:"detail",params:{id:formid}}'
                     replace>数据统计&分析
        </router-link>
        <router-link :class="{'nav-item':true , 'active': route.name === 'problem'}"
                     :to='{name:"problem",params:{id:formid}}'
                     replace
        >表单问题
        </router-link>
        <router-link :class="{'nav-item':true , 'active': route.name === 'share'}"
                     :to='{name:"share",params:{id:formid}}'
                     replace
        >分享
        </router-link>
      </div>
    </div>
    <div style="height: 50px"></div>
    <div class="main">
      <div class="container">
        <router-view v-slot="{Component}">
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, provide, ref} from 'vue'
import {useRoute} from "vue-router";
import {reqGetForm} from "@/api/form/api";
import {message} from "ant-design-vue";

export default defineComponent({
  name: "exam-result-com",
  setup() {
    const route = useRoute();
    let formid = route.params.id ? route.params.id : '';
    let currentPage = ref<number | undefined>();
    let title = ref<string>('');

    onMounted(() => {
      getForm(formid.toString());
    });

    const changePage = (num: number) => {
      currentPage.value = num;
    };

    /**
     * @description: 获取到form
     */
    const getForm = async (Id: string) => {
      try {
        let res = await reqGetForm(Id);   //利用id获取到表单
        if (res.data.data) {
          title.value = res.data.data.item.title;   //标题
        }
      } catch {
        message.error("加载失败，请刷新页面！");
      }
    };

    provide('title', title);

    return {
      currentPage,
      formid,
      route,
      title,
      changePage,
    };
  },
});
</script>

<style scoped lang="scss">
body {
  margin: 0;
  padding: 0;
}

.nav {
  z-index: 2;
  width: 100%;
  position: fixed;
  height: 50px;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  border-top: 1px solid #e9e9e9;;

  .nav-container {
    display: flex;
    width: 944px;
    background-color: #ffffff;
    border-bottom: 1px solid #e9e9e9;;

    .nav-item {
      font-weight: 500;
      height: 50px;
      padding: 0;
      font-size: 14px;
      line-height: 50px;
      margin-right: 36px;
      color: #595959;
      cursor: pointer;
    }

    .active {
      color: #1890ff;
      border-bottom: #1890ff solid 2px;
    }
  }
}

.main {
  background-color: #f2f4f7;
  min-height: calc(100vh - 106px);
  display: flex;
  padding-top: 16px;
  justify-content: center;

  .container {
    background-color: #ffffff;
    width: 864px;
    box-sizing: content-box;
    padding: 24px 40px;
    display: flex;
    justify-content: center;
  }
}

</style>
