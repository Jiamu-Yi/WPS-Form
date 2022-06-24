<template>
  <div class="body">
    <div class="header">
      <header-com :backable="false" :showUser="true">
        <template v-slot:formName>
          表单名称
        </template>
      </header-com>
    </div>
    <div class="container">
      <div class="main">
        <form-com :formID="formId" v-if="true"></form-com>
      </div>
      <div class="form-footer">
        <p>
          <span class="logo"></span>
          由
          <span class="src-common">金山文档</span>
          旗下表单提供服务
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import formCom from '@/views/write/FormCom.vue';
import {useRoute} from "vue-router";

export default defineComponent({
  name: 'write-com',
  components: {
    formCom,
  },
  setup() {
    const route = useRoute();
    let formId = route.params.id;
    return {
      formId
    }
  }
})

</script>

<style lang="scss" scoped>
.body {
  width: 100%;
  height: 100vh;
  background-color: #f2f4f7;


  @media only screen and (min-width: 661px) {
    .main {
      margin-top: 16px;
    }
    .form-footer {
      display: none;
    }
  }
  @media only screen and (max-width: 660px) {
    .main {
      height: 100%;
    }
    .header {
      display: none;
    }
    .container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .form-footer {
        width: 100%;
        bottom: 0;
        font-size: 12px;
        color: #9b9b9b;
        line-height: 8.5px;
        text-align: center;
        background: #f5f5f5;
        font-weight: 400;
        padding: 15px 0 calc(8px + env(safe-area-inset-bottom) / 2);
        flex-shrink: 0;
        cursor: pointer;

        p {
          margin-bottom: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 0;

          .logo {
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAABZVBMVEVHcEwzsP0JYO8IcfYun/whjvw7uP8UlvlEvv9OwP8Agf8AYf45tf82s/0LWuIOXOkGZPMAdPUpqPsAd/xEvv8+uv8Nj/wAef0AYv8AYv8tqfsRh/AuqP9Evv82sv0AYf0RUNoRT9gAfPsJU+ItrfwEXfQLcu0RT9oJU94LVuhBvP87uP4AYv8Pkf0VmPkcnvo2s/wAgv8xr/wUTdQST9gaSswIU+QVmfkRifIZS84op/sAauodfe0kpfsrqvwAgP8AYv8vrfwnp/sxr/00sf0VTNM8uP4AYf4Ym/oYSs42s/0OU+ghovsNVusLWfEIU+U5tf0PUeUfofoNUd0NV+4sq/wAX/oAXvUSTtYcnvoQT+IQT9oMUuAAePlAu/4Aff0AXPERTeAAdvYKUuIAV+IAcvAAevsSTN0LW/QJXfYAVdwAb+0AaeQBbOgGVOMAWuwAWOgAZt8IVuoAUtYAZNwWYeQYbutxxtx+AAAAPXRSTlMAZjMkDgki/v4C9/c/+3wXS/7nyqzqiVm3kar9cY2F3GSX6qhc7t7U8ETS+WlAs9DNqvfnxrnj6+/2g/Dv6rk9dgAAAqZJREFUeNrtlPlT2kAUxxcISIRBBQSPEW8O72oPe4GAqIgJVSJaPFABUYTxavv39+0mbGqza8Sf/bCTMGE++e57LwG98RpEh9/veIUnjDiBEaHTOEu/k9BvETvx3DOnzlOC0znjfrHm8G8Ap/iDDxsvLFUIzW78xywu1by4H0a2TUt1L21zWHI/V9zQOps0PgzxSrWHltMcksl0Mr2+HLKzvClv0oy0d8roWeLx/fg+LHoGyHdAvz5kbOeUNwXEU3EDcBEDJ2+4zqrxS8qEb/V6ndPV73xSq8d1gDfHxZ02eztP6PpdJyAeFu8eg60/5xpc0e5Z/WkgUFI5L/FEMRhuNZvDW09YcKAShe31+mq1m1bzvtWla4vz8MMuhaVZfZcnF33E/HXTpfIJXgsT0fYuUS6rJlGHsRcQEGE318bgBbsTCWKeXNTU0PvhBRvSyPFFIYBNGtrCKqJvryRJOSkHS0KsvVJTC0UUiYJYzPuehDb/ERVFUiRYCm+ME9SEUERRKIhj2qFUbF7iHiGKLMuKrMCSEZdePVSf8LSswRV7JquNap82mHbXJiuVB/kKkK9k3hM+fXtXrTaaE4kyqOqtxgvHlUolDyaGvcvRg4OzW1Abja/doJJbRQsFbObzD9cYhmYdKBaLmglqOFFG4tjK0dERiMTMyyxRGNwEsHqmhj5GfbHI4eGhalaI+cAQY5tra6pJt/uYyWSISSMhlLVTEAEwcegdqBkAi7oZiSEGwVEcWtS3m6WRqvlxTORMY9AFqh6azYBKI6MeO+JiGwATUEOz4BETq+M96Flio3poFkxNnLQhM8Q5V9vMtiPfW5E5otgzuEmadA0iViO99K/ATLX6sOoi3gqrlXx1bnqNiJ89gkmc8RF0gWjSSt5oPlgh7Y3O+Qs0glhnhDAzGAAAAABJRU5ErkJggg==) no-repeat;
            background-size: auto;
            width: 16px;
            height: 16px;
            -webkit-background-size: cover;
            background-size: cover;
            display: inline-block;
            margin-right: 9px;
          }

          .src-common {
            color: #3692f5;
            // border-bottom: 1px #3692f5 solid;
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
