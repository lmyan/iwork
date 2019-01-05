<template lang="pug">
    .container
        .header
        .content
            router-view
</template>
<style lang="less" scoped>
.container {
  width: 100%;
  @headerHeight: 20px;
  .header{
      height: @headerHeight;
  }
  .content{
      display: flex;
      margin: 0 auto;
      width: 95%;
      background-color: rgba(255,255,255,.7);
  }
}
</style>


