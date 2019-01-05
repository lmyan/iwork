<template lang='pug'>
    .bodyDiv
        .toolbar
            span.mr50(@click="pickPre(currentYear,currentMonth)")
                Icon.pointer(type='chevron-left')
            b {{ currentYear }} 年 {{ currentMonth }} 月
            span.ml50(@click="pickNext(currentYear,currentMonth)")
                Icon.pointer(type='chevron-right')
        ul.weekdays
            li 一
            li 二
            li 三
            li 四
            li 五
            li 六
            li 日
        ul.days(v-for="(value,index1) in daysUL" :key="index1")
            li(@click="pick(day)" v-for="(day, index) in value" :class="[{'active': isToday(day)}]" :key="index")
                span.fs15(:class="{'other-month': day.getMonth()+1 != currentMonth}") {{ day.getDate() }}
                p.tip
                    b(:class="getClassByEvent(day)")
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: "customCalendar",
  props: [],
  computed: {
  },
  data() {
    return {
      currentYear: 1970, // 年份
      currentMonth: 1, // 月份
      firstWeek: 1,
      days: [],
      daysUL: [],
      selectedBizMinApdexMap: null,
      selectedEventHistory: null,
    };
  },
  created() {
    this.initData(this.selectDay)
  },
  methods: {
    initMinApdex(bizId){
        if(bizId&&this.minApdex){
            this.selectedBizMinApdexMap = this.minApdex[bizId]
        }
    },
    getClassByEvent(){
        return 'bg_error'
    },
    hasTargetEvent(day, severity){
        let ret = false
        return ret
    },
    isToday(day){
        return day.format('yyyy-mm-dd') == new Date().format('yyyy-mm-dd')
    },
    isSelected(day){
        return false
    },
    //格式化日期
    formatDate(year, month, day) {
      const y = year;
      let m = month;
      if (m < 10) m = `0${m}`;
      let d = day;
      if (d < 10) d = `0${d}`;
      return `${y}-${m}-${d}`;
    },
    initData(cur) {
      let date = "";
      if (cur) {
        date = new Date(cur);
      } else {
        date = new Date();
      }
      this.currentYear = date.getFullYear(); // 当前年份
      this.currentMonth = date.getMonth() + 1; // 当前月份
      //当前月的第一天是星期几
      date.setDate(1);
      this.firstWeek = date.getDay();
      if (this.firstWeek === 0) {
        this.firstWeek = 7;
      }
      const str = this.formatDate(this.currentYear, this.currentMonth, 1); // 今日日期 年-月-日
      this.days.length = 0;
      // 今天是周日，放在第一行第7个位置，前面6个 这里默认显示一周，如果需要显示一个月，则第二个循环为 i<= 42- this.firstWeek
      for (let i = this.firstWeek - 1; i >= 0; i -= 1) {
        const d = new Date(str);
        d.setDate(d.getDate() - i);
        this.days.push(d);
      }
      //处理1号是星期天为 7 的情况， 为7天就直接放在daysUL里
      if (this.days.length % 7 === 0) {
        this.daysUL.push(this.days);
        this.days = [];
      }
      for (let i = 1; i <= 42 - this.firstWeek; i += 1) {
        const d = new Date(str);
        d.setDate(d.getDate() + i);
        this.days.push(d); //一个 days 就是一行7天  daysUL 就是个数组，里面有六个days  就是六行42天
        if (this.days.length % 7 === 0) {
          this.daysUL.push(this.days);
          this.days = []; //清空重新存放天数
        }
      }
    },
    // 上一個月   传入当前年份和月份
    pickPre(year, month) {
      this.daysUL = [];
      const d = new Date(this.formatDate(year, month, 1));
      d.setDate(0);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    // 下一個月   传入当前年份和月份
    pickNext(year, month) {
      this.daysUL = [];
      const d = new Date(this.formatDate(year, month, 1));
      d.setDate(42);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
      //当点击下个月的时候，才会去拿该月的休息或者工作日的日期，而不是一下子都拿出来
    },
    returnNow() {
      this.daysUL = [];
      this.initData(null);
    },
    // 当前选择日期
    pick(date) {
      let dateStr = date.format('yyyy-mm-dd')
      if(dateStr!==this.selectDay){
          this.$emit('on-change', dateStr)
      }
    },
  }
};
</script>
<style scoped lang='less'>
@import url(../../assets/css/var.less);
.bodyDiv{
    position: relative;
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: #fff;
    .toolbar {
        text-align: center;
        padding: 10px;
        color: @TextA;
    }
    .weekdays {
        display: flex;
        li {
            flex: 1;
            list-style-type: none;
            text-align: center;
            cursor: pointer;
            padding: 10px;
            color: @TitleColor;
            &:nth-last-child(1),
            &:nth-last-child(2){
                color: @Warning;
            }
        }
    }
    .days {
        display: flex;
        li {
            flex: 1;
            list-style-type: none;
            text-align: center;
            cursor: pointer;
            padding: 2px;
            span {
                color: @TitleColor;
                font-size: 18px;
                &:hover{
                    color: @Primary;
                }
            }
            span.other-month {
                color: #999;
            }
            &:hover,
            &.selected {
                background-color: @BgA;
                span {
                    color: @TextW;
                }
            }
            &.active {
                background-color: @TextD;
                span{
                    color: @TextW;
                }
            }
            p.tip{
                i {
                    font-size: 12px;
                    color: @SubColor;
                }
                b {
                    display: inline-block;
                    width: 5px;
                    height: 5px;
                    border-radius: 100%;
                }
            }
        }
    }
}
</style>