<template>
  <div class="modal" ref="modal">
    <a-modal v-model:visible="isVisible"
             title="管理常用题"
             :footer="null"
             :getContainer='()=>$refs.modal'
             :maskClosable=false
             @cancel.prevent="cancel"
    >
      <slot name="manageAddButton"></slot>
      <slot name="manageList"></slot>
      <slot name="editTypeList"></slot>
      <slot name="editSearch"></slot>
      <slot name="editItemList"></slot>
      <slot name="editButtonList"></slot>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject} from "vue";

export default defineComponent({
  name: 'modal-base',
  props: ['visible'],
  setup() {

    const isVisible = inject('visible') as any;

    const isEdit = inject('isEdit') as any;

    const cancel = () => {
      isEdit.value = false;
    }

    return {
      isVisible,
      cancel,
    };
  },
})
</script>

<style lang="scss">
.ant-modal-root {
  .ant-modal-mask {
    background-color: rgba(67, 88, 117, .5);
  }

  .ant-modal-wrap {
    display: flex;
    z-index: 1000;
    position: fixed;
    top: 0%;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    height: 100%;
    overflow: hidden;

    .ant-modal {
      width: auto !important;

      .ant-modal-content {

        .ant-modal-header {
          padding: 0 30px;
          border: none;

          .ant-modal-title {
            font-size: 18px;
            color: #3d4757;
            text-align: left;
            line-height: 30px;
            padding: 15px 0;
            font-weight: 400;
            border-bottom: 1px solid #f0f0f0;
          }
        }

        .ant-modal-body {
          padding: 30px;
          width: 850px;
          height: 60vh;
          box-sizing: border-box;
          min-height: 490px;

          .add {
            margin-bottom: 16px;

            .plus {
              color: #1488ed;
              margin-right: 4px;
            }

            .title {
              color: #1488ed;
              font-size: 14px;
            }
          }

          .list {
            height: 50vh;
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
        }
      }
    }
  }
}
</style>
