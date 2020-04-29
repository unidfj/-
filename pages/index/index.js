let App = getApp();
Page({
  data: {
    wxapp: [],
    newlist: [],
    randomlist: [],
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
    App.getStorageSyncwxapp(function (ret) {
      that.setData({
        wxapp: ret
      });
      wx.setNavigationBarTitle({
        title: ret.LiteName
        // title: '怡福荟'
      });
    });
  },
  onShow: function () {
    //这里获得最近的商品数据 随机商品数据
    let that = this;
    App._get('index/index', {}, function (result) {
      that.setData({
        newlist: result.data.NewList,
        randomlist: result.data.Randomlist,
        banner: result.data.bannerlist
      });
    });
  },
  onShareAppMessage: function () {
    return {
      title: "小程序商城首页",
      desc: "",
      path: "/pages/index/index"
    }
  }
})