const App = getApp()
Page({
	data: {
		isplay: false,
		animationData: {},
		interval: null,
		cost: 0, //每次消耗5
		total: 0,//总分
		lucky_text: null
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},
	onShow: function () {
		App.post('/api/activity/get_luckdraw_detaile', {},
			res => {
				const { data } = res.data
				console.log(data)
				let lucky_text = data.lucky_text.replace(new RegExp(/img src="\//g), `img src="${App.baseurl}/`)
				let uncomplete = data.uncomplete.split(',')
				this.setData({
					uncomplete,
					lucky_text,
					cost: data.price,
					total: data.credit1
				})
				console.log(this.data)
			})
	},
	luckDrawStart() {
		if (this.data.isplay) return

		App.post('/api/activity/do_luckdraw', {}, res => {
			let result = res.data.data
			// 动画
			let animation = wx.createAnimation({
				duration: 200,
				timingFunction: 'linear'
			})
			this.setData({
				isplay: true,
				animationData: animation.export()
			})
			let n = 0;
			this.interval = setInterval(() => {
				console.log(n)
				animation.rotate(180 * (++n)).step()
				this.setData({
					animationData: animation.export()
				})
				// 200++  1秒+4  20是旋转5秒 12是旋转3秒
				if (n == 12) {
					// 初始化动画
					animation.rotate(0).step({ duration: 0, timingFunction: 'linear' })
					clearInterval(this.interval)
					this.setData({
						animationData: animation.export(),
						isplay: false,
						total: this.data.total - this.data.cost
					})
					App.modal('提醒',
						`恭喜您获得${result.lrank}!
					兑换码: ${result.code}
						`,
						false)
				}
			}, 200)

		})
	},
	onUnload() {
		if (this.interval)
			clearInterval(this.interval)
	}
})