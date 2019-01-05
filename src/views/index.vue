<template lang="pug">
    .box
        Row.menu
            Col.menu-item(:span="3" v-for="(item, index) in menuList" :key="index" :class="{'active': item.to===currentView}") 
                router-link(:to="{name: item.to}")
                    Icon.icon(:type="item.icon")
                    | {{item.name}}
        Row.view
          router-view
</template>

<script>
export default {
  watch: {
    '$route': function(val, oldVal){
      this.currentView = val.name
    }
  },
  data() {
    return {
      currentView: 'Attendance',
      menuList: [
        { name: "我的考勤", icon: "clipboard", to: "Attendance" },
        { name: "我的假期", icon: "clipboard", to: "Holiday" },
        { name: "我的绩效", icon: "clipboard", to: "Holiday" },
        { name: "我的工资", icon: "clipboard", to: "Holiday" },
        { name: "我的档案", icon: "clipboard", to: "Holiday" },
        { name: "我的商保", icon: "clipboard", to: "Holiday" },
        { name: "我的考邮箱设备", icon: "clipboard", to: "Holiday" },
        { name: "我的资产", icon: "clipboard", to: "Holiday" }
      ]
    };
  },
  methods: {
  }
};
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  box-shadow: 0 0 10px #ccc;
  background-color: transparent;
  .menu {
    height: 40px;
    line-height: 40px;
    font-size: 1.2rem;
    background-color: rgba(92, 173, 255, 0.1);
    .menu-item {
      text-align: center;
      .icon {
        margin-right: 10px;
      }
      a {
        color: rgb(110, 109, 109);
      }
    }
    .menu-item:hover,
    .active {
      background-color: #5cadff;
      a {
        color: #fff;
      }
    }
  }
  .view{
    min-height: calc(100vh - 70px);
  }
}
</style>


