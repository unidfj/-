const App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		order_no: null,
		detail: {}
	},

	onLoad: function (options) { this.setData({ order_no: options.order_no }) },
	onShow: function () { this.getData() },

	getData() {
		App.post('/addons/litestore/api.order/detail', { order_no: this.data.order_no },
			res => {
				const { data } = res.data
				let detail = {
					...data,
					title: data.goods_name,
					pay_time: App.getNowTime(Number(data.pay_time) * 1000),
					freight_time: data.freight_time && App.getNowTime(Number(data.freight_time) * 1000),
				}
				this.setData({ detail })
				console.log(detail)
			})
	}

})