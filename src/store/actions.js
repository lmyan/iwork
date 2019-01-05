import Vue from 'vue'
import api from '../api/index.js'

export default {
    //网络分析相关汇总数据
    async getNetworkCollectData({commit}){
        let res = await api.reqGetRjTopoData()
        if(res.code===0){
            commit('SET_NET_COLLECT_DTAT', res.data)
            return res.data
        }
    },
    //获取业务列表
    async getBizList ({ commit }) {
        let res = null
        try {
            let excluBizObj = await api.reqGetConfigByName('bigScreenH_NotShow_Biz_Id')
            res = await api.reqGetBizList()
            if (excluBizObj.code===0&&res.code === 0) {
                let excluBizIdArr = []
                if(excluBizObj.data.value){
                    excluBizObj.data.value.split(",").forEach(ele=>{
                        excluBizIdArr.push(parseInt(ele))
                    })
                }
                let data = res.data.filter(ele=>{
                    return !excluBizIdArr.contains(ele.id)
                })
                commit('SET_BIZLIST', data)
                localStorage.setItem('bizList', JSON.stringify(data))
            }
        } catch (e) {
            console.error(e)
        }
        return res
    },
    //获取单业务数据
    async getBizData ({ state,commit,getters },id) {
        let res = null
        let value = state.bizDataMap.get(id)
        if(value){//如果被缓存过
            if((new Date().getTime() - value.timeStamp)<=300000){//5分钟内，不需要从服务器取数据
                res = value.res
            }
        }
        if(!res){//需要重新从服务器加载数据
            try {
                res = await api.reqGetRjBizAnalyseData(id)
            } catch (e) {
                console.error(e)
            }
            //从服务器获取数据发生异常时
            if(!res || res.code !== 0){
                //先用之前缓存过的数据
                if(value&&value.res){
                    res = value.res
                }else{
                    res = Vue.mock.createSingleBizData(id, true, getters.bizMap[id])
                }
            }
            //缓存数据
            state.bizDataMap.set(id, {
                timeStamp: new Date().getTime(),
                res
            })
        }
        commit('SET_BIZDATA', res.data)
        commit('SET_LASTEST_APDEX', {
            bizId: id,
            apdexVal: res.data.A.value
        })
        return res
    },
    /**
     * 获取项目基本信息
     * @param {} param0 
     */
    async getProjectInfo({commit}){
        let res = await api.reqGetProjectInfo()
        if(res&&res.code===0){
            commit('SET_PROJECT_INFO', res.data)
        }
        return res
    }, 
    //设置切换状态
    async setSlide ({ commit }) {
        try {
            commit('SET_SLIDE')
        } catch (e) {
            console.error(e)
        }
    },
}
