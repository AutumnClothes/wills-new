// pages/clienta/realchat/realchat.js
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    target:'',
    inputHeigth: '0',
    scrollHeigth: '',
    chrildId: 'news-see-id',
    extendHid: false,
    inputdo: true,
    extenddo: true,
    //本体头像
    selfPortrait:'',
    //目标头像
    targetPortrait: '',
    //底部加号数据
    inputExtend: [
      {
        text: '图片',
        img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACtElEQVRoge3ZzWtVRxiA8Z8nAYtoSEG6rG7Eggu7cBFaUGmLG1cKhdqFoqsUCxZd2JJVFILdqAQLin9AS6FCaZtCSJWu6kY3SmrbINTQTcWPmniF1hgXc1OjJvfOzLnJuYE8cBbDeWfmfe6dc+bjrBj4/CRswAm8hy7tzQOM4FP80YmNuIzuKrNKoAu78Q56CgxYOsnPphsDhTBslio7Cu0/5huxuqg6g7IsC1RNjsBN9GIdVuL1enmshXlFkyowhM04h1v4F+P18pv4rqXZRZAicAPvY3Ke+w/xAX4tm1QKKQLHUWsSU8Ox/HTSSRGIHR7f5ySSS6zARP2KYVJYcJVhGndiAmMF1uCVyNiV9fhcfsQbWIst+KtRcMoQil0zvYsVCe3OZhA78Xu9fAUHGlVIEehDR5OYjnpcDt/gE2H4zGa4UaUUgR6cMb9EgdN4K6HNGUax38vJNyV1IuvFRWz3TKQD23AJH6cmgH+EDUrsS+I5OjPqbBWSreFvvIZVOZ0Lv/g+/JZZP0tghlVYX6I+YXL8tkwDVa5Gh9BftpGqBMbwIZ6UbagKgRp2CQ9vaRZbYFp4XV5vVYOtEPhKeH3+HBF7El+3oM//KSvwJfbgC2EJcapB7AiOluzvJcoIjOPgrPIUDuMjPH4h9k/hoZ0q0d+c5ArMjOV7c9w7KyzIZmbWmjDT3s7sqyG5AoP4qcH9Ybwt7JsP4mpmP03JmYlH8VlE3DVsMv8euiWk/gP/YS8eRcYvaPKkC/QLm4y2IUXgF+EjSFsRKzApDJ2WvwbLEitwREVHh82IEfgB5xc6kVxiBA7J2KsuFjECc822bUOMwCm8utCJ5BIjsBd3hWFU1VVKoK1ZFqiaQvmj8CqZLISt3lJluBBOk+9XnUkG99FXCB/venBB5gHrIjMh5NqDG08BGv6Vyx2k0TAAAAAASUVORK5CYII='
      }, {
        text: '常用语',
        img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABXUlEQVRoge3asUrDUBSH8Z/BUcTBQXQWV8fOog7ipI/gSwjuRRefQF/BxUFQH8CxY8UHcKkgrbsObUVKm1iT2yT2fnCH8oec88HNyRm60Ly4hE2cYxfL6kEXjzjFyyK28ISVMrv6A8s4wg4aCZrqJ/GTFTQT/etUd/YT9Xkn0lhKyu6gKKJI1YgiVSNL5A7rg3OXki8EPpPq/1rkBK+Dc5KSh2ZS/W+muVqf+XrJTWr9LJErrGED1yl5aCbV/2Yx4wEH0q9OVj4z5mZq1YYoUjWiSNWIK8pIHpq4ogyJK8qsmZupVRuiSNWIIlUjrigjeWjiijIkriizZm6mVm2IIlXjX4l0y26iAD4S/b9B1J37BGd4L7uTHLzjLEEbDdygV2pL09HT77mB9vDL/ozjggqs4gHbE/IW9tApqB7CTK2OfqOtMVkQCcKN33EywSTIXhrzMJS5Hfw+xFuoYl8SElPLk24S4QAAAABJRU5ErkJggg=='
      }, {
        text: '资讯',
        img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABZUlEQVRoge3XMWsUQRgG4OeWYCXhSKWXOuQvXB2OFJb2VulTipD+SFIEtI6VfdqA+AP8CYI/IJVRor0Wd8gVuXP2dvbmO5kHttqZ5XuZW97bwfTiSqIDnGOC3dRNPXrAJ7zB153ETYf4jGFfU61hFy9xhHGTuGkqVohFQ0xTg0z6nCSD49QgEd6JVZ6mBgmvBommBpm7xQiDf1yj+dp19q56RrYgJ7hLWHc3X7vO3lXP+KtrkLaDdPV72Y2S78g1nrVYv4/3y26m/tfqwwt5TgmzE3mCt/hmdnSL19bYwSVOSw/SVYNXpYfIocFe6SFyqM2eQahm7yJUsz9vsbZN+S3TW7OntvNjrRyq2bu0c/Zm/y/UINHUINFs6ps9xxXimz2HXpt904o3ew5hmz2rbftpLVWDRFODRFODRFODRFODRFODBPOrwX3pKTL42OBD6Sk6+oGzBq/xDt/LztPaT9xgjC9/AE2AOmrkqXL0AAAAAElFTkSuQmCC'
      }, {
        text: '产品',
        img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABfElEQVRoge3YsU7cQBRG4Q9riZaGjoIm0oYuXZqIMj3wABR5jZiIHkGTguUJoogSKRJpUOgoqJDS7WOsAj0Uk8DiGGnZHcdjNKcbe+z7H89cW/LC3sEXNWzgtO5EAmziR/VgUTOxj8PG48zOUMj4iDqRT3jTeJzZGaCsHqyKDPD5v8SZjx0h6z1VkUM1y5Yg/2z/SZENoZG6wqaQGQ8ifaGJusZ94/8VKVX2XEcYCP2imBx0lBKDQnca/Cn6GPaw1XaSGNR9EDvJixHp4TbSvRZmvC5K/RezIlkkNbJIamSR1MgiqZFFUiOLpEYWSY0sMiVLOMJ3rDRZqNfgvd/hG97+Gf/CR5w3UayJFSmEP/qXHiRgFWfYx2ITRWPyWnjiB3j1RL0SF1iLWTimyLawfT5MMfc9roStFoWYPXL8zPnL+BqreH79pkYWSY0skhpZJDWySGoU+N12iAjcFPjZdooInBXYxbjtJHMwxm6BEdZxgutWIz2PayHzOkZ3ojoqsugPrI4AAAAASUVORK5CYII='
      },
    ],
    //消息框一测试数据
    newsOne: {
      imgputh: '',
      content: '中国基金业20周年“十大重要事“件 投票活动正式启动啦，请大声道撒',
      time: '2018/09/16 14:18'
    },
    //消息框二测试数据
    content: '中国基金业20周年中国基金业20周年中国基金业20周年中国基金业20周年中国基金业20周年中国基金业20周年',
    content2: '中国基金业20周年',
    //see测试数据
    see: {
      name: '用户二',
      action: '查看了',
      text: '文档一'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
		this.data.target = "123";
    let scaHeight = util.systemHeight()
    let scbHeight = (scaHeight - 246)
    that.setData({
      scrollBottom: scbHeight
    })
    that.setData({
      oneimgputh: that.data.newsOne.imgputh,
      onecontent: that.data.newsOne.content,
      onetime: that.data.newsOne.time,
      newName: that.data.see.name,
      newAction: that.data.see.action,
      newText: that.data.see.text,
      chrildId: that.data.chrildId,
    })
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
  //左上角返回
  backTo() {
    wx.navigateBack({
      delta: 1
    })
  },
  //input焦点获取
  inputOn(event) {
    var that = this
    that.data.inputdo = true
    that.data.extenddo = true
    that.extendOut()
    let scaHeight = util.systemHeight()
    wx.getSystemInfo({
      success: function (res) {
        let scrollRpx = ((event.detail.height * (750 / res.windowWidth)) + 246);
        let windowHeight = scaHeight - scrollRpx;
        that.setData({
          inputBottom: event.detail.height,
          scrollBottom: windowHeight
        })
      }
    })
    that.setData({
      chrildId: that.data.chrildId
    })
  },
  //input焦点失去
  inputOut() {
    var that = this
    if (that.data.inputdo) {
      let scaHeight = util.systemHeight()
      let scbHeight = scaHeight - 246;
      that.setData({
        inputBottom: '0',
        scrollBottom: scbHeight,
        extendHid: false,
      })
      that.setData({
        chrildId: that.data.chrildId,
      })
    }
  },
  //extend点击
  extendBind() {
    var that = this
    that.data.inputdo = false
    if (that.data.extenddo) {
      let scaHeight = util.systemHeight()
      let scbHeight = (scaHeight - 526)
      that.setData({
        inputBottom: '280r',
        scrollBottom: scbHeight,
        extendHid: true,
      })
      that.setData({
        chrildId: that.data.chrildId,
      })
      that.data.extenddo = false
    } else {
      that.extendOut()
      that.data.extenddo = true
    }

  },
  //回缩extend
  extendOut() {
    var that = this
    if (that.data.extendHid) {
      let scaHeight = util.systemHeight()
      let scbHeight = (scaHeight - 246)
      that.setData({
        scrollBottom: scbHeight,
        extendHid: false,
        inputBottom: '0',
      })
    }
  }
})