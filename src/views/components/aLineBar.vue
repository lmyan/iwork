<template>
    <div style="width:100%;height:100%;" :id="chartId"></div>
</template>

<script>
import echarts from 'echarts'

export default {
    name: 'aLineBar',
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
           var aLineBar = echarts.init(document.getElementById(this.chartId));
            let dataA = this.data[0]
            let dataB = this.data[1]
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: [dataA.name,dataB.name],
                    formatter: function (name) {
                        if (name === dataA.name)
                        return name //+ '（' + dataA.unit + '）'
                        else return name  //+ '（' + dataB.unit + '）'
                    },
                    x: 'center', //原right
                    y:5,//原本22
                    itemWidth:15,
                    itemHeight:5,
                    textStyle:{
                        color:'#fff',
                        fontSize:10
                    }
                },
                grid: {
                    top: '30%',
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
                    },
                    axisLabel:{
                        formatter: function(value){
                            if(value>=1000) return value/1000 + 'K'
                            else return value
                        }
                    }
                }, {
                    name : dataB.unit,
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
                    },
                    axisLabel:{
                        formatter: function(value){
                            if(value>=1000) return value/1000 + 'K'
                            else return value
                        }
                    }
                }],
                series: [
                    {
                    name: dataA.name,
                    type: dataA.chartType,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 8,
                            color: dataA.color
                            }
                        },
                        data: dataA.value
                    },
                    {
                        name: dataB.name,
                        type: dataB.chartType,
                        yAxisIndex:1,
                        itemStyle: {
                        normal: {
                            barBorderRadius: 8,
                            color: dataB.color
                            }
                        },
                        data:dataB.value
                    }
                ]
            };
            aLineBar.clear();
            aLineBar.setOption(option,true);
            window.addEventListener('resize', function () {
                aLineBar.resize();
            });
        }
    },
    mounted () {
        this.drawChart()
    }
};
</script>
