<template>
    <div style="width:100%;height:100%;" id="performance_line"></div>
</template>

<script>
import echarts from 'echarts'
import util from '../../libs/util'

//此组件为中间性能指数
export default {
    name: 'performanceLine',
    props:{
        id:String,
        name:String,
        data:Array,
        stamp:Array,
        events: Array,
    },
    watch:{
        data: {
            handler: function (val, oldVal) {
                if(val!=oldVal){
                    this.drawChart()
                }
            },
            deep: false
        },
    },
    computed: {
        eventsTimeArr(){
            let ret = this.events.filter(item=>item['severity']==3)
            return ret.map(ele=>util.getTime_round5Min_str(ele['timeFull'], 'mm-dd hh:ii'))
        },
        eventPointIndex(){
            let ret = []
            this.eventsTimeArr.forEach(e=>{
                let index = this.stamp.indexOf(e)
                if(index>=0){
                    ret.push(index)
                }
            })
            return ret
        }
    },
    methods:{
        getSeriesData(dataValue){
            let value = []
            for (let i = 0; i < dataValue.length; i++) {
                let eventDataFlag = this.eventPointIndex.indexOf(i)>=0
                value.push({
                    value: dataValue[i]<=0?(i>0?dataValue[i-1]: 100): dataValue[i],
                    symbolSize: eventDataFlag ? 3 : 1,
                    symbol: "circle",
                    itemStyle: {
                        normal: {
                            color: eventDataFlag? "#FF0000" : "#2d8cf0"
                        }
                    }
                })
            }
            return value
        },
        drawChart(){
           var performanceLine = echarts.init(document.getElementById('performance_line'));
            const option = {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    data: this.stamp,
                    axisLine: { //设置X轴的颜色
                        lineStyle: {
                            color: '#505c6a'
                        }
                    },
                    axisLabel:{
                        formatter: function(value){
                            let arr = value.split(' ')
                            return arr[1]
                        }
                    }
                },
                grid:{
                    right:0,
                },
                yAxis: {
                    type: 'value',
                    splitLine: { //设置Y轴的网格
                        show: true,
                        interval: 'auto',
                        lineStyle: {
                            color: 'rgba(80,92,106,0.5)'
                        }
                    },
                    axisLine: { //设置y轴的颜色
                        lineStyle: {
                            color: '#505c6a'
                        },
                        show:false
                    },
                    min: 0,
                    max:100
                },

                series: [{
                    name: '性能指数',
                    type: 'line',
                    smooth: true,
                    showSymbol: true,
                    showAllSymbol: true,
                    itemStyle: {    //设置折线的border颜色
                        normal: {
                            color: 'rgb(0,211,255)',
                            borderColor: 'rgba(0,211,255,0.2)',
                            borderWidth: 5
                        }
                    },
                    label: { //设置点数据的提示
                        normal: {
                            show: false,
                            position: 'top',
                            color:'rgba(255,255,255,.8)'
                        }
                    },
                    data: this.getSeriesData(this.data),
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(199, 237, 250,0.3)'
                            }, {
                                offset: 1,
                                color: 'rgba(199, 237, 250,0.02)'
                            }], false)
                        }
                    },
                    markPoint: {
                        data: [
                            {
                                type: 'min',
                                name: '最小值',
                                itemStyle: {
                                    normal: {
                                        color: '#bc951e',
                                    }
                                }
                            }
                        ]
                    }

                }]
            };
            performanceLine.clear();
            performanceLine.setOption(option,true);
            window.addEventListener('resize', function () {
                performanceLine.resize();
            });
        }
    },
    mounted () {
        this.drawChart()
    }
};
</script>
