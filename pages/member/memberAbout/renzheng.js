
const App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		type: null,//1是业主 2是商家
		wxfordata1: [
			{ value: null, title: '业主房号:', name: 'room', placeholder: '请输入房号', type: 'number', confirmtype: "next" },
			{ value: null, title: '业主姓名:', name: 'name', placeholder: '请输入业主姓名', type: 'text', confirmtype: "next" },
			{ value: null, title: '手机号码:', name: 'mobile', placeholder: '请输入手机号码', type: 'number', confirmtype: "next" },
			{ value: null, title: '身份证号:', name: 'idcard', placeholder: '请输入身份证号', type: 'idcard', confirmtype: "done" },
		],
		wxfordata2: [
			{ value: null, title: '商铺门牌:', name: 'room', placeholder: '请输入商铺门牌', type: 'text', confirmtype: "next" },
			{ value: null, title: '店主姓名:', name: 'name', placeholder: '请输入店主姓名', type: 'text', confirmtype: "next" },
			{ value: null, title: '手机号码:', name: 'mobile', placeholder: '请输入手机号码', type: 'number', confirmtype: "next" },
			{ value: null, title: '店铺名称:', name: 'shopname', placeholder: '请输入店铺名称', type: 'text', confirmtype: "next" },
			{ value: null, title: '执照编号:', name: 'business_num', placeholder: '请输入营业执照编号', type: 'number', confirmtype: "done" }
		],
		fileList: [],
		fileList2: [],
		msg: '',// 用于提示的错误信息
		provincename: '',    //省名
		cityname: '',        //市名
		districtname: '',    //区名
		loupanname: '',  //楼盘名
		louhaoname: '',  //楼号名
		province: {},
		city: {},
		district: {},
		loupan: {},
		louhao: {},
		aid: null,//区号id
		fid: null,//楼盘id
		lnum: null,//楼号id

	},
	// 省picker
	bindPickerProvince(e) {
		let { value } = e.detail
		let provincename = this.data.province.arr[value]
		// 获取市
		this.getcity(provincename)
		this.setData({ provincename, city: {}, cityname: '', district: {}, districtname: '' })
	},
	// 市picker
	bindPickerCity(e) {
		let { value } = e.detail
		let cityname = this.data.city.arr[value]
		//获取区
		this.getdistrict(this.data.provincename, cityname)
		this.setData({ cityname, district: {}, districtname: '' })
	},
	// 区picker
	bindPickerDistrict(e) {
		let { value } = e.detail
		let districtname = this.data.district.arr[value]
		let aid = this.data.district.aid[value]
		console.log(aid)
		this.setData({ districtname, aid })
		console.log(this.data.aid)
	},
	//楼盘picker
	bindPickerLoupan(e) {
		console.log(e)
		let { value } = e.detail
		let loupanname = this.data.loupan.arr[value]
		let fid = this.data.loupan.fid[value]
		this.setData({ loupanname, fid })

		// 业主的楼号赋值
		if (this.data.type == 1) {
			let data = this.data.loupan.louhao[value]
			let arr = [], lnum = []
			Object.keys(data).forEach(key => {
				arr.push(data[key])
				lnum.push(key)
			})
			this.setData({ louhao: { arr, lnum, index: 0 } })
			console.log(this.data.louhao)
		}
	},
	//楼号picker
	bindPickerLouhao(e) {
		console.log(e)
		let { value } = e.detail
		let louhaoname = this.data.louhao.arr[value]
		let lnum = Number(this.data.louhao.lnum[value])
		this.setData({ louhaoname, lnum })
	},


	//获取省
	getprovincet() {
		App.post('/api/user/get_province', {},
			(res) => {
				let arr = res.data.data.map(v => v.province)
				this.setData({
					province: { arr, index: 0 }
				})
			})
	},
	// 通过省获取市
	getcity(province) {
		if (!province) return
		App.post('/api/user/get_city', { province },
			res => {
				let arr = res.data.data.map(v => v.city)
				this.setData({
					city: { arr, index: 0 }
				})
			})
	},
	// 通过省.市获取区
	getdistrict(province, city) {
		if (!province || !city) return
		App.post('/api/user/get_area', { province, city },
			res => {
				let arr = res.data.data.map(v => v.area)
				let aid = res.data.data.map(v => v.id)
				let district = { arr, aid, index: 0 }
				this.setData({ district })
			})
	},
	//获取楼盘
	getloupan(type) {
		if (!type) return
		App.post('/api/user/get_floor', { type },
			res => {
				// 1业主  2商家
				const { data } = res.data
				let arr = data.map(v => v.name)
				let fid = data.map(v => v.id)
				if (type == 1) {
					let louhao = data.map(v => v.num)
					//业主需要楼号id 
					this.setData({
						loupan: { arr, fid, louhao, index: 0 },
					})
				} else {
					this.setData({
						loupan: { arr, fid, index: 0 }
					})
				}

			})
	},


	//图片上传前
	beforeFn(e) {
		const { file, callback } = e.detail;
		let { path } = file
		if (path.indexOf('.jpg') == -1) {
			wx.showModal({
				title: '温馨提示',
				content: '暂时只支持jpg模式',
				showCancel: false
			})
			callback(false)
		}
		else callback(true)
	},
	// 图片上传
	afterRead(event) {
		let { secend } = event.currentTarget.dataset
		const { file } = event.detail;
		wx.getFileSystemManager().readFile({
			filePath: file.path, //选择图片返回的相对路径
			encoding: 'base64', //编码格式
			success: ({ data }) => {
				App.post('/api/user/upload', { image: 'data:image/jpeg;base64,' + data },
					({ data }) => {
						// console.log(data.data)
						!secend ?
							this.setData({
								fileList: [{
									url: App.baseurl + data.data,//预览用
									business_img: data.data//提交用
								}]
							})
							:
							this.setData({
								fileList2: [{
									url: App.baseurl + data.data,//预览用
									shop_img: data.data//提交用
								}]
							})
						// console.log(this.data.fileList, this.data.fileList2)
					})
			}
		})
	},
	//图片点击删除
	deleteImg(e) {
		console.log(e.detail.index)
		console.log(e)
		let { secend } = e.currentTarget.dataset
		wx.showModal({
			title: '确认',
			content: '确认删除图片吗',
			success: ({ confirm }) => {
				confirm ?
					secend ? this.setData({ fileList2: [] }) : this.setData({ fileList: [] }) : ''
			}
		})
	},
	// 提交申请
	submit1: function (e) {
		let { value } = e.detail //表单的数据
		value.type = this.data.type
		console.log(value)
		if (!this.validation(value)) {
			wx.showModal({
				title: '填写提示',
				content: this.data.msg,
				showCancel: false,
			})
		} else {
			App.post('/api/user/identity_apply', { ...value },
				res => {
					App.modal('提交成功', res.data.msg, false, () => {
						wx.switchTab({ url: '/pages/member/index', })
					})
				})
		}
	},

	submit2: function (e) {
		let { value } = e.detail
		if (!this.data.fileList || !this.data.fileList2) {
			return
		}
		value = {
			...value,
			type: 2,
			business_img: this.data.fileList[0].business_img,
			shop_img: this.data.fileList2[0].shop_img,
		}
		this.validation2(value)
		if (!this.validation2(value)) {
			wx.showModal({
				title: '填写提示',
				content: this.data.msg,
				showCancel: false,
			})
		} else {
			App.post('/api/user/identity_apply', { ...value },
				res => {
					App.modal('提交成功', res.data.msg, false, () => {
						wx.switchTab({ url: '/pages/member/index', })
					})
				})
		}
	},
	// 验证
	validation(value) {
		if (!value.aid) {
			this.setData({ msg: '地区不能为空' })
			return false
		};
		if (!value.fid) {
			this.setData({ msg: '业主楼盘不能为空' })
			return false
		}
		if (!value.lnum) {
			this.setData({ msg: '业主楼号不能为空' })
			return false
		}
		if (!value.room) {
			this.setData({ msg: '业主房号不能为空' })
			return false
		}
		if (!value.name) {
			this.setData({ msg: '业主姓名不能为空' })
			return false
		}
		let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
		if (!value.mobile) {
			this.setData({ msg: '手机号不能留空' })
			return false
		}
		if (!value.idcard) {
			this.setData({ msg: '身份证号码不能为空' })
			return false
		}
		return true
	},
	validation2(value) {
		if (!value.aid) {
			this.setData({ msg: '地区不能为空' })
			return false
		}
		if (!value.fid) {
			this.setData({ msg: '业主楼盘不能为空' })
			return false
		}
		if (!value.room) {
			this.setData({ msg: '商铺门牌不能为空' })
			return false
		}
		if (!value.name) {
			this.setData({ msg: '店主姓名不能为空' })
			return false
		}
		let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
		if (!value.mobile) {
			this.setData({ msg: '手机号不能留空' })
			return false
		}
		if (!value.shopname) {
			this.setData({ msg: '店铺名称不能为空' })
			return false
		}
		if (!value.business_num) {
			this.setData({ msg: '店铺营业执照编号不能为空' })
			return false
		}
		if (!value.business_img[0]) {
			this.setData({ msg: '请上传营业执照照片' })
			return false
		}
		if (!value.shop_img[0]) {
			this.setData({ msg: '请上传门店照片' })
			return false
		}
		return true
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({ type: options.type })
	},

	onShow: function () {
		// 省
		this.getprovincet()
		//楼盘
		this.getloupan(this.data.type)

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