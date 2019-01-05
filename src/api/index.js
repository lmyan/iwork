import axios from 'axios'
import util from '../libs/util'

axios.defaults.timeout = 40000
axios.defaults.withCredentials = false

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    return response.data;
})

//Ai的API根路径
let aiApi = util.apiPath
//中间层的API根路径
let bffApi = util.bffApiPath
/**
 * 获取业务列表
 * @param {*} params 
 */
axios.reqGetBizList = (params) => {
    return axios.get(`${aiApi}/biz/list`, { params: params })
}
/**
 * 项目基本信息
 */
axios.reqGetProjectInfo = (params) => {
    return axios.get(`${aiApi}/system/projectInfo`, { params: params })
}

/**
 * 获取参数配置信息
 * @param {*} name 
 */
axios.reqGetConfigByName = (name) => axios.get(`${aiApi}/sysConfig/queryOneByName/${name}`)

/**
 * 获取瑞金业务分析大屏页面的数据
 */
axios.reqGetRjBizAnalyseData = (bizId)=> axios.get(`${aiApi}/strategy/bigScreen/data/H?bizId=${bizId}`)

/**
 * 获取瑞金网络拓扑大屏页面的数据
 */
axios.reqGetRjTopoData = () => {
    return axios.get(`${bffApi}/bigScreen/rjTopo`)
}

export default axios

