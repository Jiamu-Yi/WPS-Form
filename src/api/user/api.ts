import axios from '../config'
import {AxiosPromise} from 'axios'

//获取用户信息返回结果类型
export interface IresGetInfo {
    stat?: string,
    data?: {
        user: {
            id: string,
            account: string,
            pwd: string,
            status: number,
            ctime: number,
            utime: number,
            nickname: string,
            avatar: string
        }
    },
    msg?: string
}

// 设置用户信息返回结果类型
interface IreqSetInfo {
    stat: string,
    msg?: string,
}

// 修改用户信息返回结果类型
interface IreqChangePwd {
    stat: string,
    msg?: string,
}

/**
 * @description: 登陆，返回携带cookies，不携带用户信息
 * @return {Promise}
 * }
 */
export const resGetInfo = (): AxiosPromise<IresGetInfo> => {
    return axios.request({
        url: '/api/user/getInfo',
        method: 'GET',
    })
}

/**
 * @description: 注册用户
 * @return {Promise}
 * @param nickname 账号
 * @param avatar 密码
 */
export const reqSetInfo = (nickname = '' as string, avatar = '' as string): AxiosPromise<IreqSetInfo> => {
    if (avatar === '') {
        avatar = ' '
    }
    return axios.request({
        data: {
            nickname,
            avatar
        },
        url: '/api/user/setInfo',
        method: 'POST',
    })
}
/**
 * @description: 切换密码
 * @return {Promise}
 */
export const reqChangePwd = (oldPwd: string, pwd: string, confirmPwd: string): AxiosPromise<IreqChangePwd> => {
    return axios.request({
        data: {
            oldPwd,
            pwd,
            confirmPwd
        },
        url: '/api/user/changePwd',
        method: 'POST',
    })
}


/**
 * @description: 上传到图床
 * @return {Promise}
 */
export const reqUpload = (data: any): AxiosPromise<any> => {
    return axios.request({
        headers: {
            "Content-Type": "multipart/form-data",
        },
        data: data,
        url: 'http://upload.jiangtao.website/upload/image',
        method: 'POST',
    });
}
