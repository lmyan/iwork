<template>
    <div style="width:100%;height:100%;" :id="chartId"></div>
</template>

<script>
import echarts from "echarts"
import util from '@/libs/util'

export default {
  name: "performancePie",
  data() {
    return {};
  },
  props: {
    chartId: String,
    data: {
      type: Number,
      default: 100
    },
    stamp: String
  },
  computed: {
    percent() {
      return this.data / 100;
    }
  },
  watch: {
    data(val){
      this.drawChart();
    }
  },
  methods: {
    getData() {
      return [
        {
          value: this.percent,
          itemStyle: {
            normal: {
              color: this.detectionData(this.data),
              shadowBlur: 10,
              shadowColor: this.detectionData(this.data)
            }
          }
        },
        {
          value: 1 - this.percent,
          itemStyle: {
            normal: {
              color: "transparent"
            }
          }
        }
      ];
    },
    detectionData(val) {
      return util.getColorByApdex(val)
    },
    drawChart() {
      let performancePie = echarts.init(document.getElementById(this.chartId));
      const option = {
        title: {
          text: (this.percent * 100).toFixed(0) + "分",
          x: "center",
          y: "center",
          textStyle: {
            color: "rgba(255,255,255,.8)",
            fontWeight: "bolder",
            fontSize: 38
          }
        },
        series: [
          {
            type: "pie",
            radius: ["39%", "49%"],
            silent: true,
            label: {
              normal: {
                show: false
              }
            },

            data: [
              {
                value: 1,
                itemStyle: {
                  normal: {
                    color: "rgba(10,56,81,.3)",
                    shadowBlur: 50,
                    shadowColor: "rgba(33,87,116,.3)"
                  }
                }
              }
            ],

            animation: false
          },
          {
            name: "main",
            type: "pie",
            radius: ["50%", "58%"],
            label: {
              normal: {
                show: false
              }
            },
            data: this.getData(),

            animationEasingUpdate: "cubicInOut",
            animationDurationUpdate: 500
          }
        ]
      };
      performancePie.clear();
      performancePie.setOption(option, true);
      window.addEventListener("resize", function() {
        performancePie.resize();
      });
    }
  },
  mounted() {
    this.drawChart();
  }
};
</script>
