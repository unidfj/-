const App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		list: [],
		tid: 0,//类型id
		page: 1,//页数
		isloading: false,
		hasmore: true
	},
	onLoad: function (opt) {
		console.log(opt)
		this.setData({ tid: opt.tid })
		wx.setNavigationBarTitle({
			title: opt.text,
		})

	},
	onShow: function () {
		this.setData({ list: [], page: 1 })
		this.getData()
	},
	getData() {
		if (this.data.isloading) return
		this.setData({ isloading: true })
		let { tid, page, list } = this.data
		App.post('/api/information/get_information_list', { tid, page },
			res => {
				console.log(res)
				res.data.data.forEach(v => {
					v.shrink_img = App.baseurl + v.shrink_img
				})
				// 没有更多了
				let hasmore = res.data.page < res.data.totalpage
				page = hasmore ? page + 1 : page
				list = [...list, ...res.data.data]
				this.setData({ page, list, hasmore, isloading: false })
				// console.log(this.data)
			})
	},
	onReachBottom: function () {
		!this.data.isloading && this.data.hasmore && this.getData()
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})