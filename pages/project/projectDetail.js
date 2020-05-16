const App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		id: null,
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
				res.data.data.content = res.data.data.content.replace(new RegExp(/src="\//g), `mode='aspectFit' src="${App.baseurl}/`)
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