<template>
    <div style="width:100%;height:100%" id="home_page_map"></div>
</template>

<script>
import echarts from 'echarts'

export default {
    name: 'homeMap',
    data(){
        return{
            geoData:{
                '综合楼': [99.5, 33.5],
                // '综合楼': [102, 31],
                '信息中心': [115.5, 46.8],
                '门诊楼': [110, 28]
            },
            cityData:[ {
                name: '综合楼',
                value: 66
            }, {
                name: '信息中心',
                value: 59
            }, {
                name: '门诊楼',
                value: 56
            }]
        }
    },
    methods:{
        formtGCData(geoData, data, srcNam, dest) {
            let tGeoDt = [];
    
                for (let i = 0, len = data.length; i < len; i++) {
                    if (srcNam != data[i].name) {
                        tGeoDt.push({
                            coords: [geoData[srcNam],geoData[data[i].name]]
                        })
                    }
                }
    
            return tGeoDt
        },
        formtVData(geoData, data, srcNam) {
            let tGeoDt = [];
            for (let i = 0, len = data.length; i < len; i++) {
                let tNam = data[i].name
                let tValue = data[i].value
                if (srcNam != tNam) {
                    tGeoDt.push({
                        name: tNam,
                        value: geoData[tNam],
                        alarm: tValue
                    })
                }

            }

            tGeoDt.push({
                name: srcNam,
                value: geoData[srcNam]
            })
            return tGeoDt
        },
        drawChart(){
            let map = echarts.init(document.getElementById('home_page_map'))
            const chinaJson = require('./china.json')
            echarts.registerMap('china', chinaJson)
            map.setOption({
                // backgroundColor: false,
                geo: {
                    map: 'china',
                    show: true,
                    roam: false,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    zoom:1.56,
                    itemStyle: {
                        normal: {
                            areaColor: 'rgba(255,255,255,0)',
                            borderColor: 'rgba(255,255,255,0)'
                        },
                        emphasis: {
                            areaColor: 'rgba(255,255,255,0)',
                        }
                    }
                },
                series: [
                    {
                        type: 'lines',
                        zlevel: 1,
                        effect: {
                            show: true,
                            period:5,
                            trailLength: 0.1,
                            color: 'rgba(255,255,0,.8)',
                            symbol: 'arrow',
                            symbolSize: 10
                        },
                        lineStyle: {
                            normal: {
                                color: 'rgba(255,255,0,0.2)',
                                width: 2,
                                opacity: 0.5,
                                curveness: 0.15
                            }
                        },
                        data: this.formtGCData(this.geoData, this.cityData, '信息中心', true)
                    },
                    {
                        type: 'lines',
                        zlevel: 1,
                        effect: {
                            show: true,
                            period: 5,
                            trailLength: 0.1,
                            color: 'rgba(255,255,0,.8)',
                            symbol: 'arrow',
                            symbolSize: 10
                        },
                        lineStyle: {
                            normal: {
                                color: 'rgba(255,255,0,0.2)',
                                width: 2,
                                opacity: 0.5,
                                curveness: 0.15
                            }
                        },
                        data: this.formtGCData(this.geoData, this.cityData,'门诊楼',true)
                    },
                    {
                        type: 'lines',
                        zlevel: 1,
                        effect: {
                            show: true,
                            period: 5,
                            trailLength: 0.1,
                            color: 'rgba(255,255,0,.8)',
                            symbol: 'arrow',
                            symbolSize: 10
                        },
                        lineStyle: {
                            normal: {
                                color: 'rgba(255,255,0,0.2)',
                                width: 2,
                                opacity: 0.5,
                                curveness: 0.15
                            }
                        },
                        data: this.formtGCData(this.geoData, this.cityData,'综合楼',true)
                    },
                    {

                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        rippleEffect: {
                            show: true,
                            period: 4,
                            scale: 4,
                            brushType: 'stroke',
                            shadowBlur: 10
                        },
                        label: {
                            normal: {
                                show: false,
                                position: 'right',
                                formatter: '   {b}',
                                textStyle:{
                                    fontWeight:700
                                }
                            }
                        },
                        symbolSize: 25,
                        itemStyle: {
                            normal: {
                                color: 'rgba(255,255,0,.7)',
                                // color:function(params){
                                //     let alarm = params.data.alarm
                                //     if (alarm > 10) return 'rgba(255,227,254,.2)'
                                //     else return 'rgba(239,63,73,.5)'
                                // }
                            }
                        },

                        data: this.formtVData(this.geoData, this.cityData, '信息中心')
                    }
                ]
            })
            window.addEventListener('resize', function () {
                map.resize();
            });
        }
    },
    mounted () {
        this.drawChart()
    }
};
</script>


