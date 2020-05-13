const App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		active: 0,
		tab: [
			{ title: '全部', data: [123] },
			{ title: '未领取', data: [234] },
			{ title: '已领取', data: [345] }
		],
		credit1: null//积分余额

	},
	toogleCurren(e) {
		let { index } = e.target.dataset
		this.setData({ active: index })
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
		// const userInfo = wx.getStorageSync('userInfo')
		// console.log(userInfo.credit1)
		// this.setData({ credit1: userInfo.credit1 })
		this.getData()
	},
	getData(type = 0) {
		App.post('/addons/litestore/api.order/my', { type },
			res => {
				let { credit1, list } = res.data.data
				list =
				this.setData({ credit1, list })
			})
	}

})