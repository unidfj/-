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
    credit1: 0,    // 积分
    type: null,    //业主 商家
    show: false,   // 遮罩层
    isSubmit: null //有没有提交
  },

  onShow: function () {
    const userInfo = wx.getStorageSync('userInfo')
    let { credit1 } = userInfo
    let type = userInfo.level
    this.setData({ type, credit1 })
    this.isSubmit()
    // 遮罩层优化
    if (this.data.show)
      this.setData({ show: false })
  },
  // 检测用户有没提交
  isSubmit() {
    App.post('/api/user/check_apply', {},
      res => {
        this.setData({ isSubmit: res.data.data.state })
        // 之前审核身份(0未申请审核 1业主 2商家)
        console.log(this.data.isSubmit)
      })
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
    // 1身份认证
    if (index === 0) {
      // 是否已提交
      this.data.isSubmit !== 0
        ? wx.navigateTo({
          url: `/pages/member/memberAbout/rezhengState?type=${this.data.isSubmit}`,
        })
        : this.setData({ show: true })
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