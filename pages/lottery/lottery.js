const App = getApp()
let animationData = wx.createAnimation({
	duration: 200,
	timingFunction: 'linear'
})
let animationclick = wx.createAnimation()
let animationzhizhen = wx.createAnimation()
// let
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
		this.updata()
	},
	updata() {
		App.post('/api/activity/get_luckdraw_detaile', {},
			res => {
				const { data } = res.data
				console.log(data)
				let lucky_text = data.lucky_text.replace(new RegExp(/img src="\//g), `img class="textimg" mode="center" src="${App.baseurl}/`)
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
		this.setData({
			isplay: true,
		})
		App.post('/api/activity/do_luckdraw', {}, res => {
			let result = res.data.data
			let { prize } = result //1 2 3 4 
			
			let n = 0;
			this.interval = setInterval(() => {
				animationData.rotate(180 * (++n)).step()
				animationclick.scale(0.7).opacity(0.7).step(),
					animationzhizhen.opacity(0.6).step()
				this.setData({
					animationData: animationData.export(),
					animationclick: animationclick.export(),
					animationzhizhen: animationzhizhen.export()
				})
				if (n == 12) {
					// 转秒后// 停止在当前角度 
					animationData.rotate(this.angle(prize)).step({ duration: 0, timingFunction: 'linear' })
					animationclick.scale(1).opacity(1).step()
					animationzhizhen.opacity(1).step()
					clearInterval(this.interval)
					this.setData({
						animationData: animationData.export(),
						animationclick: animationclick.export(),
						animationzhizhen: animationzhizhen.export(),
						isplay: false,
						total: (this.data.total - this.data.cost).toFixed(2)
					})
					if (result.code == 0) {
						App.modal('提示', '谢谢参与', false)
					} else {
						App.modal('提醒',
							`恭喜您获得${result.lrank}!
						兑换码: ${result.code}
						`,
						false,)
					}
					this.updata()
				}
			}, 200)

		})
	},
	onUnload() {
		if (this.interval) clearInterval(this.interval)
	},
	angle(num) {
		let n = 0
		if (num == 4) n = 295 //小数
		if (num == 3) n = 205
		if (num == 2) n = 115
		if (num == 1) n = 25
		if (num == 0) n = 70 + Math.random() * 3//谢谢惠顾
		// 公式 parseInt(Math.random()*(max-min+1)+min,10); 
		n = parseInt(Math.random() * 41 + n, 10);
		return n
	}
})