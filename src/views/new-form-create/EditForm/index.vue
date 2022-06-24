<template>
  <div class="scrollbar-container">
    <div class="body">
      <header-com :backable="true" :showUser="true">
        <template v-slot:formName>
          <!-- 这里使用计算属性Topname -->
          {{ Topname ? Topname : '新建表单' }}
        </template>
      </header-com>
      <div>
        <main>
          <div class="main-wrap">
            <div class="main">
              <panel-question-com></panel-question-com>
              <edit-com/>
              <action-com/>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import PanelQuestionCom from '@/views/new-form-create/EditForm/PanelQuestionCom/index.vue';
import ActionCom from '@/views/new-form-create/EditForm/PanelActionCom/ActionCom.vue';
import editCom from '@/views/new-form-create/EditForm/PanelEditCom/index.vue';
import {reqGetProblemListBasic, reqGetProblemListStar, reqGetProblemListTpye, reqStarProblem} from '@/api/problem/api';
import {computed, defineComponent, inject, onMounted, provide, ref} from 'vue';
import {message} from 'ant-design-vue';
import {IproblemType} from '@/type/type';
import {reqDeleteForm} from "@/api/form/api";
import {nanoid} from "nanoid";

export default defineComponent({
  name: 'edit-form',
  components: {ActionCom, PanelQuestionCom, editCom},

  setup() {
    //表单
    let form = inject('form') as any;
    //添加题目列表
    let problemTypes = ref<IproblemType[]>([]);
    //题目模板列表
    let problemBasic = ref<any>([]);
    //题目收藏列表
    let problemStarList = ref<any>([]);
    //记录当前的焦点
    let currentProblemId = ref<any>('')
    //记录路由所携带的参数是否为继续编辑或表单
    const ctgName = inject('ctgName') as any
    //处于加载中
    let questionLoading = ref<boolean>(true)

    /**
     * @description: 挂载前将列表从接口中取出，渲染页面
     */
    onMounted(async () => {
      // 获取收藏问题模板
      await getStarProblemList();
      //获取所有问题种类
      await getProblemListTpye();
      //获取基础问题模板
      await getBasicProblemList();
      questionLoading.value = false;
    });

    /**
     * @description: 获取所有问题种类
     */
    const getProblemListTpye = async () => {
      const problemData = await reqGetProblemListTpye();
      problemTypes.value = problemData.data.data?.problemTypes ? problemData.data.data?.problemTypes : [];
    };

    /**
     * @description: 获取基础问题模板
     */
    const getBasicProblemList = async () => {
      const problemBasicData = await reqGetProblemListBasic();
      problemBasic.value = problemBasicData.data.data?.basicProblems ? problemBasicData.data.data?.basicProblems : [];
    };

    /**
     * @description: 获取收藏问题模板
     */
    const getStarProblemList = async () => {
      const problemStarData = await reqGetProblemListStar();
      problemStarList.value = problemStarData.data.data?.items ? problemStarData.data.data?.items : [];
    };

    /**
     * @description: 获取问题在列表中的位置
     */
    const getProblemListIndex = () => {
      let res = -1;
      problemList.value.forEach((problem: any, index: number) => {
        if (problem.id === currentProblemId.value) {
          res = index;
        }
      })
      return res;
    };

    /**
     * @description: 添加问题 核心逻辑
     */
    const addProblem = (problem: any) => {
      let index = getProblemListIndex();
      let isFoucs = !!currentProblemId.value;
      try {
        let newItem = Object.assign({}, problem);
        newItem.id = nanoid();
        currentProblemId.value = newItem.id;
        // 点击问题列表添加问题与复制问题相比 需要自己手动添加一个required属性
        if (!isFoucs || problemList.value.length === 0) {
          problemList.value.push(newItem);
        } else {
          problemList.value.splice(index + 1, 0, newItem);
        }
      } catch {
        message.error("发生了错误，请重新操作！");
      }
    };

    /**
     * @description: 通过问题列表添加问题
     */
    const addProblemByList = (type: string) => {
      addProblem(buildProblem(type));
    };

    /**
     * @description: 通过模板问题列表添加模板问题
     */
    const addTemplateProblemByList = (templateProblem: any) => {
      addProblem(templateProblem);
    };

    /**
     * @description: 通过常用题问题列表添加常用题模板问题
     */
    const addStarProblemByList = (StarProblem: any) => {
      addProblem(StarProblem);
    };

    /**
     * @description:  通过复制添加问题
     */
    const addProblemByCopy = (item: any) => {
      addProblem(item);
    };

    /**
     * @description:  构建空对象
     */
    const buildProblem = (type: string) => {
      switch (type) {
        case "input":
        case "score":
          return {
            id: '',
            title: '',
            type: type,
            required: false
          }
        case "date":
        case "time":
          return {
            id: '',
            title: '',
            type: type,
            required: false,
            setting: {
              options: [
                {
                  title: 'tpye',
                  status: 1
                },
              ],
            },
          }
        case "singleSelect":
        case "pullSelect":
        case "multiSelect":
          return {
            id: '',
            title: '',
            type: type,
            required: false,
            "setting": {
              "options": [
                {
                  "title": '选项一',
                  "status": 1,
                },
                {
                  "title": '选项二',
                  "status": 1,
                },
              ],
            },
          }
      }
    };

    /**
     * @description: 删除表单
     */
    const delForm = async (id: string) => {
      await reqDeleteForm(id);
    };

    /**
     * @description: 设置全部问题为非必填
     */
    const setAllProblemsUnrequired = () => {
      form.value.problems.forEach((item: any) => {
        item.required = false;
      })
    };

    /**
     * @description: 设置问题玩常用题
     */
    const starProblem = async (item: any) => {
      try {
        await reqStarProblem(item);
        await getStarProblemList();
        message.success('添加成功');
      } catch {
        message.error("设置错误，请重试！");
      }
    };

    //问题列表
    const problemList = computed(() => {
      return form.value.problems ? form.value.problems : [];
    });

    //顶部显示的是新建表单还是title
    const Topname = computed(() => {
      return ctgName.value === '继续编辑' && form.value ? form.value.title : '新建表单';
    });

    provide('problemTypes', problemTypes);

    provide('problemBasic', problemBasic);

    provide('problemStarList', problemStarList);

    provide('currentProblemId', currentProblemId);

    provide('getProblemListIndex', getProblemListIndex);

    provide('addProblemByList', addProblemByList);

    provide('addProblemByCopy', addProblemByCopy);

    provide('addTemplateProblemByList', addTemplateProblemByList);

    provide('addStarProblemByList', addStarProblemByList);

    provide('setAllProblemsUnrequired', setAllProblemsUnrequired);

    provide('starProblem', starProblem);

    provide('getStarProblemList', getStarProblemList);

    provide('delForm', delForm);

    provide('buildProblem', buildProblem);

    provide('questionLoading', questionLoading);

    return {
      form,
      Topname
    }
  }
})
</script>

