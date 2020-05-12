const App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		// 搜索框value
		value: '',
		index: {}
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
		this.getData()
	},
	// 获取
	getData(keyword = '') {
		App.post('/addons/litestore/api.index/get_store_list', { keyword },
			({ data }) => {
				let index = {
					...data.data,
					store_imgs: data.data.store_imgs.split(',').map(v => App.baseurl + v),
					show_img: App.baseurl + data.show_img,
					hot_activity: {
						...data.data.hot_activity,
						aimg: App.baseurl + data.data.hot_activity.aimg,
						signup_star: this.getNowTime(Number(data.data.hot_activity.signup_star) * 1000),
						signup_end: this.getNowTime(Number(data.data.hot_activity.signup_end) * 1000)
					},
				}
				this.setData({ index })
				console.log(this.data.index)
			})
	},

	getNowTime(value) {
		var date = new Date(value);
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let tian = date.getDate();
		return year + '-' + month + '-' + tian
	},
})