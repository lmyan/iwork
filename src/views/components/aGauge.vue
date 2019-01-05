<template>
    <div style="width:100%;height:100%;" :id="chartId"></div>
</template>

<script>
import echarts from 'echarts'

export default {
    name: 'aGauge',
    props:{
        chartId:String,
        data:{
            type:Number,
            default:90
        },
        unit:{
            type:String,
            default:'°C'
        }
    },
    watch:{
        data: {
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
            let color = 'rgb(204,32,56)'
            if (str >= 30 && str <= 60) {
                color = 'rgb(232,203,43)'
            } else if (str > 60) {
                color = 'rgb(32,169,9)'
            }
            return color;
        },
        drawChart(){
            let aGauge = echarts.init(document.getElementById(this.chartId));
            const option = {
                title: {
                    text:this.data + this.unit,
                    x: '48%',
                    y: '35%',
                    textAlign: "center",
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 20,
                        color:'rgba(255, 255, 255, 0.8)'
                    },
                    // subtext: '温度',
                    // subtextStyle: {
                    //     fontWeight: 'bold',
                    //     fontSize: 14,
                    //     color: 'rgba(255, 255, 255, 0.8)',
                    // }
                },
                series: [ 
                    {
                        name: ' ',
                        type: 'pie',
                        radius: ['60%', '75%'],
                        avoidLabelOverlap: false,
                        startAngle: 225,
                        color: ['rgba(4, 32, 69, 1)', 'transparent'],
                        hoverAnimation: false,
                        legendHoverLink: false,
                        itemStyle:{
                            shadowColor: 'rgba(1, 185, 255, 0.8)',
                            shadowBlur: 10
                        },
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [{
                            value: 75,
                            name: '1'
                        }, {
                            value: 25,
                            name: '2'
                        }]
                    }, 
                    {
                        name: '',
                        type: 'pie',
                        radius: ['64%', '71%'],
                        avoidLabelOverlap: false,
                        startAngle: 225,
                        color: [ this.detectionData(this.data),"transparent"],
                        hoverAnimation: false,
                        legendHoverLink: false,
                        clockwise: true,
                        itemStyle:{
                            normal:{
                                borderColor:'transparent',
                                borderWidth:20
                            },
                            emphasis:{
                                borderColor:'transparent',
                                borderWidth:20
                            }
                        }
                        ,
                        z:10,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                            {
                                name: '',
                                value:this.data*270/360
                            }, {
                                name: '',
                                value: (100 - this.data*270/360),
                            }
                        ]
                    }

                ]
            };
            aGauge.clear();
            aGauge.setOption(option,true);
            window.addEventListener('resize', function () {
                aGauge.resize();
            });
            
        }
    },
    mounted () {
        this.drawChart()
    }
};
</script>
