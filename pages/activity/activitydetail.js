Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		htmlText: `为答谢广大业主会员及新老顾客，在活动期间，凡所有参与活动的业主会员可享受连住3晚6折起的限时活动！活动名额有限，抓紧时间报名吧！
		本次活动限定100个名额，先到先得！
		* 本活动最终解释权归柏莱雅精品公寓所有`,
		type: '',
		showoverlay: false,//遮罩层开关
		form: {
			username: '',
			phone: '',
		}
	},

	onClickHide() {
		this.setData({
			showoverlay: false,
			form: {
				username: '',
				phone: ''
			}
		})
	},

	// 立即参加
	btn() {
		// 不可以参加>>>活动已满 ||  未开始
		// wx.showModal({
		// 	title: '活动提示',
		// 	content: this.data.type === 1 ? '该活动报名名额已满' : '该活动暂未开启,敬请期待!',
		// 	showCancel: false,
		// 	confirmColor: '#4fb8fb'
		// })

		//可以参加 
		this.setData({ showoverlay: true })
	},

	// 参加活动的点击提交 http success
	suresubmit() {

		// 成功的回调
		wx.showModal({
			title: '报名成功',
			content: `您的活动报名码为 ${'1234'} 
				详情请到会员中心查询报名记录
			` ,
			showCancel: false,
			confirmColor: '#7b76fe'
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})