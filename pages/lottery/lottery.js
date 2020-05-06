
Page({
	data: {
		is_play: false,
		cost: 5,
		animationData: {},
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	rotate() {


	},

	luckDrawStart() {
		console.log(this.data.is_play)
		let animation = wx.createAnimation({
			duration: 300
		})
		this.animation = animation
		animation.rotate(45).step()
		this.setData({
			animationData: animation.export(),
			// is_play: false
		})
		setInterval(() => {
			animation.rotate(45).step();
			this.setData({
				animationData: animation.export()
			})
		}, 300);
		// 阻止重复点击
		// if (this.data.is_play) return
		// 设置标识在运动中
		// this.setData({
		// 	is_play: true
		// });
		// 异步
		this.rotate()
		// wx.showModal({
		// 	title: '提醒',
		// 	content: `恭喜您获得一等奖!
		// 		兑换码: 1234
		// 		`,
		// })


	},
})