let App = getApp();

Page({
  data: {
    // 4
    member: [{
      title: '身份认证',
      icon: '',
      url: ''
    }, {
      title: '积分订单',
      icon: '',
      url: ''
    }, {
      title: '我的活动',
      icon: '',
      url: ''
    }, {
      title: '积分明细',
      icon: '',
      url: ''
    }],

    // 遮罩层
    show: false
  },

  onLoad: function (options) {

  },

  onShow: function () {

  },
  // 4
  handleClick(e) {
    console.log(e)
    let { index } = e.target.dataset
    // 1身份认证
    if (index === 0) {
      this.setData({
        show: true
      })
    }
    if (index === 1) {
      wx.navigateTo({
        url: '/pages/integral/integral',
      })
    }
  },

  renzheng(e) {
    console.log(e)
    let { type } = e.currentTarget.dataset
    // 0是业主,1是商家
    wx.redirectTo({
      url: `/pages/menberAbout/renzheng?type=${type}`
    })
  },


})