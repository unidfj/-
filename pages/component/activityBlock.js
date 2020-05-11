// pages/activityBlock.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		// title:String,
		// aimg:String,
		// signup_end:String,
		// signup_star:String,
		props: Object,
		type2: Number,
		type2props: Object
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		steps: [
			{
				text: '步骤一',
				desc: '描述信息'
			},
			{
				text: '步骤二',
				desc: '描述信息'
			},
			{
				text: '步骤三',
				desc: '描述信息'
			},
			{
				text: '步骤四',
				desc: '描述信息'
			}
		]
	},

	/**
	 * 组件的方法列表
	 */
	methods: {

	}
})
