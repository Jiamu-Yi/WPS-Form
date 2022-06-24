<template>
  <div class="Pagination">
    <div @click="changePage(false)" class="prePage"></div>
    <div>第<input type="text" :value="currentPage" class="number" />份</div>
    <div @click="changePage(true)" class="nextPage"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, toRef} from "vue";
import {message} from "ant-design-vue";

export default defineComponent({
  emits: ["change-page"],
  name: "my-pagination",
  props: {
    //列表总数
    total: {
      type: Number,
      default: 99,
    },
    //每一页的大小
    pageSize: {
      type: Number,
      default: 99,
    },
  },
  components: {},
  setup(props, { emit }) {
    //总页数
    // const totalPage = computed(() => Math.ceil(props.total / props.pageSize));
    const totalPage = toRef(props, "total");
    //当前的页数
    const currentPage = ref<number>(1);

    // 控制上一页和下一页变化
    const changePage = (type: boolean) => {
      if (type === false) {
        // 上一页
        // 页面是第一页时，禁止点击操作
        if (currentPage.value === 1) {
          message.warn("已经最前面了");
          return;
        }
        if (currentPage.value > 1) {
          currentPage.value -= 1;
        }
      } else if (type === true) {
        // 下一页
        // 页面是最后页时，禁止点击操作
        if (currentPage.value === totalPage.value) {
          message.warn("已经最后面了");
          return;
        }
        if (currentPage.value < totalPage.value) {
          currentPage.value += 1;
        }
      }
      emit("change-page", currentPage.value);
    };
    return { currentPage, totalPage, changePage };
  },
});
</script>

<style scoped >
.Pagination {
  height: 20px;
  background: #fff;
  font-size: 14px;
  color: #767c85;
  display: flex;
  align-items: center;
  margin-top: 14px;
}
.prePage {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzk2OTY5NiIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNNyAzLjc1N2wuNzA3LjcwNy00LjI0MyA0LjI0M0wyLjc1NyA4eiIvPjxwYXRoIGQ9Ik03LjcwNyAxMS41MzZMNyAxMi4yNDMgMi43NTcgOGwuNzA3LS43MDd6Ii8+PC9nPjwvc3ZnPg==);
  margin-right: 16px;
  cursor: pointer;
  font-size: 12px;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: 16px;
  height: 20px;
  width: 20px;
  line-height: 20px;
  text-align: center;
  color: #3d4757;
  border-radius: 2px;
  background-color: #f2f4f7;
}
.nextPage {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzk2OTY5NiIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNNyAxMi4yNDNsLS43MDctLjcwNyA0LjI0My00LjI0My43MDcuNzA3eiIvPjxwYXRoIGQ9Ik02LjI5MyA0LjQ2NEw3IDMuNzU3IDExLjI0MyA4bC0uNzA3LjcwN3oiLz48L2c+PC9zdmc+);
  margin-left: 16px;
  cursor: pointer;
  font-size: 12px;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: 16px;
  height: 20px;
  width: 20px;
  line-height: 20px;
  text-align: center;
  color: #3d4757;
  border-radius: 2px;
  background-color: #f2f4f7;
}
.number {
  padding: 4px;
  margin: 0 4px;
  height: 20px;
  font-size: 14px;
  width: 46px;
  border: none;
  border-radius: 2px;
  outline: none;
  text-align: center;
  overflow: hidden;
  background-color: #f2f4f7;
}
</style>
