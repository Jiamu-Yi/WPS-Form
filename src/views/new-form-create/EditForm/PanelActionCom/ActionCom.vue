<template>
  <!--    右侧操作栏-->
  <aside class="operation">
    <div class="operation-container">
      <div class="common-button">
        <a-button class="preview" @click="view">预览</a-button>
        <a-button class="save" @click="save">保存草稿</a-button>
      </div>
      <a-button class="complete" type="primary" @click="finishCommit">完成创建</a-button>
    </div>
  </aside>
</template>

<script lang="ts">
import {computed, defineComponent, inject} from 'vue';
import router from '@/router';
import {message} from 'ant-design-vue';
import {reqCreateForm, reqStartForm} from '@/api/form/api';

export default defineComponent({
  name: 'panel-action-com',
  setup() {
    const form = inject('form') as any;

    const ctgName = inject('ctgName') as any;

    const delForm = inject('delForm') as any;

    const changeCount = inject('changeCount') as any;

    /**
     * @description: 判断主标题和问题标题是否为空
     */
    const isEmpty = () => {
      if (!form.value.title) {
        message.warn('请输入表单标题');
        return false
      } else if (!form.value.subTitle) {
        message.warn('请输入表单副标题');
      } else if (form.value.problems.some((problem: any) => problem.title === "")) {
        message.warn('问题不能为空，请输入');
        return false;
      } else if (form.value.problems.length === 0) {
        message.warn('至少设置一个配置项');
        return false;
      } else if (form.value.problems.some(
        (problem: any) => {
          return problem.setting && problem.setting.options.some((option: any) => {
            return option.title === "";
          });
        }
      )) {
        message.warn('选择题的选项不可以为空');
        return false;
      } else {
        return true;
      }
    }

    /**
     * @description: 预览事件函数
     */
    const view = async () => {
      try {
        if (isEmpty()) {
          router.push({
            name: 'preview',
            query: {
              id: formId.value
            }
          });
        }
      } catch {
        message.error('操作失败，请重新操作！');
      }
    }

    /**
     * @description: 保存事件函数 这里要分情况，如果是新建文件，保存需要新建文件，不需要删除
     */
    const save = async () => {
      try {
        if (isEmpty()) {
          let res = await reqCreateForm(
            title.value,
            subTitle.value,
            problemList.value,
          );
          if (ctgName.value === '继续编辑') {
            delForm(form.value.id)
          }
          //修改操作数为1，即恢复未操作状态
          changeCount.value = 1;
          message.success('保存成功！');
          return res;
        }
      } catch {
        message.error('保存失败，请重试！');
      }
    }

    /**
     * @description: 完成创建 这里要分情况，如果是新建文件，保存需要新建文件，不需要删除，
     */
    const finishCommit = async () => {
      try {
        if (isEmpty()) {
          let res = await reqCreateForm(
            title.value,
            subTitle.value,
            problemList.value,
          );
          reqStartForm(res?.data.data?.id ? res?.data.data?.id : '');
          if (ctgName.value === '继续编辑') {
            delForm(form.value.id)
          }
          message.success('创建成功！');
          router.replace({
            name: 'share',
            params: {
              id: res.data.data?.id
            }
          });
        }
      } catch {
        message.error('完成创建失败，请重新操作！');
      }
    }

    //主标题
    const title = computed(() => {
      return form.value.title ? form.value.title : '';
    })

    //副标题
    const subTitle = computed(() => {
      return form.value.subTitle ? form.value.subTitle : '';
    })

    //问题列表
    const problemList = computed(() => {
      return form.value.problems ? form.value.problems : [];
    })

    //表单ID
    const formId = computed(() => {
      return form.value.id ? form.value.id : '';
    })

    return {
      view,
      save,
      finishCommit,
    }
  }
})
</script>

<style lang="scss" scoped>
//右侧操作栏
.operation {
  width: 290px;
  margin-left: 16px;
  margin-right: 10px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;

  .operation-container {
    //position: fixed;
    position: absolute;
    //上面普通操作栏
    .common-button {
      display: flex;
      flex-direction: row;
      margin-bottom: 12px;
      justify-content: space-between;

      .preview, .save {
        width: 140px;
        height: 32px;
        background-color: #fff;
        border: 1px solid #e7e9eb;
        border-radius: 2px;
        font-size: 14px;
        padding: 0 20px;
        cursor: pointer;
      }

      .save {
        margin-left: 8px;
      }

      .preview:hover,
      .save:hover {
        background-color: #f9fafd;
      }
    }

    //下面完成创建按钮
    .complete {
      width: 290px;
      height: 32px;
    }
  }
}
</style>
