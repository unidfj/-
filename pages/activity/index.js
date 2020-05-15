const App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		page: 1,     //页数
		show_img: '',//抽奖图片
		list: [],     //循环体
		isloading: false,
		hasmore: true
	},


	onShow: function () {
		this.setData({ list: [], page: 1 })
		this.getData()
	},
	getData() {
		if (this.data.isloading) return
		this.setData({ isloading: true })
		console.log('第' + this.data.page)
		App.post('/addons/litestore/api.index/get_activity_list', { page: this.data.page },
			res => {
				const { data } = res.data
				let show_img = App.baseurl + data.show_img
				let list = data.activity_list.data.map(v => {
					return {
						...v,
						aimg: App.baseurl + v.aimg,
						signup_star: App.getNowTime(Number(v.signup_star) * 1000),
						signup_end: App.getNowTime(Number(v.signup_end) * 1000)
					}
				})
				list = [...this.data.list, ...list]
				// 没有更多了
				let hasmore = data.activity_list.page < data.activity_list.totalpage
				let page = hasmore ? this.data.page + 1 : this.data.page
				this.setData({ show_img, list, hasmore, page, isloading: false })
				console.log(this.data)
			})
	},

	onReachBottom: function () {
		!this.data.isloading && this.data.hasmore && this.getData()
	},

})