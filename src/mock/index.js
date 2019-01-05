import axios from 'axios'
import Mock from 'mockjs'
import MockAdapter from 'axios-mock-adapter'
import util from '../libs/util'

let createRandomIntegerArr = (len = 0, start = 80, end = 100) => {
    let vArr = []
    for (let i = 0; i < len; i++) {
        vArr.push(Mock.Random.integer(start, end))
    }
    return vArr
}

let bizArr = [
    { "id": 111, "name": "PACS", },
    { "id": 117, "name": "门急诊HIS", },
    { "id": 118, "name": "住院HIS", },
    // {"id": 113,"name": "EMR",},
    // {"id": 114,"name": "CPOE",}
]

let createSingleBizData = (bizId, isStatic, extParams) => {

    //获取最近12个小时的时间列表
    let stamp = util.getTimeArr()
    let dataAll0 = isStatic ? createRandomIntegerArr(stamp.length, 0, 0) : null

    return {
        "code": 0,
        "msg": "成功",
        "data": {
            "id": bizId,
            "name": isStatic ? extParams.name : (() => {
                let arr = bizArr.filter(item => {
                    return item.id === bizId
                })
                if (arr && arr.length > 0)
                    return arr[0].name
            })(),
            "stamp": stamp,
            "events": [],
            "A": {
                "unit": null,
                "name": "性能评分",
                "stamp": "03-23 17:33",
                "id": Mock.Random.guid(),
                "value": isStatic ? 100 : Mock.Random.integer(89, 100),
            },
            "B": {
                "unit": null,
                "color": "rgb(0,211,255)",
                "name": "性能评分趋势",
                "chartType": "line",
                "id": Mock.Random.guid(),
                "value": isStatic ? createRandomIntegerArr(stamp.length, 100, 100) : createRandomIntegerArr(stamp.length, 89, 100)
            },
            "C": {
                "0": {
                    "unit": "%",
                    "last": isStatic ? 0 : Mock.Random.integer(80, 96),
                    "now": isStatic ? 0 : Mock.Random.integer(10, 80),
                    "name": "CUP利用率",
                    "id": Mock.Random.guid(),
                },
                "1": {
                    "unit": "%",
                    "last": isStatic ? 0 : Mock.Random.integer(40, 50),
                    "now": isStatic ? 0 : Mock.Random.integer(10, 50),
                    "name": "内存利用率",
                    "id": Mock.Random.guid(),
                },
                "2": {
                    "unit": "%",
                    "last": isStatic ? 0 : Mock.Random.integer(50, 66),
                    "now": isStatic ? 0 : Mock.Random.integer(10, 56),
                    "name": "磁盘利用率",
                    "id": Mock.Random.guid(),
                },
                "title": "设备"
            },
            "E": {
                "0": {
                    "data": [
                        {
                            "unit": "Bps",
                            "color": "rgb(122,235,122)",
                            "name": "网络流量",
                            "chartType": "line",
                            "value": isStatic ? dataAll0 : createRandomIntegerArr(stamp.length, 1000, 5000)
                        },
                        {
                            "unit": "ms",
                            "color": "rgb(255,124,92)",
                            "name": "响应时间",
                            "chartType": "line",
                            "value": isStatic ? dataAll0 : createRandomIntegerArr(stamp.length, 89, 100)
                        }
                    ],
                    "id": Mock.Random.guid(),
                    "title": "网络流量、响应时间"
                },
                "1": {
                    "data": [
                        {
                            "unit": "%",
                            "color": "rgb(234,199,61)",
                            "name": "内存利用率",
                            "chartType": "line",
                            "value": isStatic ? dataAll0 : createRandomIntegerArr(stamp.length, 20, 80)
                        },
                        {
                            "unit": "%",
                            "color": "rgb(4,117,147)",
                            "name": "CPU利用率",
                            "chartType": "line",
                            "value": isStatic ? dataAll0 : createRandomIntegerArr(stamp.length, 50, 60)
                        }
                    ],
                    "id": Mock.Random.guid(),
                    "title": "内存和CPU利用率"
                },
                "2": {
                    "data": [
                        {
                            "unit": "个",
                            "color": "rgb(252,139,112)",
                            "name": "网络访问数",
                            "chartType": "line",
                            "value": isStatic ? dataAll0 : createRandomIntegerArr(stamp.length, 100, 600)
                        },
                        {
                            "unit": "个",
                            "color": "rgb(124,124,219)",
                            "name": "客户端数",
                            "chartType": "line",
                            "value": isStatic ? dataAll0 : createRandomIntegerArr(stamp.length, 200, 230)
                        }
                    ],
                    "id": Mock.Random.guid(),
                    "title": "网络访问数、客户端数"
                },
                "title": "网络"
            },
            "F": {
                "0": {
                    "data": [
                        {
                            "unit": "次",
                            "color": "rgb(228,209,117)",
                            "name": "数据库连接数",
                            "chartType": "bar",
                            "value": isStatic ? dataAll0 : createRandomIntegerArr(stamp.length, 200, 270)
                        },
                        {
                            "unit": "%",
                            "color": "rgb(113,245,224)",
                            "name": "缓存命中率",
                            "chartType": "line",
                            "value": isStatic ? dataAll0 : createRandomIntegerArr(stamp.length, 100, 100)
                        }
                    ],
                    "id": Mock.Random.guid(),
                    "title": "数据库连接数、缓存命中率"
                },
                "1": {
                    "data": [
                        {
                            "unit": "个",
                            "color": "rgb(228,69,20)",
                            "name": "锁阻塞数量",
                            "chartType": "bar",
                            "value": isStatic ? dataAll0 : createRandomIntegerArr(stamp.length, 0, 10)
                        }
                    ],
                    "id": Mock.Random.guid(),
                    "title": "锁阻塞数量"
                },
                "2": {
                    "data": [
                        {
                            "unit": "ms",
                            "color": "rgb(255,124,92)",
                            "name": "连接响应时间",
                            "chartType": "line",
                            "value": isStatic ? dataAll0 : createRandomIntegerArr(stamp.length, 900, 1000)
                        },
                        {
                            "unit": "次",
                            "color": "rgb(213,125,237)",
                            "name": "数据库连接数",
                            "chartType": "line",
                            "value": isStatic ? dataAll0 : createRandomIntegerArr(stamp.length, 10, 50)
                        }
                    ],
                    "id": Mock.Random.guid(),
                    "title": "连接响应时间、数据库连接数"
                },
                "title": "数据库"
            },
        }
    }
}

