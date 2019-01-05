# 瑞金医院大屏展示数据格式要求

> 数据接口，数据请求规则

## 1、业务列表

### 请求地址：http://demo.v-dun.com:8062/biz/list

``` bash
# 数据返回示例
{
    "code":0,
    "msg":"成功",
    "data":[
        {
            "id":111,
            "name":"HIS业务"
        }, 
        {
            "id":112,
            "name":"LIS业务"
        }
    ]
}
```
## 2、单业务数据

### 请求地址：http://demo.v-dun.com:8062/biz?id=111  接受参数id

``` bash
# 数据返回示例
{
    "code":0,
    "msg":"成功",
    "data":{
        "id":111,
        "name":"HIS业务",
        "performanceIndex":{
            "title":"性能指数",
            "stamp":[
                "2018-02-04 15:20","2018-02-04 15:25","2018-02-04 15:30"......
            ],
            "value":[
                99.35,99.35,100........
            ]
        },
        "equipments":{
            "cpuOpt":{
                "name":'CPU利用率',
                "id":'cpuPie',
                "now":95,
                "last":90
            },
            "ramOpt":{
                "name":'内存利用率',             
                "id":'ramPie',
                "now":60,
                "last":45
            },
            "diskOpt":{
                "name":'磁盘利用率',             
                "id":'diskPie',
                "now":30,
                "last":25
            }
        },
        "network":{
            "traffic":{
                "title":"网络流量与响应时间",
                "id":"traffic",
                "stamp":[
                    "15:20","15:25","15:30"......
                ],
                "data":[
                    {
                        "name":"网络流量",
                        "unit":"M",
                        "value":[
                            500,600,300.....
                        ]
                    },
                    {
                        "name":"响应时间",
                        "unit":"S",
                        "value":[
                            1,0.2,0.3.....
                        ]
                    }
                ]
            },
            "diskTime":{
                "title":"磁盘响应时间",
                "id":"diskTime",
                "stamp":[
                    "15:20","15:25","15:30"......
                ],
                "data":[
                    {
                        "name":"磁盘响应时间",
                        "unit":"S",
                        "value":[
                            1,0.2,0.3.....
                        ]
                    }
                ]
            },
            "quanity":{
                "title":"网络访问数与客户端数",
                "id":"quanity",
                "stamp":[
                    "15:20","15:25","15:30"......
                ],
                "data":[
                    {
                        "name":"网络访问数",
                        "unit":"次",
                        "value":[
                            500,600,300.....
                        ]
                    },
                    {
                        "name":"客户端数",
                        "unit":"个",
                        "value":[
                            108,222,158.....
                        ]
                    }
                ]
            },
        }，
        "database":{
            "inquire":{
                "title":"大查询次数与缓存命中率",
                "id":"inquire",
                "stamp":[
                    "15:20","15:25","15:30"......
                ],
                "data":[
                    {
                        "name":"大查询次数",
                        "unit":"次",
                        "value":[
                            50,60,30.....
                        ]
                    },
                    {
                        "name":"缓存命中率",
                        "unit":"%",
                        "value":[
                            50,80,90.....
                        ]
                    }
                ]
            },
            "block":{
                "title":"锁阻塞数",
                "id":"block",
                "stamp":[
                    "15:20","15:25","15:30"......
                ],
                "data":[
                    {
                        "name":"锁阻塞数",
                        "unit":"个",
                        "value":[
                            1,3,3.....
                        ]
                    }
                ]
            },
            "access":{
                "title":"总访问次数与响应时间",
                "id":"access",
                "stamp":[
                    "15:20","15:25","15:30"......
                ],
                "data":[
                    {
                        "name":"总访问次数",
                        "unit":"次",
                        "value":[
                            500,600,300.....
                        ]
                    },
                    {
                        "name":"响应时间",
                        "unit":"S",
                        "value":[
                            0.2,0.5,0.1.....
                        ]
                    }
                ]
            }
        }
    }
}
```
## 3、终端响应时间

### 请求地址：http://demo.v-dun.com:8062/biz/terminal

``` bash
# 数据返回示例
{
    "code":0,
    "msg":"成功",
    "data":{
        "title":"终端响应时间",
        "id":"terminal",
        "stamp":[
            "15:20","15:25","15:30"......
        ],
        "data":[
            {
                "name":"急诊大楼",
                "value":[
                    0.2,0.5,0.1.....
                ]
            }, 
            {
                "name":"病房",
                "value":[
                    0.2,0.5,0.1.....
                ]
            }, 
            {
                "name":"行政楼",
                "value":[
                    0.2,0.5,0.1.....
                ]
            }, 
            {
                "name":"医生宿舍",
                "value":[
                    0.2,0.5,0.1.....
                ]
            }, 

        ]
    }
}
```
## 4、事件列表

### 请求地址：http://demo.v-dun.com:8062/biz/event

``` bash
# 数据返回示例
{
    "code":0,
    "msg":"成功",
    "data":[
        {
            "id":1,
            "type":"业务卡慢",
            "title":"重要终端性能指数下降"
        },
        {
            "id":2,
            "type":"业务卡慢",
            "title":"重要终端性能指数下降"
        },
        {
            "id":3,
            "type":"业务卡慢",
            "title":"重要终端性能指数下降"
        },
    ]
}
```
20180308 BY 易.
