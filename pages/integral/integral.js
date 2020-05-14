const App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		active: 0,
		tab: [
			{ title: '全部' },
			{ title: '未领取' },
			{ title: '已领取' }
		],
		credit1: null//积分余额

	},
	toogleCurren(e) {
		let { index } = e.target.dataset
		this.setData({ active: index })
		if (index == 0) {
			this.getData()
		}
		if (index == 1) {
			this.getData(10)
		}
		if (index == 2) {
			this.getData(20)
		}
	},
	onShow: function () {
		this.getData()
	},
	getData(type = 0) {
		App.post('/addons/litestore/api.order/my', { type },
			res => {
				let { credit1, list } = res.data.data
				list = list.map(v => {
					return {
						...v,
						pay_time: App.getNowTime(Number(v.pay_time) * 1000),
						freight_time:App.getNowTime(Number(v.freight_time) * 1000),
					}
				})
				this.setData({ credit1, list })
			})
	}

})