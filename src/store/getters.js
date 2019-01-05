export default {
    bizMap: state => {
        let map = {}
        state.bizList.forEach(item => {
            map[item.id] = item
        })
        return map
    },
    userCode: state => state.projectInfo ? state.projectInfo['user_code'] : 'default',
    projectUser: state => state.projectInfo ? state.projectInfo['project_name'] : '卫盾BPC',
    version: state => state.projectInfo ? state.projectInfo['version'] : '-'
}