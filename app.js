import Toast from '/res/vant/toast/toast';
App({
  globalData: {
    userInfo: null
  },
  //全局API基地址
  // Domain: 'https://liteshop.com',
  Domain: 'https://fajmyfh.a6shop.net',
  //Domain: 'https://faliteshop.217dan.com',
  baseurl: '',


  onLaunch: function () {
    this.baseurl = this.Domain
    this.login()
  },

  onShow: function (options) {
    wx.setBackgroundColor({
      backgroundColor: '#fff',
    })
  },

  /**post请求*/
  post: function (url, data = {}, success = () => { }, fail = () => { }, complete = () => { }) {
    wx.showNavigationBarLoading();
    let App = this;
    data.token = wx.getStorageSync('token');
    wx.request({
      url: App.baseurl + url,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      data,
      success: function (res) {
        // console.log(res)
        if (res.data.code === 401) {
          App.check(App._post(url, data, success, fail, complete));
          return false;
        } else if (res.data.code === 0) {
          App.showError(res.data.msg, function () {
            fail && fail(res);
          });
          return false;
        }
        success && success(res);

      },
      fail: function (res) {
        App.showError(res.errMsg, function () {
          fail && fail(res);
        });
      },
      complete: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        complete && complete(res);
      }
    });
  },

  /**get请求*/
  get: function (url, data, success, fail, complete) {
    // wx.showNavigationBarLoading();
    let App = this;
    // 构造请求参数
    data = data || {};
    // 构造get请求
    let request = function () {
      data.token = wx.getStorageSync('token');
      wx.request({
        url: App.baseurl + url,
        header: {
          'content-type': 'application/json'
        },
        data,
        success: function (res) {
          if (res.data.code === 401) {
            App.check(App.get(url, data, success, fail, complete));
            return false;
          } else if (res.data.code === 0) {
            App.showError(res.data.msg);
            return false;
          } else {
            success && success(res.data);
          }
        },
        fail: function (res) {
          App.showError(res.errMsg, function () {
            fail && fail(res);
          });
        },
        complete: function (res) {
          wx.hideNavigationBarLoading();
          complete && complete(res);
        },
      });
    };
    request();
  },


  /**
   * 错误温馨提示
   * @param {string} msg 
   * @param {Function} callback 
   */
  showError: function (msg, callback) {
    wx.showModal({
      title: '温馨提示',
      content: msg,
      showCancel: false,
      success: function (res) {
        callback && callback();
      }
    });
  },

  check: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo);
    } else {
      this.login(cb);
    }
  },

  // 登录我
  login: function (cb) {
    var that = this;
    var token = wx.getStorageSync('token') || '';
    //微信登陆
    wx.login({
      success: (res) => {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: that.baseurl + '/addons/litestore/api.' + 'user/login_hawk',
            data: {
              code: res.code,
              token: token
            },
            method: 'post',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            success: (lres) => {
              console.log(lres);
              let { data } = lres
              if (data.code == 1) {
                this.globalData.userInfo = data.data.userInfo;
                wx.setStorageSync('token', data.data.userInfo.token);
                wx.setStorageSync('userInfo', data.data.userInfo)//自己加
                typeof cb == "function" && cb(that.globalData.userInfo);
              } else {
                console.log("用户登录失败");
                wx.showModal({
                  title: '用户登录失败',
                  content: '请检查您是否已经安装“第三方登录”插件，然后重试。',
                  showCancel: false,
                  success: function (res) {
                    that.login(cb);
                  }
                });
              }
              // }
            }
          });
        } else {
          console.log("用户失败")
        }
      }
    });
  },

  // 模态框
  modal(title = '提示', content, showCancel = true, success) {
    wx.showModal({
      title,
      content,
      showCancel,
      success() {
        success && success()
      }
    })
  }

})