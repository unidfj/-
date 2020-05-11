let App = getApp();
Page({
  data: {
    index: {

      bannerlist: [],//轮播图
      NewList: [],
      showimg: '',
    },
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
    this.getIndexData()
  },
  /** 获取轮播*/
  getIndexData() {
    App.post('/addons/litestore/api.index/index', {}, res => {
      console.log(res.data.data)
      const { data } = res.data
      data.hot_activity.signup_star = this.getNowTime(Number(data.hot_activity.signup_star) * 1000)
      data.hot_activity.signup_end = this.getNowTime(Number(data.hot_activity.signup_end) * 1000)
      this.setData({ index: { ...data } })
    })
  },
  // 时间戳转化时间
  getNowTime(value) {
    var date = new Date(value);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let tian = date.getDate();
    return year + '-' + month + '-' + tian

  },
  onShareAppMessage: function () {
    return {
      title: "小程序商城首页",
      desc: "",
      path: "/pages/index/index"
    }
  }
})