<style lang="scss" scoped>

.body {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #f2f4f7;
  overflow-x: auto;
  margin: 0 auto;
  position: fixed;
  div {
    display: flex;
    font-size: 14px;
    line-height: 20px;
    color: #3d4757;
    flex: 1;
    justify-content: center;

    main {
      display: flex;
      width: 100%;
      height: 100%;
      padding-top: 72px;
      background-color: #f2f4f7;
      min-height: calc(100vh - 88px);
      user-select: none;
      flex: 1 1 auto;

      .main-wrap {
        flex: 1 1;
        overflow: auto;
        min-width: 0;

        .main {
          flex: 1 1;
          min-height: 0;
          overflow: auto;
          width: 100%;
          height: 100%;
          margin: 0 auto;

          ul, li {
            list-style: none;
            margin: 0;
            padding: 0;
          }
        }
      }
    }
  }
}

.scrollbar-container {
  height: 100%;
  overflow: auto;

  // 滚动条整体部分
  :deep(::-webkit-scrollbar) {
    width: 8px !important;
    height: 6px !important;
  }

  // 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
  :deep(::-webkit-scrollbar-button) {
    display: none !important;
  }

  // 滚动条的轨道（里面装有Thumb）
  :deep(::-webkit-scrollbar-track) {
    background: transparent !important;
  }

  // 滚动条的轨道（里面装有Thumb）
  :deep(::-webkit-scrollbar-track-piece) {
    background-color: transparent !important;
  }

  // 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
  :deep(::-webkit-scrollbar-thumb ) {
    background-color: #bec2c9;
    cursor: pointer !important;
    border-radius: 4px !important;
  }

  // 边角，即两个滚动条的交汇处
  :deep(::-webkit-scrollbar-corner) {
    display: none !important;
  }

  // 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件
  :deep(::-webkit-resizer) {
    display: none !important;
  }
}

</style>
