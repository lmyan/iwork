export default {
    SET_BIZLIST:(state,data) => {
        state.bizList = data
    },
    SET_BIZDATA:(state,data) => {
        state.bizId = data.id
        state.bizName = data.name
        state.allStamp = data.stamp
        state.aBlock = data.A
        state.bBlock = data.B
        state.cBlock = data.C
        state.dBlock = data.D
        state.eBlock = data.E
        state.fBlock = data.F
        state.events = data.events
    },
    SET_SLIDE:(state) => {
        state.slideChange = !state.slideChange
    },
    SET_PROJECT_INFO: (state, data) => {
        state.projectInfo = data
    },
    SET_LASTEST_APDEX: (state, data) => {
        state.lastestApdexMap.set(data.bizId, data.apdexVal)
    },
    SET_NET_COLLECT_DTAT: (state, data)=>{
        state.networkCollectData = data
    }
} 