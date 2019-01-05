<template>
    <div style="width:100%;height:100%;" :id="chartId"></div>
</template>

<script>
import echarts from 'echarts'

export default {
    name: 'bLineBar',
    props:{
        bizId:String,
        chartId:String,
        name:String,
        data:Array,
        stamp:Array
    },
    watch:{
        bizId: {
            handler: function (val, oldVal) {
                if(val!=oldVal){
                    this.drawChart()
                }
            },
            deep: true
        },
    },
    methods:{
        drawChart(){
            var bLineBar = echarts.init(document.getElementById(this.chartId));
            let dataA = this.data[0]
            const option = {
                title: {
                  /*  text: this.name,
                    x: 'center',
                    // y: 0,
                    textStyle:{
                        color:'#fff',
                        fontSize:12,
                    }*/
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },

                legend: {
                    data: [dataA.name],
                    formatter: function (name) {
                        return name //+ '（' + dataA.unit + '）'
                    },
                    x: 'center',//原right
                    y:5,//25
                    itemWidth:15,
                    itemHeight:5,
                    textStyle:{
                        color:'#fff',
                        fontSize:10
                    }
                },
                grid: {
                    top: '25%',
                    left: '0%',
                    right: '0%',
                    bottom: '0%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: this.stamp,
                    axisTick: {
                        show: false
                    },

                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,.5)'
                        }
                    },
                    axisLabel:{
                        formatter: function(value){
                            let arr = value.split(' ')
                            return arr[1]
                        }
                    }
                }],
                yAxis:[ {
                    name : dataA.unit,
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: ['#39506f'],

                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,.5)'
                        }
                    }
                }],
                series: [
                    {
                    name: dataA.name,
                    type: dataA.chartType,
                    // barWidth: '35%',
                    // stack: '总量',
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba'+dataA.color.substring(3,dataA.color.length-1) + ',0.5)'
                            }, {
                                offset: 1,
                                color: 'rgba'+dataA.color.substring(3,dataA.color.length-1) + ',0.05)'
                            }], false)
                        }
                    },
                    itemStyle: {
                        normal: {
                            barBorderRadius: 8,
                            color: dataA.color
                            }
                        },
                        data: dataA.value
                    }
                ]
            };
            bLineBar.clear();
            bLineBar.setOption(option,true);
            window.addEventListener('resize', function () {
                bLineBar.resize();
            });
        }
    },
    mounted () {
        this.drawChart()
    }
};
</script>
