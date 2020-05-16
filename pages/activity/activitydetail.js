const App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		aid: null,//活动id
		type: '', //我的活动 活动管理
		showoverlay: false,//遮罩层开关
		form: {
			signup_name: null,
			signup_mobile: null
		},
		detail: {},
		idstate: null, //身份
		loading: true,//骨架屏
		focus: false
	},

	onClickHide() {
		this.setData({
			showoverlay: false,
			form: {}
		})
	},

	// 立即参加
	btn() {
		if (this.data.detail.scode) return
		//可以参加 
		this.setData({ showoverlay: true })
	},
	// 点击第一个input 让第二个input聚焦
	bindconfirm(e) {
		console.log(e)
		this.setData({ focus: true })
	},
	// 参加活动的点击提交 http success
	submit: function (e) {
		const { value } = e.detail
		value.aid = this.data.aid
		App.post('/api/activity/do_activity_signup', { ...value },
			res => {
				console.log(res)
				App.modal(res.data.msg, `您的活动报名码为 ${res.data.code}`, false, () => {
					//跳转到哪里
					wx.redirectTo({ url: '/pages/activity/myactivity', })
				})
			})
	},

	onLoad: function (options) {
		console.log('0是从活动管理进入 1是我的活动', options)
		this.setData({ aid: options.id, type: options.type })
	},

	onShow: function () {
		this.setData({ idstate: wx.getStorageSync('userInfo').level })
		this.getData()
	},

	getData() {
		const { aid, type } = this.data
		App.post('/api/activity/get_activity_detail', { aid, type },
			res => {
				const { data } = res.data
				console.log(data)
				let detail = {
					...data,
					aimg: App.baseurl + data.aimg,
					signup_star: App.getNowTime(Number(data.signup_star) * 1000),
					signup_end: App.getNowTime(Number(data.signup_end) * 1000),
					content: data.content.replace(new RegExp(/src="/g), `class='contentimg' mode="center" src="${App.baseurl}`),
					signup_log: data.signup_log.map(v => {
						return {
							...v,
							signtime: App.getNowTime(Number(v.signtime) * 1000)
						}
					})
				}
				console.log(detail)
				this.setData({ detail, loading: false })
			})
	},

})