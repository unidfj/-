// pages/menberAbout/renzheng.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		type: 0,
		options: [
			{
				id: '',
				name: '广东'
			},
			{
				id: '',
				name: '茂名'
			}

		],
		wxfordata0: [
			{ title: '业主房号:', placeholder: '请输入房号', type: 'number' },
			{ title: '业主姓名:', placeholder: '请输入业主姓名', type: 'text' },
			{ title: '手机号码:', placeholder: '请输入手机号码', type: 'number' },
			{ title: '身份证号:', placeholder: '请输入身份证号', type: 'idcard' },
		],
		wxfordata1: [
			{ title: '商铺门牌:', placeholder: '请输入商铺门牌', type: 'text' },
			{ title: '店主姓名:', placeholder: '请输入店主姓名', type: 'text' },
			{ title: '手机号码:', placeholder: '请输入手机号码', type: 'number' },
			{ title: '店铺名称:', placeholder: '请输入身份证号', type: 'text' },
			{ title: '营业执照编号', placeholder: '请输入营业执照编号', type: 'number' }
		]
	},
	// 图片前上传验证
	beforeRead(event) {
		const { file, callback } = event.detail
		if (file.include('.jpg')) {
			callback(true)
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({ type: options.type })
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