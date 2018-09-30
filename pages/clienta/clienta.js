Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'information',
    // current: 'jobs',
    taboneKey:true,
    tabtwoKey: true,
    tabthreeKey: true,
    tabfourKey: true,
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
    
  },
  handleChange ({ detail }) {
    this.setData({
      current: detail.key
    });
    if (detail.key == 'information'){
      this.selectComponent("#tabone").tapchange();
      this.setData({
        taboneKey:false
      })
    } else if (detail.key == 'customer'){
			this.selectComponent("#tabtwo").tapchange();
      this.setData({
        tabtwoKey: false
      })
    } else if (detail.key == 'jobs') {
      this.selectComponent("#tabthree").tapchange()
      this.setData({
        tabthreeKey: false
      })
    } else if (detail.key == 'mine') {
      this.selectComponent("#tabfour").tapchange()
      this.setData({
        tabfourKey: false
      })
    }
  },
  change(){
    wx.redirectTo({
      url: '../pagetwo/pagetwo',
    })
  }
})