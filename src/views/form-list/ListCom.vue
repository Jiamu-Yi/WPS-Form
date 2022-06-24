<template>
  <div class="list-form">
    <div class="list-components-line">
      <div class="list-head">我创建的</div>
      <div class="list-star" @click="showLightData">
        <i
          v-if="showStar"
          :style="{ color: '#f8d61d' }"
          class="icon-star-full iconfont"
        />
        <i v-if="!showStar" class="icon-star iconfont" />
        <div class="com-text">仅展示星标</div>
      </div>
    </div>
    <div class="list-components-tabs">
      <div class="tab-name">表单名称</div>
      <div class="tab-time">创建时间</div>
      <div class="tab-status">状态</div>
      <div class="tab-star"></div>
      <div class="tab-operate">操作</div>
    </div>
    <a-spin :spinning="spinning">
      <template v-if="formList.length !== 0">
        <list-item-com
          v-for="item in formList"
          :key="item.id"
          :listItem="item"
          class="list-from-list"
        ></list-item-com>
      </template>
    </a-spin>
    <!--分页器-->
    <div class="pagination">
      <a-pagination v-model:current="currentPage" :total="totalItems" show-less-items @change="changePage"/>
    </div>
  </div>
</template>

<script lang="ts">
import {reqGetFormList} from "@/api/form/api";
import {message} from "ant-design-vue";
import {defineComponent, onBeforeMount, provide, ref} from "vue";
import {IForm} from "@/type/type";
import listItemCom from "@/views/form-list/ListItemCom.vue";


const {reqResultForm} = require("@/api/form/api");
export default defineComponent({
  name: "form-list-com",
  components: {
    listItemCom,
  },
  setup() {
    let showStar = ref<boolean>(false); //是否仅展示星标
    let formList = ref<IForm[]>([]); //获取全部的表单列表
    let formResultNumber = ref<any>({}); //存放每一个表单收集的数量的列表
    let totalItems = ref<number>(0); //分页器 总表单数
    let pageLimit = ref<number>(10); //分页器 每页显示多少条数据
    let currentPage = ref<number>(1); //分页器，当前是第几页
    let spinning = ref<boolean>(true); //加载标记

    /**
     * @description: 初始化获取数据
     */
    onBeforeMount(async () => {
      //获取表单的列表信息
      await getFormList(currentPage.value, pageLimit.value);
      await getFormResultNum();
    });

    /**
     * @description: 展示所有表单函数
     */
    const getFormList = async (
      offset: undefined | number = undefined,
      limit: undefined | number = undefined,
      isStar: undefined | boolean = undefined
    ) => {
      let res = await reqGetFormList(
        offset ? offset - 1 : undefined,
        limit,
        isStar
      );
      formList.value = res.data.data?.items ? res.data.data?.items : [];
      totalItems.value = res.data.data?.total ? res.data.data?.total : 0;
    };

    /**
     * @description: 获取表单列表中各自表单收集的数量
     */
    const getFormResultNum = async () => {
      //为了同时出现而设置的临时数组
      spinning.value = true;
      let resultArr = [];
      for (let i = 0; i < formList.value.length; i++) {
        // 调用获取表单填写详情的api  得到每个表单收集的份数
        resultArr.push(await reqResultForm(formList.value[i].id));
      }
      //将临时数组赋值到formResultNumber对象中
      resultArr.forEach((item, index) => {
        formResultNumber.value[formList.value[index].id] =
          item.data.data.items.length;
      });
      spinning.value = false;
    };

    /**
     * @description: 只展示亮标的表单函数
     */
    const showLightData = async () => {
      try {
        if (!showStar.value) {
          showStar.value = true;
          await getFormList(currentPage.value, pageLimit.value, showStar.value);
          message.success("只展示收藏");
        } else {
          await getFormList(currentPage.value, pageLimit.value);
          showStar.value = false;
          message.success("展示全部");
        }
      } catch {
        message.error("加载失败，请重新操作！");
      }
    };

    /**
     * @description: 分页触发的切换页面
     */
    const changePage = async (page: number) => {
      currentPage.value = page;
      await getFormList(currentPage.value, pageLimit.value);
      await getFormResultNum();
    };

    //当前的页数
    provide("currentPage", currentPage);
    //全部的表单列表
    provide("formList", formList);
    //展示所有表单函数
    provide("getFormList", getFormList);
    //页面最多有多少条
    provide("pageLimit", pageLimit);
    //显示每个表单有多少答卷
    provide("formResultNumber", formResultNumber);

    provide("changePage", changePage);

    return {
      spinning,
      showStar,
      formList,
      formResultNumber,
      totalItems,
      pageLimit,
      currentPage,
      showLightData,
      changePage,
    };
  },
});
</script>

<style lang="scss" scoped>
.star {
  font-family: "iconfont";
  content: "\e6e4";
}

ul {
  padding-left: 0px;
  padding-right: 0px;
}

li {
  list-style: none;
}

.alert {
  width: 100%;
  display: flex;
  position: absolute;
  flex-direction: column;
  align-content: center;
  align-items: center;

  .ant-alert {
    margin: 10px 0;
    width: 300px;
  }
}

//右侧表单主体
.list-form {
  flex: 1;

  min-width: 600px;
  min-height: -webkit-calc(100vh - 154px);
  min-height: calc(100vh - 154px);
  box-sizing: border-box;
  background-color: #fff;
  margin: 0 60px 0 40px;
  //表单提示栏
  .list-components-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 54px;
    border-bottom: 1px solid #e7e9eb;

    //标题栏左侧:"我创建的"
    .list-head {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 16px;
      color: #3d4757;
    }

    //星标
    .list-star {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      font-size: 14px;
      margin-left: 4px;
      margin-right: 40px;
      line-height: 16px;
      color: #949aae;
      user-select: none;
      //星标文字
      .com-text {
        margin-left: 5px;
      }
    }

    .list-star:hover {
      cursor: pointer;
    }
  }

  //标题栏
  .list-components-tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 54px;
    border-bottom: 1px solid #e7e9eb;

    //标题栏:表单名称
    .tab-name {
      text-align: start;
      width: 140px;
    }

    //标题栏:时间
    .tab-time {
      text-align: center;
      margin-left: 5px;
      margin-right: 10px;
      width: 100px;
    }

    //标题栏:状态
    .tab-status {
      text-align: center;
      width: 150px;
    }

    //标题栏:星标
    .tab-star {
      text-align: center;
      width: 100px;
    }

    //标题栏:操作
    .tab-operate {
      text-align: center;
      width: 380px;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    padding: 20px 30px;
  }
}
.list-from-list {
  display: flex;
  flex-direction: column;
  margin-right: 15px;
}
</style>
