const App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		order_no: null,
		detail: {}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options) //0001
		this.setData({ order_no: options.order_no })
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.getData()
	},
	getData() {
		App.post('/addons/litestore/api.order/detail', { order_no: this.data.order_no },
			res => {
				const { data } = res.data
				let detail = {
					...data,
					// 组件title
					title: data.goods_name,
					images: App.bgaseurl + data.images
				}
				this.setData({ detail })
				console.log(detail)
			})
	}

})