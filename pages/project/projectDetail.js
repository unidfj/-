const App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		id: null,
		text: `      贷款市场报价利率（LPR）由各报价行按公开市场操作利率（主要指中期借贷便利利率）加点形成的方式报价，由全国银行间同业拆借中心计算得出，为银行贷款提供定价参考。目前，LPR包括1年期和5年期以上两个品种。
		所以和从前最大的变化其实就是用LPR来代替从前的贷款基准利率。因此，随着LPR降至新低，对于要贷款买房个人来说，的确是个不错的入市时机。`
		,
		detail: {}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({ id: options.id })
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.getDetail()
	},
	// 获取函数
	getDetail(aid = this.data.id) {
		App.post('/api/information/get_information_detail', { aid },
			res => {
				console.log(res)
				res.data.data.content = res.data.data.content.replace(new RegExp(/src="\//g), `src="${App.baseurl}/`)
				this.setData({ detail: res.data.data })
				console.log(this.data)
			})
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