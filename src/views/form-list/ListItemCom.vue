<template>
  <div class="list-item">
    <div class="item-select"></div>
    <div class="list-index-item" @click="clickForm(item)">
      <div class="list-index">
        <div class="list-title">{{ item.title }}</div>
      </div>
      <div class="list-time">
        <div class="info-time"><span class="time">{{ formatDate(item.ctime) }}</span></div>
      </div>
      <div class="list-status">
        <div class="info-status">
          <!--根据status动态显示样式-->
          <div
            :class="{ 'status': true, 'draft': item.status === 2, 'collecting': item.status === 3, 'stop': item.status === 4 }">
            <!--判断是否要显示数量-->
            {{ getFormStatus(item.status) }}
            {{ item.status === 3 || item.status === 4 ? formResultNumber[item.id] : undefined }}
          </div>
        </div>
      </div>
      <div class="list-star">
        <div v-show="!item.isStar"
             class="info-star star star-unactive"
             @click.stop="starForm(item)"
        >
          <i class="icon-star iconfont"/>
        </div>
        <div v-show="item.isStar"
             class="info-star star star-active "
        >
          <i :style="{ color: '#f8d61d' }" class="icon-star-full iconfont" @click.stop="cancelStarForm(item)"/>
        </div>
      </div>
      <div class="list-operate">
        <ul class="info-op-com">
          <li v-if="item.status === 2" class="info-operate" @click.stop="publishForm(item)">发布</li>
          <li v-if="item.status === 3" class="info-operate " @click.stop="shareForm(item)">分享</li>
          <li v-if="item.status === 3 || item.status === 4" class="info-operate"
              @click.stop="resultForm(item)">查看结果
          </li>
          <li v-if="item.status === 3" class="info-operate" @click.stop="stopFrom(item)">停止</li>
          <li v-if="item.status === 2" class="info-operate" @click.stop="editForm(item,'表单')">编辑</li>
          <li class="info-operate" @click.stop="deleteForm(item)">删除</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, toRef} from "vue";
import {useRouter} from "vue-router";
import {IForm} from "@/type/type";
import {reqCancelStar, reqDeleteForm, reqEndForm, reqStarForm, reqStartForm} from "@/api/form/api";
import {message} from "ant-design-vue";

