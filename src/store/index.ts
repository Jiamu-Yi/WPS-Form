import {InjectionKey} from 'vue'
import {createStore, Store} from 'vuex'
import actions from './actions'
import mutations from './mutations'
import {IresGetInfo} from "@/api/user/api";

// 为 store state 声明类型
export interface State {
  userInfo: IresGetInfo,
  currentProblemId: string
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    userInfo: {}, //用户信息
    currentProblemId: '',
  },
  getters: {},
  actions,
  mutations,

})

