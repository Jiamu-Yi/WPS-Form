import axios from '../config'
import {AxiosPromise} from 'axios'

//获取表单返回结果类型
interface IresGetFormList {
    stat: string,
    msg?: string,
    data?: {
        items: {
            id: string,
            ctime: number,
            utime: number,
            status: number,
            author: string,
            isStar: true,
            title: string,
            subTitle: string,
            problems: {
                title: string,
                type: string,
                required: false,
                id: string,
            }[]
        }[],
        total: number,
    },
}

//创建表单返回结果类型
interface IreqCreateForm {
    stat: string,
    msg?: string,
    data?: {
        id: string
    }
}

//获取表单返回结果类型
export interface IreqGetForm {
    stat: string,
    msg?: string,
    data?: {
        item: {
            id: string,
            ctime: number,
            utime: number,
            status: number,
            author: string,
            isStar: boolean,
            title: string,
            subTitle: string,
            problems: {
                title: string,
                type: string,
                required: false,
                id: string,
            }[]
        }
    }
}

//删除表单返回结果类型
interface IreqDeleteForm {
    stat: string,
    msg?: string,
}

//收藏表单返回结果类型
interface IreqStarForm {
    stat: string,
    msg?: string,
}

//取消返回结果类型
interface IreqCancelStar {
    stat: string,
    msg?: string,
}

//填写表单返回结果类型
interface IreqInputForm {
    stat: string,
    msg?: string,
}

//填写表单结果返回结果类型
// interface IreqResultForm {
//     stat: string,
//     msg?: string,
//     info?: any,
//     items?: any,
// }

//填写表单结果细节返回结果类型
// interface IreqDetailForm{
//     stat:string,
//     msg?:string,
// }

//开始收集表单返回结果类型
export interface IreqStartForm {
    stat: string,
    msg?: string,
}

//结束收集表单返回结果类型
export interface IreqEndForm {
    stat: string,
    msg?: string,
}

/**
 * @description: 获取列表
 * @return {Promise}
 * }
 */
export const reqGetFormList = (offset: undefined | number, limit: undefined | number, isStar: undefined | boolean): AxiosPromise<IresGetFormList> => {
    return axios.request({
        data: {
            offset,
            limit,
            isStar
        },
        url: '/api/form/list',
        method: 'POST',
    })
}

/**
 * @description: 创建表单
 * @return {Promise}
 * @param title
 * @param subTitle
 * @param problems
 */
export const reqCreateForm = (
    title: string,
    subTitle: string,
    problems?: {
        title: string
        type: "input" | "singleSelect" | "multiSelect" | "pullSelect" | "date" | "time" | "score" | string
        required: boolean
        setting?: {
            options: {
                title: string
                status: 1 | 2
            }[]
        }
    }[]
): AxiosPromise<IreqCreateForm> => {
    return axios.request({
        data: {
            title,
            subTitle,
            problems
        },
        url: '/api/form/create',
        method: 'POST',
    })
}

/**
 * @description: 获取表单
 * @return {Promise}
 * @param id
 */
export const reqGetForm = (id: string | undefined): AxiosPromise<IreqGetForm> => {
    return axios.request({
        data: {
            id,
        },
        url: '/api/form/get',
        method: 'POST',
    })
}

/**
 * @description: 删除表单
 * @return {Promise}
 * @param id
 */
export const reqDeleteForm = (id: string): AxiosPromise<IreqDeleteForm> => {
    return axios.request({
        data: {
            id,
        },
        url: '/api/form/delete',
        method: 'POST',
    })
}

/**
 * @description: 表单标星
 * @return {Promise}
 * @param id
 */
export const reqStarForm = (id: string): AxiosPromise<IreqStarForm> => {
    return axios.request({
        data: {
            id,
        },
        url: '/api/form/star',
        method: 'POST',
    })
}

/**
 * @description: 表单取消标星
 * @return {Promise}
 * @param id
 */
export const reqCancelStar = (id: string): AxiosPromise<IreqCancelStar> => {
    return axios.request({
        data: {
            id,
        },
        url: '/api/form/cancelStar',
        method: 'POST',
    })
}

/**
 * @description: 填写表单
 * @return {Promise}
 * @param formId
 * @param problems
 */
export const reqInputForm = (
    formId: string,
    problems: {
        id: string,
        title: string,
        type: "input" | "singleSelect" | "multiSelect" | "pullSelect" | "date" | "time" | "score",
        required: boolean,
        setting?: {
            options: {
                title: string,
                status: 1 | 2,
            }[]
        }
        result?: string | number | {
            id: string,
            title: string,
        } | {
            id: string,
            title: string,
        }[]
    }[]
): AxiosPromise<IreqInputForm> => {
    return axios.request({
        data: {
            formId,
            problems
        },
        url: '/api/form/input',
        method: 'POST',
    })
}

/**
 * @description: 获取表单填写详情
 * @return {Promise}
 * @param formId
 */
// <IreqResultForm> 加上这个类型  调用接口后 有正常的返回值 但是不能用  例如以这样的方式去取数据 data.value.data.data.item.result;
//   编译器它会说在<IreqResultForm>类型上缺少xxxx 但是浏览器的控制可以打印出来我想要拿到的数据
// export const reqResultForm = (formId: string): AxiosPromise<IreqResultForm> => {
export const reqResultForm = (formId: string): AxiosPromise => {
    return axios.request({
        url: '/api/form/formResult/' + formId,
        method: 'GET',
    })
}

/**
 * @description: 获取表单单个填写详情
 * @return {Promise}
 * @param id
 */
export const reqDetailForm = (id: string): AxiosPromise => {
    return axios.request({
        url: '/api/form/detail/' + id,
        method: 'POST',
    })
}

/**
 * @description: 开始收集表单
 * @return {Promise}
 * @param id
 */
export const reqStartForm = (id: string): AxiosPromise<IreqStartForm> => {
    return axios.request({
        data: {
            id,
        },
        url: '/api/form/start',
        method: 'POST',
    })
}

/**
 * @description: 结束收集表单
 * @return {Promise}
 * @param id
 */
export const reqEndForm = (id: string): AxiosPromise<IreqEndForm> => {
    return axios.request({
        data: {
            id,
        },
        url: '/api/form/end',
        method: 'POST',
    })
}

