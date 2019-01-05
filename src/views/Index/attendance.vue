<template lang="pug">
    Row#attendance
        Row.collectInfo
            Table(border :columns="attendColumn" :data="attendData")
        Row
          custom-calendar
</template>
<script>

import CustomCalendar from "../components/CustomCalendar.vue";

export default {
  name: "attendance",
  components: {
    CustomCalendar
  },
  data() {
    return {
      attendColumn: [
        { title: "类型", key: "type" },
        { title: "可用", key: "available" },
        { title: "本年度", key: "thisyear" },
        { title: "去年转入", key: "lastyear" },
        { title: "已审批", key: "approved" },
        { title: "审批中", key: "approving" }
      ],
      attendData: [
        {
          type: "年假（天）",
          available: 12,
          thisyear: 4,
          lastyear: 2,
          approved: 1,
          approving: 8
        },
        {
          type: "带薪病假（天）",
          available: 12,
          thisyear: 4,
          lastyear: 2,
          approved: 1,
          approving: 8
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
</style>

