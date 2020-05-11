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
    // 积分
    jifen: 0,
    type: null,      //业主 商家
    // 遮罩层
    show: false
  },

  onLoad: function (options) {

  },

  onShow: function () {
    let type = wx.getStorageSync('userInfo').level
    this.setData({ type })
    // 遮罩层优化
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
  handleClick: function (e) {
    // 获取type
    let { type } = this.data
    let { index } = e.currentTarget.dataset
    console.log('点击事件+', index, this.data.type)
    // 1身份认证 判断是否已认证,未认证遮罩层,已认证renzhengstate
    if (index === 0) {
      type == 0
        ? this.setData({ show: true })  //未验证
        : wx.navigateTo({               // 已认证 
          url: `/pages/member/memberAbout/rezhengState?type=${this.data.type}`,
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