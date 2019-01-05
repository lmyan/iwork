<template>
    <div style="width:100%;height:100%;" :id="id"></div>
</template>

<script>
import echarts from 'echarts'
import util from '../../libs/util'

export default {
    name: 'cLineBar',
    props:{
        id:String,
        bizId: String,
        name:String,
        data:Array,
        stamp:Array
    },
    watch:{
        bizId: {
            handler: function (val, oldVal) {
                if(val!=oldVal){
                    this.drawLine()
                }
            },
            deep: true
        },
    },
    computed: {
        unit(){
            if(this.data&&this.data.length>0){
                return this.data[0]['unit']
            }
        }
    },
    methods:{
        getSeries(data){
            let seires = []
            data.forEach(item=>{
                seires.push({
                    name: item.name,
                    type: item.chartType,
                    smooth: true, 
                    showSymbol: false,
                    itemStyle: {    //设置折线的border颜色
                        normal: {
                            color: item.color,
                            // borderColor: 'rgba(0,211,255,0.2)',
                            borderWidth: 5
                        }
                    },
                    data:item.value
                })
            })
            return seires
        },
        drawLine(){
            var terminalLine = echarts.init(document.getElementById(this.id));
            if (this.data === undefined||this.data.length===0) return
            let series = this.getSeries(this.data)
            let unit = this.unit
            const option = {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data:this.stamp,
                    axisLine: { //设置X轴的颜色
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
                },
                grid:{
                    right:'1%'
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
                            color: 'rgba(255,255,255,.5)'
                        },
                        show:false
                    },
                    axisLabel: {
                        // formatter: function (value, index) {
                        //     return util.getFormattedValue(value, unit)
                        // }
                    }
                },
                series
            };
            terminalLine.clear();
            terminalLine.setOption(option,true);
            window.addEventListener('resize', function () {
                terminalLine.resize();
            });
        }

    },
    mounted () {
        this.drawLine()
    }
};
</script>
