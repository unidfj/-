const App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		curren: 1,//tab.index
		type: null,//业主商家
		//val6个参数
		title: '',
		signup_star: '开始时间',
		signup_end: '结束时间',
		content: '',
		maxnum: '',
		aimg: '',

		fileList: [],//图片预览
		list: []//我的活动列表 
	},
	changeTab(e) {
		let { curren } = e.currentTarget.dataset
		this.setData({ curren })
	},
	// 日期start picker
	bindDateChangeStart: function (e) {
		console.log(e.detail.value)
		let signup_star = e.detail.value
		this.setData({ signup_star })
	},
	// 日期end picker
	bindDateChangeEnd: function (e) {
		console.log(e.detail.value)
		let signup_end = e.detail.value
		this.setData({ signup_end })
	},
	//图片上传前
	beforeRead(e) {
		const { file, callback } = e.detail;
		console.log(file.size)
		if (file.size >= 1048576) {
			wx.showModal({
				title: '温馨提示',
				content: '图片大小请不要超过2M',
				showCancel: false
			})
			callback(false);
		}
		callback(true);
	},
	//图片上传
	afterRead(event) {
		const { file } = event.detail;
		this.data.fileList.push({ url: file.path })
		this.setData({ fileList: this.data.fileList })
		wx.getFileSystemManager().readFile({
			filePath: file.path, //选择图片返回的相对路径
			encoding: 'base64', //编码格式
			success: ({ data }) => {
				App.post('/api/user/upload', { image: 'data:image/jpeg;base64,' + data },
					({ data }) => {
						this.setData({ aimg: data.data })
					})
			}
		})
	},
	//图片点击删除
	deleteImg(e) {
		// console.log(e.detail.index)//索引
		wx.showModal({
			title: '确认',
			content: '确认删除图片吗',
			success: ({ confirm }) => {
				if (confirm)
					this.setData({ fileList: [] })
			}
		})
	},
	// 点击发布
	formSubmit(e) {
		let { value } = e.detail
		value = {
			...value,
			signup_star: new Date(value.signup_star).getTime()/1000,
			signup_end: new Date(value.signup_end).getTime()/1000,
			aimg: this.data.aimg
		}
		console.log(value)
		let content = this.validation(value)
		if (content) {
			wx.showModal({
				title: '填写提示',
				content,
				showCancel: false,
			})
		}
		App.post('/api/activity/do_activity_apply', { ...value },
			res => {
				console.log(res)
				App.modal('提示', res.data.msg, false, () => {
					wx.redirectTo({
						url: '/pages/activity/myactivity',
					})
				}, '#FB6254')
			}
		)

	},
	// 验证
	validation(val) {
		if (!val.title) return '请输入活动标题'
		if (!val.signup_star) return '请设置活动开始时间'
		if (!val.signup_end) return '请设置活动结束时间'
		if (val.signup_star > val.signup_end) return '请检查开始结束时间是否正确'
		if (!val.maxnum) return '请设置最多报名人数'
		if (!val.content) return '请输入活动介绍'
		return ''
	},



	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		let type = wx.getStorageSync('userInfo').level
		this.setData({ type })
		this.getData()
	},
	// 获取活动
	getData() {
		App.post('/api/activity/get_my_activity_list', {},
			res => {
				console.log(res)
				let list = res.data.data.map(v => {
					return {
						...v,
						aimg: App.baseurl + v.aimg,
						signup_star: App.getNowTime(Number(v.signup_star) * 1000),
						signup_end: App.getNowTime(Number(v.signup_end) * 1000),
						type2props: { snum: v.snum, maxnum: v.maxnum }
					}
				})
				console.log(list)
				this.setData({ list })
			})
	},

})