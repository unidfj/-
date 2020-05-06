let App = getApp();
Page({
  data: {
    
    banner: [],

    // 步骤条
    steps: [
      {
        // text: '步骤一',
        desc: '描述信息'
      },
      {
        // text: '步骤二',
        desc: '描述信息'
      }
    ]
  },
  onLoad: function (options) {
    //页面启动后 调取首页的数据
    let that = this;
   
  },
  onShow: function () {
    
  },
  onShareAppMessage: function () {
    return {
      title: "小程序商城首页",
      desc: "",
      path: "/pages/index/index"
    }
  }
})