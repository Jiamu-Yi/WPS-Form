/*
 * @FileDescription: Vuex TS配置文件
 * @Author: yijiamu
 * @Date: 2022-05-20 22:48:32
 * @LastEditors: yijiamu
 * @LastEditTime: 2022-05-20 22:48:32
 */
import {Store} from 'vuex'
import {State} from './index'

declare module '@vue/runtime-core' {
    // 为 `this.$store` 提供类型声明
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}
