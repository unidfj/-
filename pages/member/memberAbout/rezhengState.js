const App = getApp()
Page({
	data: {
		type: null,//业主1   商家2
		state: false,//认证失败   认证通过
		status: '',//认证头
		stateData0: [
			// { title: '所在地区:', msg: '广东省 广州市 天河区' },
			// { title: '业主楼盘:', msg: '富丽小区' },
			// { title: '业主楼号:', msg: '富丽小区' },
			// { title: '业主房号:', msg: '601' },
			// { title: '业主姓名:', msg: '詹姆斯' },
			// { title: '手机号码:', msg: '13213213213' },
			// { title: '身份证号:', msg: '123456789987654321' },
		],
		stateData1: [
			// { title: '所在地区:', msg: '广东省 广州市 天河区' },
			// { title: '商家楼盘:', msg: '富丽小区' },
			// { title: '商铺楼号:', msg: '富丽小区' },
			// { title: '店主姓名:', msg: '詹姆斯' },
			// { title: '手机号码:', msg: '13213213213' },
			// { title: '店铺名称:', msg: '怡富会' },
			// { title: '营业执照编号:', msg: '914202MA5CLJ5201' },
			// { img: true, name: '营业执照照片:', src: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			// { img: true, name: '门店照片:', src: 'https://img.yzcdn.cn/vant/cat.jpeg' },
		]
	},


	reAuthentication() {
		wx.redirectTo({
			url: `/pages/member/memberAbout/renzheng?type=${this.data.type}`,
		})
	},


	info(type) {
		App.post('/api/user/get_identity',
			{ type },
			(res) => {
				let { data } = res.data
				console.log(data)
				this.setData({
					state: data.state,
					status: data.status,
					rejection: data.rejection,
				})
				// 条件赋值
				type == 1
					? this.setData({
						stateData0: [
							{ title: '所在地区:', msg: data.area },
							{ title: '业主楼盘:', msg: data.fname },
							{ title: '业主楼号:', msg: data.lnum },
							{ title: '业主房号:', msg: data.room },
							{ title: '业主姓名:', msg: data.name },
							{ title: '手机号码:', msg: data.mobile },
							{ title: '身份证号:', msg: data.idcard },
						]
					})
					: this.setData({
						stateData1: [
							{ title: '所在地区:', msg: data.area },
							{ title: '商家楼盘:', msg: data.fname },
							{ title: '商家楼牌:', msg: data.room },
							{ title: '店主姓名:', msg: data.name },
							{ title: '手机号码:', msg: data.mobile },
							{ title: '店铺名称:', msg: data.shopname },
							{ title: '营业执照编号:', msg: data.business_num },
							{ img: true, name: '营业执照照片:', src: App.baseurl + data.business_img },
							{ img: true, name: '门店照片:', src: App.baseurl + data.shop_img },
						]
					})

			},
			() => {
				wx.redirectTo({ url: `/pages/member/memberAbout/renzheng?type=${type}`, })
			}
		)
	},
	onLoad: function (opt) {
		console.log(opt)
		this.setData({ type: opt.type })
		wx.setNavigationBarTitle({
			title: opt.type == 2 ? '商家认证' : '业主认证',
		})
	},
	onShow: function () {
		// 拿到业主/商家
		this.info(this.data.type)
	},
})