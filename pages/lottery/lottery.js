const App = getApp()
let animation = wx.createAnimation({
	duration: 200,
	timingFunction: 'linear'
})
Page({
	data: {
		isplay: false,
		animationData: {},
		interval: null,
		cost: 0, //每次消耗5
		total: 0,//总分
		lucky_text: null,
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
	// 转
	luckDrawStart() {
		if (this.data.isplay) return

		App.post('/api/activity/do_luckdraw', {}, res => {
			let result = res.data.data
			let { prize } = result //1 2 3 4 
			this.setData({
				isplay: true,
				// animationData: animation.export()
			})
			let n = 0;
			this.interval = setInterval(() => {
				animation.rotate(180 * (++n)).step()
				this.setData({
					animationData: animation.export()
				})
				if (n == 12) {
					// 转三秒后// 停止在当前角度 
					animation.rotate(this.angle(prize)).step({ duration: 0, timingFunction: 'linear' })
					clearInterval(this.interval)
					this.setData({
						animationData: animation.export(),
						isplay: false,
						total: (this.data.total - this.data.cost).toFixed(2)
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
		if (this.interval) clearInterval(this.interval)
	},
	angle(num) {
		if (num == 4) return 315
		if (num == 3) return 225
		if (num == 2) return 135
		if (num == 1) return 45
	}
})