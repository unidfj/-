const App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		detail: {}
	},
	/**
	 * 立即兑换
	 */
	handleClick() {
		App.modal('兑换提示', '是否确认使用积分兑换商品', true,
			success => {
				App.post('/addons/litestore/api.order/buyNow_pay', { goods_id: this.data.goods_id },
					res => {
						console.log(res)
						let { order_no } = res.data
						order_no && App.psot('/addons/litestore/api.order/yuepay', { order_no },
							res2 => {
								console.log(res2)
								App.modal(res2.data.msg, `兑换码为${res2.data.data.code}`,false)
							}
						)
					})
			})

	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({ goods_id: options.goods_id })
	},
	onReady: function () {

	},
	onShow: function () {
		this.getData()
	},
	getData(goods_id = this.data.goods_id) {
		App.post('/addons/litestore/api.goods/detail', { goods_id },
			res => {
				let { detail } = res.data.data
				this.setData({
					detail: {
						...detail,
						// 轮播图图片
						images: detail.images.split(',').map(v => App.baseurl + v),
						content2: App.baseurl + detail.content2,
						buy_star: this.getNowTime(Number(detail.buy_star) * 1000),
						buy_end: this.getNowTime(Number(detail.buy_endthis) * 1000)
					}
				})
				console.log(this.data.detail)
			})
	},
	getNowTime(value) {
		console.log(value)
		var date = new Date(value);
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let tian = date.getDate();
		return year + '-' + month + '-' + tian
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