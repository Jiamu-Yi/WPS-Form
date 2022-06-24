<template>
  <div class="left-sidebar">
    <a-button class="create-form" type="primary" @click="editForm(null,'表单')">新建表单</a-button>
    <div>
      <ul class="left-sidebar-list">
        <li class="left-list-item">
          <div class="list-item-img">
            <img class="img-add"
                 src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+5Zu+5qCHLzE2cHgv5oiR5Yib5bu655qEPC90aXRsZT4KICAgIDxnIGlkPSLlm77moIcvMTZweC/miJHliJvlu7rnmoQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGQ9Ik0xMC41LDEgTDE0LDQuNSBMMTQsMTMgQzE0LDE0LjEwNDU2OTUgMTMuMTA0NTY5NSwxNSAxMiwxNSBMNCwxNSBDMi44OTU0MzA1LDE1IDIsMTQuMTA0NTY5NSAyLDEzIEwyLDMgQzIsMS44OTU0MzA1IDIuODk1NDMwNSwxIDQsMSBMMTAuNSwxIFogTTksNiBMNyw2IEw3LDcuOTk5IEw1LDggTDUsMTAgTDcsOS45OTkgTDcsMTIgTDksMTIgTDksOS45OTkgTDExLDEwIEwxMSw4IEw5LDcuOTk5IEw5LDYgWiIgaWQ9IuW9oueKtue7k+WQiCIgZmlsbD0iI0E1QjVDRSI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=">
          </div>
          <div class="list-item-title">表单列表</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useRouter} from "vue-router";
import {IForm} from "@/type/type";

export default defineComponent({
  name: 'form-list-com',
  setup() {
    const router = useRouter();
    /**
     * @description: 编辑表单函数
     * @param item
     * @param tagName
     */
    const editForm = async (item: IForm | null, tagName: string) => {
      router.push({
        name: 'edit',
        query: {
          id: item?.id,
          ctgName: tagName
        }
      });
    };
    return {
      editForm,
    }
  },
})
</script>

<style lang="scss" scoped>
ul {
  padding-left: 0px;
  padding-right: 0px;
}

li {
  list-style: none;
}

//主体页面
.left-sidebar {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px 16px;
  max-width: 230px;
  min-width: 167px;
  box-sizing: border-box;
  border-right: 1px solid #e7e9eb;
  border-left: 1px solid #e7e9eb;
  border-right: 1px solid #e7e9eb;
  background-color: #fff;

  //新建表单部分
  .create-form {
    text-align: center;
    margin-bottom: 16px;
    font-size: 14px;
    height: 36px;
  }

  //表单列表部分ul
  .left-sidebar-list {
    display: flex;
    justify-content: flex-start;
    padding: 0 12px;
    margin-top: 16px;
    margin-bottom: 4px;
    height: 42px;
    border-radius: 2px;
    font-size: 12px;
    color: #767c85;
    background: #F2F5FA;

    //列表item部分li
    .left-list-item {
      display: flex;
      flex-direction: row;
      justify-content: center;
      color: #767c85;

      //表单列表图像div
      .list-item-img {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-right: 12px;

        //图片
        .img-add {
          width: 16px;
          height: 16px;
        }
      }

      //表单列表div
      .list-item-title {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        color: #767c85;
      }
    }
  }
}
</style>
