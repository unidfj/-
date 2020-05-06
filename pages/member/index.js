let App = getApp();

Page({
  data: {
    // 4
    member: [{
      title: '身份认证',
      icon: '',
      src: ''
    }, {
      title: '积分订单',
      icon: '',
      src: ''
    }, {
      title: '我的活动',
      icon: '',
      src: ''
    }, {
      title: '积分明细',
      icon: '',
      src: ''
    }],

    // 遮罩层
    show: false
  },

  onLoad: function (options) {

  },

  onShow: function () {
    if (this.data.show)
      this.setData({ show: false })
  },
  // 点击空白隐藏遮罩
  onClickHide(e) {
    setTimeout(() => {
      this.setData({ show: false })
    }, 100);

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
    // 2积分订单
    if (index === 1) {
      wx.navigateTo({
        url: '/pages/integral/integral',
      })
    }
    //3我的活动
    if (index === 2) {
      wx.navigateTo({
        url: '/pages/activity/myactivity',
      })
    }
    //4积分明细
    if (index === 3) {
      wx.navigateTo({
        url: '/pages/integral/integralDetail',
      })
    }
  },


})