// pages/benefits/goodsDetail.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},
	/**
	 * 立即兑换
	 */
	handleClick() {
		wx.showModal({
			cancelColor: 'cancelColor',
			title: '兑换提示',
			content: '是否确认使用积分兑换商品?',
			success(res) {
				// 判断积分
				// 够


				// 不够
				wx.showModal({
					showCancel: false,
					title: '兑换提示',
					content: '积分不足,无法兑换!',

				})
			}
		})

	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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
		console.log(this.data)
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

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