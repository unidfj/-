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
				const { data } = res.data
				let detail = {
					...data,
					content: data.content.replace(new RegExp(/src="/g), `mode="aspectFill" class="contenimg" src="`),
					shrink_img: App.baseurl + data.shrink_img,
					text: [
						{ title: '楼盘地址:', msg: data.floor_area },
						{ title: '近期开盘:', msg: data.open_time },
						{ title: "主力户型:", msg: data.house_type },
						{ title: "产权年限:", msg: data.yesrs },
						{ title: "交房时间:", msg: data.bandin_time },
						{ title: "建筑类型:", msg: data.floor_type },
						{ title: "装修状态:", msg: data.renovation },
						{ title: '售楼地址:', msg: data.sell_area },
						{ title: '规划户数:', msg: data.user_num },
						{ title: '容积率:', msg: data.plot },
						{ title: '绿化率:', msg: data.green }

					]
				}
				this.setData({ detail })
				console.log(this.data.detail)
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