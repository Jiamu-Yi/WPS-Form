<template>
  <div class="list">
    <div class="item"
         v-for="(item,index) in problemStarList"
         :key="item.id"
    >
      <div class="icon-container">
        <up-circle-outlined :class="['icon' ,{'active': index === 0}]" @click="upProblem(item,index)"/>
        <down-circle-outlined :class="['icon' ,{'active': index === problemStarList.length - 1}]"
                              @click="downProblem(item,index)"/>
      </div>
      <span class="title">{{ item.problem.title }}</span>
      <div class="manage">
        <span class="title" @click="editStarProblem(item)">编辑</span>
        <span class="title" @click="deleteStarProblem(item)">删除</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject} from 'vue';
import {reqCancelStarProblem} from "@/api/problem/api";
import {message} from "ant-design-vue";
import {DownCircleOutlined, UpCircleOutlined} from "@ant-design/icons-vue";

export default defineComponent({
  name: 'ModuleManageList',
  components: {
    UpCircleOutlined,
    DownCircleOutlined
  },
  setup() {
    let problemStarList = inject("problemStarList") as any;
    let currentProblem = inject("currentProblem") as any;
    let isEdit = inject("isEdit") as any;
    const getStarProblemList = inject("getStarProblemList") as any;

    /**
     * @description: 上调
     */
    const upProblem = (item: any, index: number) => {
      if (index === 0)
        return;
      let temp = problemStarList.value[index];
      problemStarList.value[index] = problemStarList.value[index - 1];
      problemStarList.value[index - 1] = temp;
    };

    /**
     * @description: 下调
     */
    const downProblem = (item: any, index: number) => {
      if (index === problemStarList.value.length)
        return;
      let temp = problemStarList.value[index];
      problemStarList.value[index] = problemStarList.value[index + 1];
      problemStarList.value[index + 1] = temp;
    };

    /**
     * @description: 将调整更新至后端(改功能尚未实现)
     */
    const deleteStarProblem = async (item: any) => {
      try {
        await reqCancelStarProblem(item.id);
        getStarProblemList();
        message.success('删除成功！');
      } catch {
        message.error('删除失败，请重试！');
      }
    };

    /**
     * @description: 重新编辑收藏问题
     * @param item
     */
    const editStarProblem = (item: any) => {
      if (item) {
        currentProblem.value = item;
        isEdit.value = true;
      } else {
        message.error('编辑不存在的问题，请刷新重试！');
      }
    };

    return {
      problemStarList,
      upProblem,
      downProblem,
      deleteStarProblem,
      editStarProblem,
    }
  }
})
</script>

<style scoped lang="scss">
.list {
  height: 420px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  border: 1px solid #e2e6ed;
  overflow-y: auto;

  .item {
    width: 100%;
    padding: 0 16px;
    border-bottom: 1px solid #e2e6ed;
    display: flex;
    height: 42px;
    align-items: center;

    .icon-container {
      width: 84px;

      .icon {
        color: #e2e6ed;
        font-size: 17px;
        margin-right: 10px;
      }

      :hover {
        color: #3398f0;
      }

      .active {
        opacity: 0;
        cursor: default;
      }
    }

    .title {
      width: 588px;
      overflow: hidden;
      white-space: nowrap;
      word-break: keep-all;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
    }

    .manage {
      width: 84px;

      .title {
        color: #1488ed;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
