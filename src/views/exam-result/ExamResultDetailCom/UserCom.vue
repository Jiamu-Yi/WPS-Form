<template>
  <a-skeleton-input v-if="loading" style="width: 200px; height: 28px;" active="active"/>
  <div class="publishTime" v-if="!loading">
    <div class="Time">
      提交者:
      <img
        class="avatar-title"
        src="https://avatar.qwps.cn/avatar/V1BTXzE2MDIwODE3NTQ="
        data-v-7a0fe05e=""
      />
      &nbsp;{{ formDetail.author }} &nbsp; ({{ formDetail.time }})
    </div>
  </div>
</template>

<script lang="ts">
import {inject} from "vue";

export default {
  name: "user-com",
  setup() {
    let loading = inject("loading");

    let formDetail = inject("formDetail");

    return {
      formDetail,
      loading
    };
  },
};
</script>

<style scoped>
.publishTime {
  width: 100%;
  border-top: 1px solid #e7e9eb;
  margin-top: 20px;
  position: relative;
}
.Time {
  display: flex;
  font-size: 14px;
  line-height: 26px;
  padding: 16px 0;
  color: #767c85;
}

.avatar-title {
  width: 28px;
  height: 28px;
  margin-left: 10px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
}
</style>
