<template>
    <div style="width:100%;height:100%;" :id="chartId"></div>
</template>

<script>
import echarts from 'echarts'

export default {
    name: 'doublePie',
    props:{
        chartId:String,
        bizId:String,
        now:Number,
        last:Number

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
        detectionData(str) {
            var color = new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                offset: 0,
                color: 'rgba(27, 252,244, 1)'
                }, {
                offset: 0.5,
                color: 'rgba(21, 202,127, 1)'
                }, {
                offset:1,
                color: 'rgba(215, 234,119, 1)'
                }]);
            if (str >= 30 && str <= 60) {
            color =  new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                offset: 0,
                color: 'rgba(27, 252,244, 1)'
                }, {
                offset: 0.5,
                color: 'rgba(21, 202,127, 1)'
                }, {
                offset:1,
                color: 'rgba(215, 234,119, 1)'
                }]);
            } else if (str > 60) {
            color = new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                offset: 0,
                color: 'rgba(27, 252,244, 1)'
                }, {
                offset: 0.5,
                color: 'rgba(215, 234,119, 1)'
                }, {
                offset:1,
                color: 'rgba(235, 62,52, 1)'
                }]);
            }
            return color;
        },
        drawChart(){
            var doublePie = echarts.init(document.getElementById(this.chartId));
            const option = {
                series: [{
                    name: "big",
                    type: "gauge",
                    radius:'90%',
                    splitNumber:30,
                    startAngle:210,
                    endAngle:-30,
                    min:0,
                    max:100,
                    axisLine: {
                        lineStyle: {
                            color: [
                                [this.now / 100, this.detectionData(this.now)],
                                [1, "transparent"]
                            ],
                            width: 8
                        },
                        
                    },
                    axisTick: {
                        lineStyle: {
                            color:'#ccc',
                            width: 1
                        },
                        length: 8,
                        splitNumber:1
                    },
                    pointer: {           // 分隔线
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 5,
                        show:false
                    },
                    axisLabel: {
                        show:false,
                    },
                    splitLine: {
                        show: false
                    },
                    detail: {
                        formatter: "{value}%",
                        offsetCenter: [0, "20%"],
                        fontSize: 25,
                        color: '#fff'
                    },
                    title: {
                        offsetCenter: [0, "-30%"],
                        show:true,
                        color: '#fff',
                        fontSize: 16
                    },
                    data: [{
                        value: this.now,
                        name: '当前'
                    }]
                },{
                    name: "small",
                    type: "gauge",
                    radius:'60%',
                    center:['15%','55%'],
                    splitNumber:20,
                    startAngle:210,
                    endAngle:30,
                    min:0,
                    max:100,
                    axisLine: {
                        lineStyle: {
                            color: [
                                [this.last / 100, this.detectionData(this.last)],
                                [1, "transparent"]
                            ],
                            width: 6
                        },
                        
                    },
                    axisTick: {
                        lineStyle: {
                            color:'#ccc',
                            width: 1
                        },
                        length: 6,
                        splitNumber:1
                    },
                    pointer: {           // 分隔线
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 5,
                        show:false
                    },
                    axisLabel: {
                        show:false,
                    },
                    splitLine: {
                        show: false
                    },
                    detail: {
                        formatter: "{value}%",
                        offsetCenter: [0, "20%"],
                        fontSize: 20,
                        color: 'rgba(255,255,255,.7)'
                    },
                    title: {
                        offsetCenter: [0, "-40%"],
                        show:true,
                        color: 'rgba(255,255,255,.7)',
                        fontSize: 10
                    },
                    data: [{
                        value: this.last,
                        name: '昨日最大'
                    }]
                }]
            };
            doublePie.clear();
            doublePie.setOption(option,true);
            window.addEventListener('resize', function () {
                doublePie.resize();
            });
        }
    },
    mounted () {
        this.drawChart()
    }
};
</script>
