<template>
  <a-dropdown :trigger="['click']">
    <div class="answer">
      <div class="select-container">
        <div class="value ant-dropdown-link">
          {{ result.title ? result.title : '填写者选择区' }}
        </div>
        <DownOutlined class="icon"/>
      </div>
    </div>
    <template #overlay>
      <a-menu class="item-list">
        <a-menu-item
          v-for="(item) in options"
          :key="item.id"
          @click="choiceOption(item)"
          :class="{ item: true, active: result.title === item.title}">
          {{ item.title }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
import {computed, defineComponent, toRef} from "vue";
import {DownOutlined} from '@ant-design/icons-vue';

export default defineComponent({
  name: 'pull-select',
  props: ["formItem"],
  components: {
    DownOutlined
  },
  setup(props) {

    let formItem = toRef(props, 'formItem');

    const options = computed(() => {
      return formItem.value.setting.options ? formItem.value.setting.options : [];
    });

    const result = computed({
      get: () => {
        return formItem.value.result ? formItem.value.result.value : '';
      },
      set: (newValue) => {
        formItem.value.result = {value: newValue};
      },
    });

    const choiceOption = (item: any) => {
      result.value = item;
    };

    return {
      result,
      options,
      choiceOption
    }
  }
})
</script>

<style lang="scss" scoped>
.answer {
  width: 100%;
  height: 35px;

  .select-container {
    width: 100%;
    display: flex;
    border: 1px solid #e7e9eb;
    align-items: center;
    justify-content: space-between;

    .value {
      background: #fff;
      height: 34px;
      line-height: 34px;
      padding: 0 8px;
      font-size: 14px;
      border-radius: 2px;
      white-space: nowrap;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      border-bottom: 1px solid #e7e9eb;
      color: #949aae;
    }

    .icon {
      color: #949aae;
      margin-right: 8px;
    }

    .item-list {
      padding: 4px;
      max-height: 208px;
      overflow-y: auto;

      .item {
        height: 30px;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        font-size: 12px;
        color: #3d4757;
        padding: 0 12px;
        cursor: pointer;
      }

      .active {
        color: #5c96f0;
        background-color: #f5f7f9;
      }
    }
  }
}
</style>
