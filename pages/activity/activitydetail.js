const App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		aid: null,//活动id
		htmlText: `为答谢广大业主会员及新老顾客，在活动期间，凡所有参与活动的业主会员可享受连住3晚6折起的限时活动！活动名额有限，抓紧时间报名吧！
		本次活动限定100个名额，先到先得！
		* 本活动最终解释权归柏莱雅精品公寓所有`,
		type: '',
		showoverlay: false,//遮罩层开关
		form: {
			signup_name: null,
			signup_mobile: null
		},
		detail: {}
	},

	onClickHide() {
		this.setData({
			showoverlay: false,
			form:{}
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
	submit: function (e) {
		const { value } = e.detail
		value.aid = 8
		App.post('/api/activity/do_activity_signup', { ...value },
			res => {
				console.log(res)
				App.modal(res.data.msg, `您的活动报名码为 ${res.data.code}`, false, () => {
					//跳转到哪里
					wx.redirectTo({ url: '/pages/activity/myactivity', })
				})
			})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({ aid: options.id })
	},


	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.getData()
	},

	getData() {
		App.post('/api/activity/get_activity_detail', { aid: this.data.aid, type: 1 },
			res => {
				console.log(res)
				const { data } = res.data
				let detail = {
					...data,
					aimg: App.baseurl + data.aimg,
					signup_star: App.getNowTime(Number(data.signup_star) * 1000),
					signup_end: App.getNowTime(Number(data.signup_end) * 1000),
					content:data.content.replace(new RegExp(/src="\//g), `src="${App.baseurl}/`)
				}
				console.log(detail)
				this.setData({ detail })
			})
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