export default defineComponent({
  name: 'list-item-com',
  props: ['listItem'],
  setup(props) {
    const router = useRouter();
    const item = toRef(props, 'listItem') as any;
    //显示每个表单有多少答卷,存放每一个表单收集的数量
    let formResultNumber = inject('formResultNumber');
    //当前的页数
    let currentPage = inject('currentPage') as any;
    //获取全部的表单列表
    let formList = inject('formList') as IForm[];
    //页面最多有多少条
    let pageLimit = inject('pageLimit') as any;
    // 展示所有表单函数
    const getFormList = inject('getFormList') as any;
    //改变页数
    const changePage = inject('changePage') as any;
    /**
     * @description: 跳转函数，当点击表单时，不同状态的表单会出现不同的情况
     */
    const clickForm = (item: IForm) => {
      switch (item.status) {
        case 2:
          editForm(item, '继续编辑');
          break;
        case 3:
          router.push({
            name: 'problem',
            params: {
              id: item.id
            }
          });
          break;
        case 4:
          resultForm(item);
          break;
      }
    };

    /**
     * @description: 换算时间函数
     * @param time
     */
    const formatDate = (time: string) => {
      if (time !== null) {
        let date = new Date(time)
        // 首先将时间格式化
        let YY = date.getFullYear() + '年'
        let MM =
          (date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1) + '月'
        // 三目运算符 如果月份小于10 则补零
        let DD =
          (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日'
        // 三目运算符 如果日期小于10 则补零
        let hh =
          (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
          ':'
        // 三目运算符 如果小时小于10 则补零
        let mm =
          date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        // // 三目运算符 如果分钟小于10 则补零
        return YY + MM + DD + hh + mm
      } else {
        return null
      }
    };

    /**
     * @description: 收藏表单
     * @param item 点击的表单的详情
     */
    const starForm = async (item: IForm) => {
      try {
        await reqStarForm(item.id);
        await getFormList(currentPage.value, pageLimit.value);
        message.success('收藏表单成功！');
      } catch {
        message.error('操作失败，请重新操作！');
      }
    };

    /**
     * @description: 取消收藏表单
     * @param item 点击的表单的详情
     */
    const cancelStarForm = async (item: IForm) => {
      try {
        await reqCancelStar(item.id);
        await getFormList(currentPage.value, pageLimit.value);
        message.success('取消收藏表单成功！');
      } catch {
        message.error('操作失败，请重新操作！')
      }
    };

    /**
     * @description: 发布表单函数
     * @param item
     */
    const publishForm = async (item: IForm) => {
      try {
        await reqStartForm(item.id)
        // // 调用开始收集表单api
        await getFormList(currentPage.value, pageLimit.value)
        message.success('发布成功！')
      } catch {
        message.error('发布失败，请重新操作！')
      }
    };

    /**
     * @description: 分享表单函数
     */
    const shareForm = async (item: IForm) => {
      router.push({
        name: 'share',
        params: {
          id: item.id,
        }
      })
    };

    /**
     * @description: 查看函数
     * @return {string }
     * @param item
     */
    const resultForm = async (item: IForm) => {
      router.push({
        name: 'detail',
        params: {
          id: item.id,
        }
      })
    };

    /**
     * @description: 停止表单函数
     * @param item
     */
    const stopFrom = async (item: IForm) => {
      try {
        await reqEndForm(item.id)
        // 调用开始收集表单api
        await getFormList(currentPage.value, pageLimit.value)
        message.success('停止收集成功！')
      } catch {
        message.error('停止收集表单失败，请重新操作！')
      }
    };

    /**
     * @description: 编辑表单函数
     * @param item
     */
    const editForm = async (item: IForm | null, tagName: string) => {
      router.push({
        name: 'edit',
        query: {
          id: item?.id,
          ctgName: tagName
        }
      })
    };

    /**
     * @description: 删除表单函数
     * @param item 点击的表单的详情
     */
    const deleteForm = async (item: IForm) => {
      try {
        await reqDeleteForm(item.id)
        // 调用删除表单api 并接收返回值
        if (!formList.length && currentPage.value > 1) {
          changePage(false)
        }
        changePage(false)
        await getFormList(currentPage.value, pageLimit.value)
        message.success('删除表单成功！')
      } catch {
        message.error('删除表单失败，请重新操作！')
      }
    };

    /**
     * @description: 根据状态字返回状态描述
     * @return {string }
     * @param num
     */
    const getFormStatus = (num: number) => {
      switch (num) {
        case 1:
          return '已删除'
        case 2:
          return '草稿'
        case 3:
          return '正在收集'
        case 4:
          return '已结束'
      }
    };

    return {
      item,
      formList,
      formResultNumber,
      clickForm,
      formatDate,
      starForm,
      cancelStarForm,
      publishForm,
      shareForm,
      resultForm,
      stopFrom,
      editForm,
      deleteForm,
      getFormStatus
    }
  },
})
</script>

<style scoped lang="scss">
.star {
  font-family: "iconfont";
  content: "\e6e4";
}

ul {
  padding: 0;
  margin: 0;
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

//表单内容部分:ul

//一条表单内容部分
.list-item {
  display: flex;
  align-items: center;

  //左侧选择部分
  .item-select {
    margin: 0 14px;
    visibility: hidden;
    width: 12px;
  }

  //表单内容主体部分
  .list-index-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 66px;
    width: 100%;
    border-bottom: 1px solid #e2e6ed;

    //主体左侧部分:表单名称
    .list-index {
      margin-right: 0;
      width: 150px;
      overflow: hidden;
      color: #3d4757;

      //表单名称div
      .list-title {
        text-overflow: ellipsis;
        padding-left: 14px;
        width: 100%;
        line-height: 20px;
        color: #3d4757;
        white-space: nowrap;
        overflow: hidden;
        font-size: 14px;
      }
    }

    //时间div
    .list-time {
      //时间
      .info-time {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 100px;
        font-size: 0;

        .time {
          font-size: 12px;
          color: #949aae;
        }
      }
    }

    //状态div
    .list-status {
      width: 150px;
      //状态
      .info-status {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0;

        .status {
          text-align: center;
          padding: 0 10px;
          height: 20px;
          line-height: 20px;
          min-width: 75px;
          border-radius: 10px;
          white-space: nowrap;
          font-size: 12px;
        }

        .draft {
          color: #ef8d00;
          background: #fff5e5;
        }

        .collecting {
          color: #1488ed;
          background: rgba(20, 136, 237, .1);
        }

        .stop {
          color: #eb5451;
          background: rgba(235, 84, 81, .05);
        }

      }
    }

    //收藏div
    .list-star {
      //星标
      .info-star {
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 180px;
        min-width: 100px;
      }

      .star:hover {
        cursor: pointer;
      }
    }

    //操作div
    .list-operate {
      //操作
      .info-op-com {
        display: flex;
        width: 380px;
        justify-content: flex-end;
        padding-right: 60px;

        .info-operate {
          display: inline-block;
          text-align: center;
          padding: 6px 14px;
          margin-left: 15px;
          margin-right: 4px;
          border: 1px solid #e7e9eb;
          border-radius: 3px;
          font-size: 10px;
          color: #767c85;
          background: rgba(255, 255, 255, 0.1);
        }

        .info-operate:hover {
          cursor: pointer;
          background-color: #f0f2f6;
        }
      }
    }
  }

  .list-index-item:hover {
    background-color: #f9fafd;
    cursor: pointer;
  }
}
</style>
