const App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		page: 1,
		list: [],
		credit1: null,
		hasmore: true,
		isloading: false
	},
	onShow: function () {
		this.getData()
	},
	getData() {
		if (this.data.isloading) return
		console.log('发请求', this.data.page)
		this.setData({ isloading: true })
		App.post('/api/user/get_credit_log', { page: this.data.page },
			res => {
				let { page, list } = this.data
				let credit1 = res.data.credit1//余额
				res.data.data.forEach(v => {
					v.createtime = App.getNowTime(Number(v.createtime) * 1000)
				})
				list = [...list, ...res.data.data] //循环体
				const hasmore = res.data.page < res.data.totalpage//更多
				page = hasmore ? page + 1 : page
				this.setData({ list, page, hasmore, credit1, isloading: false })
				console.log(this.data.list)
			})

	},
	scrolltolower() {
		!this.data.isloading && this.data.hasmore && this.getData()
	}
})