let App = getApp();
Page({
  data: {
    index: {
      bannerlist: [],//轮播图
      NewList: [],
      showimg: '',
    }
  },
  onLoad: function (options) {

  },
  onShow: function () {
    this.getIndexData()
  },
  /** 获取首页数据*/
  getIndexData() {
    App.post('/addons/litestore/api.index/index', {}, res => {
      const { data } = res.data
      console.log(data)
      const srcarr = ['sy_ico_xmtj.png', 'sy_ico_sjdl.png', 'sy_ico_yfzx.png']
      data.show_img = App.baseurl + data.show_img
      data.hot_activity.aimg = App.baseurl + data.hot_activity.aimg
      data.hot_activity.signup_star = App.getNowTime(Number(data.hot_activity.signup_star) * 1000)
      data.hot_activity.signup_end = App.getNowTime(Number(data.hot_activity.signup_end) * 1000)
      data.information.forEach(v => { v.shrink_img = App.baseurl + v.shrink_img })
      data.information_type.forEach((v, i) => {
        v.iconsrc = srcarr[i]
      })
      this.setData({ index: { ...data } })
      console.log(this.data.index)
    })
  },

})