let createDAreaData = () => {

    //获取最近12个小时的时间列表
    let stamp = util.getTimeArr()

    return {
        "code": 0,
        "msg": "成功",
        "data": {
            "data": [
                {
                    "unit": "ms",
                    "color": "rgb(234,199,61)",
                    "name": "急诊楼",
                    "chartType": "line",
                    "value": createRandomIntegerArr(stamp.length, 350, 490)
                },
                {
                    "unit": "ms",
                    "color": "rgb(108,237,231)",
                    "name": "6号楼",
                    "chartType": "line",
                    "value": createRandomIntegerArr(stamp.length, 500, 820)
                },
                {
                    "unit": "ms",
                    "color": "rgb(145,141,250)",
                    "name": "9号楼",
                    "chartType": "line",
                    "value": createRandomIntegerArr(stamp.length, 800, 850)
                },
                {
                    "unit": "ms",
                    "color": "rgb(231,120,94)",
                    "name": "36号楼",
                    "chartType": "line",
                    "value": createRandomIntegerArr(stamp.length, 100, 1000)
                }
            ],
            "stamp": stamp,
            "id": Mock.Random.guid(),
            "title": "终端响应时间"
        }
    }
}

let init = () => {
    let mock = new MockAdapter(axios)

    //业务列表
    mock.onGet(`${util.apiPath}/biz/list`).reply(200, {
        "code": 0,
        "msg": "成功",
        "data": bizArr
    })

    //业务列表
    mock.onGet(`${util.apiPath}/system/projectInfo`).reply(200, {
        "code": 0,
        "msg": "成功",
        data: {
            project_name: "上海卫盾科技",
            user_code: "default",
            version: "2.0.1803.17"
        }
    })

    //单个业务数据
    bizArr.forEach(biz => {
        mock.onGet(`${util.apiPath}/strategy/bigScreen/data/H?bizId=${biz.id}`).reply(200, createSingleBizData(biz.id))
    })

    //D区域的数据
    mock.onGet(`${util.apiPath}/strategy/bigScreen/data/H/D`).reply(200, createDAreaData())
}

export default {
    init,
    createSingleBizData,
    createDAreaData
}