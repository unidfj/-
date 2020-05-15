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


	search(e) {
		this.getData(e.detail)
	},
	clearValue(e) {
		this.setData({ value: '' })
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
				console.log(data)
				let index = {
					...data.data,
					store_imgs: data.data.store_imgs.split(',').map(v => App.baseurl + v),
					show_img: App.baseurl + data.data.show_img,
					hot_activity: {
						...data.data.hot_activity,
						aimg: App.baseurl + data.data.hot_activity.aimg,
						signup_star: App.getNowTime(Number(data.data.hot_activity.signup_star) * 1000),
						signup_end: App.getNowTime(Number(data.data.hot_activity.signup_end) * 1000)
					},
				}
				this.setData({ index })
				wx.stopPullDownRefresh() //停止下拉刷新
				console.log(this.data.index)
			})
	},
	onPullDownRefresh() {
		this.getData()
	}
})