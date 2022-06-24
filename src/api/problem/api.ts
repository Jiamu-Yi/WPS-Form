import axios from '../config'
import {AxiosPromise} from 'axios'

// 获取基础题目类型返回结果类型
interface IreqGetProblemListTpye {
    stat: string,
    msg?: string,
    data?: {
        problemTypes: {
            title: string,
            type: string,
        }[]
    }
}

//获取基础题目返回结果类型
interface IreqGetProblemListBasic {
    stat: string,
    msg?: string,
    data: {
        basicProblems: {
            id: string,
            type: string,
            title: string,
            required: boolean,
            setting?: {
                options: {
                    id: string,
                    title: string,
                    status: number,
                }[]
            }
        }[]
    }
}

//获取收藏的题目返回结果类型
interface IreqProblemStarList {
    stat: string,
    msg?: string,
    data?: {
        items: any
    }
}

//收藏题目返回结果类型
interface IreqStarProblem {
    stat: string,
    msg?: string,
}

//取消收藏题目返回结果类型
interface IreqCancelStarProblem {
    stat: string,
    msg?: string,
}

/**
 * @description: 获取基础题目类型
 * @return {Promise}
 */
export const reqGetProblemListTpye = (): AxiosPromise<IreqGetProblemListTpye> => {
    return axios.request({
        url: '/api/problem/listType',
        method: 'GET',
    })
}

/**
 * @description: 获取基础题目
 * @return {Promise}
 */
export const reqGetProblemListBasic = (): AxiosPromise<IreqGetProblemListBasic> => {
    return axios.request({
        url: '/api/problem/listBasic',
        method: 'GET',
    })
}

/**
 * @description: 获取收藏的题目
 * @return {Promise}
 */
export const reqGetProblemListStar = (): AxiosPromise<IreqProblemStarList> => {
    return axios.request({
        url: '/api/problem/listStar',
        method: 'POST',
    })
}

/**
 * @description: 收藏题目
 * @return {Promise}
 * @param problem
 */
export const reqStarProblem = (
    problem: {
        title: string
        type: "input" | "singleSelect" | "multiSelect" | "pullSelect" | "date" | "time" | "score"
        required: boolean
        setting?: {
            options: {
                title: string
                status: 1 | 2
            }[]
        }
    }
): AxiosPromise<IreqStarProblem> => {
    return axios.request({
        data: {
            problem,
        },
        url: '/api/problem/star',
        method: 'POST',
    })
}

/**
 * @description: 取消收藏题目
 * @return {Promise}
 * @param id
 */
export const reqCancelStarProblem = (id: string): AxiosPromise<IreqCancelStarProblem> => {
    return axios.request({
        data: {
            id,
        },
        url: '/api/problem/cancelStar',
        method: 'POST',
    })
}
