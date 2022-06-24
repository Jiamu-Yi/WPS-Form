<template>
  <div class="title">{{ formDetail.formTitle }}</div>
  <div>
    <template v-if="loading">
      <a-skeleton active/>
      <a-skeleton active/>
      <a-skeleton active/>
    </template>
    <template v-if="!loading">
      <div
        class="problemBox"
        v-for="(item, index) in formDetail.data"
        :key="index"
      >
        <div>
          <div class="problemTitle">
            {{ index + 1 }}&nbsp;.&nbsp; {{ item.title }}
          </div>
        </div>
        <!-- 拿数据时发现item.result.value    同一个属性 不同的问题,返回的类型是对象和字符串两种类型 所以进行了判断 -->
        <!-- 根据问题的类型 展示不同的问题 -->
        <div v-if="item.type === 'input' || item.type === 'score'" class="problemResult">
          <div v-if="item.result" class="problemResult">
            {{ item.result.value }}
          </div>
          <div v-if="!item.result" class="problemNoResult">
            此题未填写
          </div>
        </div>
        <div v-if="item.type === 'date' || item.type === 'time'">
          <div v-if="item.result" class="problemResult">
            {{ formateDate(item.result.value) }}
          </div>
          <div v-if="!item.result" class="problemNoResult">
            此题未填写
          </div>
        </div>
        <div v-if="item.type === 'pullSelect' || item.type === 'singleSelect'">
          <div v-if="item.result" class="problemResult">
            {{ item.result.value.title }}
          </div>
          <div v-if="!item.result" class="problemNoResult">
            此题未填写
          </div>
        </div>
        <div v-if="item.type === 'multiSelect'">
          <div v-if="item.result" class="problemResult">
            <div v-for="(el, index) in item.result.value" :key="index">
              {{ el.title }}
            </div>
          </div>
          <div v-if="!item.result" class="problemNoResult">
            此题未填写
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {inject} from "vue";

export default {
  name: "result-com",
  setup() {
    let formDetail = inject("formDetail");
    let loading = inject("loading");
    // 新的时间格式化函数  处理返回数据中另一种类型的时间
    function formateDate(date: string) {
      const arr = date.split("T");
      const d = arr[0];
      const darr = d.split("-");

      const t = arr[1];
      const tarr = t.split(".000");
      const marr = tarr[0].split(":");

      const dd =
        parseInt(darr[0]) +
        "-" +
        parseInt(darr[1]) +
        "-" +
        parseInt(darr[2]) +
        " " +
        parseInt(marr[0]) +
        ":" +
        parseInt(marr[1]) +
        ":" +
        parseInt(marr[2]);
      return dd;
    }
    return {
      formDetail,
      loading,
      formateDate,
    };
  },
};
</script>

<style scoped>
.title {
  color: #3d4757;
  font-size: 20px;
  margin-top: 18px;
  text-align: center;
}
.problemBox {
  margin-top: 32px;
}
.problemTitle {
  color: #3d4757;
  font-size: 14px;
  line-height: 21px;
  white-space: pre-line;
  word-break: break-all;
  font-weight: bold;
}

.problemResult {
  font-size: 16px;
  color: #535252;
  line-height: 24px;
  white-space: pre-line;
  word-break: break-all;
  margin-top: 8px;
}

.problemNoResult {
  font-size: 14px;
  color: #c0c6cf;
  line-height: 24px;
  white-space: pre-line;
  word-break: break-all;
  margin-top: 8px;
}
</style>
