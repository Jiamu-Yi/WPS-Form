import axios from '../config'
import {AxiosPromise} from 'axios'

//登陆返回结果类型
interface IreqLoginIn {
  stat: string,
  msg?: string,
}

// 注册返回结果类型
interface IreqRegister {
  stat: string,
  msg?: string,
  data?: {
    id: string
  }
}

// 注销返回结果类型
interface IreqLoginOut {
  stat: string,
  msg?: string,
}

/**
 * @description: 登陆，返回携带cookies，不携带用户信息
 * @return {Promise}
 * @param account 账号
 * @param pwd 密码
 * }
 */
export const reqLoginIn = (account: string, pwd: string): AxiosPromise<IreqLoginIn> => {
  return axios.request({
    data: {
      account,
      pwd,
    },
    url: '/api/auth/login',
    method: 'POST',
  })
}

/**
 * @description: 注册用户
 * @return {Promise}
 * @param account 账号
 * @param pwd 密码
 * @param confirmPwd 确认密码
 */
export const reqRegister = (account: string, pwd: string, confirmPwd: string): AxiosPromise<IreqRegister> => {
  return axios.request({
    data: {
      account,
      pwd,
      confirmPwd,
    },
    url: '/api/auth/register',
    method: 'POST',
  })
}
/**
 * @description: 退出登陆
 * @return {Promise}
 */
export const reqLoginOut = (): AxiosPromise<IreqLoginOut> => {
  return axios.request({
    url: '/api/auth/logout',
    method: 'POST',
  })
}
