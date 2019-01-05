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
            default:0
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
        detectionData(val) {
            let colorRed = 'rgb(204,32,56)' //红
            var colorYel = 'rgb(232,203,43)'//黄
            var colorBlue = 'rgb(32,169,9)' //绿
            if(this.unit==='RH'){//温湿度
                //45%rH~55%rH=绿色 30%rH~44%rH和55%rH~60%rH=黄色 其它红色
                if(val>=45&&val<=55)return colorBlue
                if((val>=30&&val<=44)||(val>55&&val<=60))return colorYel
                return colorRed
            }else if(this.unit==='°C'){//温度
                //以20℃为基准， ±3℃=绿色 ±超过3℃但不超过6℃=黄色 其它=红色
                let abs = Math.abs(20-val)
                if(abs<=3)return colorBlue
                if(abs<=6&&abs>3) return colorYel
                return colorRed
            }
        },
        drawChart(){
            let aGauge = echarts.init(document.getElementById(this.chartId));
            const option = {
                title: {
                    text: this.data==-1?'--': (this.data + this.unit),
                    x: '48%',
                    y: '32%',
                    textAlign: "center",
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 12,
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
                            // color:'rgba(255, 255, 255, 0.5)',
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
