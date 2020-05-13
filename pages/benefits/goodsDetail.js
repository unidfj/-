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
						let { order_no } = res.data.data
						order_no && App.post('/addons/litestore/api.order/yuepay', { order_no },
							res2 => {
								App.modal(res2.data.msg, `
								您的兑换码为${res2.data.data.code}
								详情请到会员中心查看兑换记录`, false)
							}
						)
					})
			},
			'#FB6254', '#999999')

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
	getData() {
		App.post('/addons/litestore/api.goods/detail', { goods_id: this.data.goods_id },
			res => {
				let { detail } = res.data.data
				this.setData({
					detail: {
						...detail,
						// 轮播图图片
						images: detail.images.split(',').map(v => App.baseurl + v),
						content2: App.baseurl + detail.content2,
						buy_star: App.getNowTime(Number(detail.buy_star) * 1000),
						buy_end: App.getNowTime(Number(detail.buy_end) * 1000),
						content: detail.content.replace(new RegExp(/src="/g), `class='contentimg' mode="aspectFit" src="`)
					}
				})
				console.log(this.data.detail)
			})
	},
})