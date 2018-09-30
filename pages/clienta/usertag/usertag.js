// pages/clienta/usertag/usertag.js
var api = require('../../../utils/api.js')
var network = require('../../../utils/network.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    usertag:true,
    tagArrLength:'0',
    _tag:'',
    tagArr: [...new Set()],
    tagarray:[],
    //标签页测试数据
    tagList:[],
    inputWidth:'',
    tagShow:true,
    changeColor:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        let topHeight = ((res.statusBarHeight * (750 / res.windowWidth)) + 10)
        that.setData({
          top_padding: topHeight
        })
      }
    });
    that.tagPost()
    that.setData({
      //给定初始宽度
      inputWidth: this.data.inputWidth
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

  // /**
  //  * 页面相关事件处理函数--监听用户下拉动作
  //  */
  // onPullDownRefresh: function () {

  // },

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom: function () {

  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //左上角跳转
  backTo(){
    console.log(this.data.usertag)
    if (this.data.usertag){
      this.setData({
        usertag: false
      })
    }else{
      this.setData({
        usertag:true
      })
    }
  },
  //底部管理
  adminTag(){
    this.setData({
      usertag: false
    })
  },
  //选中标签
  tagbind(e){
    console.log(e)
    let aa = e.currentTarget.dataset.id
    this.data.tagarray.push(aa)
    this.data.tagarray.forEach((item,index)=>{
      this.data.tagArr[index] = item
    })
    let arr = [...new Set(this.data.tagArr)]
    console.log(arr)
    this.setData({
      tagArrLength: arr.length,
    })
    //tag点击变色
  },
  //获取标签数据
  tagPost(){
    network.postRequest({ creator: '4', funcNo: 1010 }, "post").then((res)=>{
      let arr = res.data
      let tagArr = api.deepcopy(arr)
      let tagArrList = [{name:'',id:''}]
      //标签组
      tagArr.forEach((item,index)=>{
        tagArrList[index] = {
          name: item.groupname,
          id: item.groupid,
          color:'',
          list:[]
        }
      })
      //剔除相同标签组
      var r = [];
      for (var i = 0, l = tagArrList.length; i < l; i++) {
        for (var j = i + 1; j < l; j++)
          if (tagArrList[i].id == tagArrList[j].id) j = ++i;
        r.push(tagArrList[i]);
      }
      console.log("r", r)
      //标签
      let list = []
      tagArr.forEach((item,index) =>{
        list[index] = {
          title: item.tagname,
          num: item.quantity ,
          id: item.tagid
        }
      })
      r.forEach((item)=>{
        item.list = list
      })
      console.log('tagArrList', tagArrList)
      //标签组color
      let tagColor = ['#fba537', '#f8669c', '#72c976', '#71a8f4', '#b577f8']
      for (tagColor.length; tagColor.length < r.length;) { tagColor = [...tagColor, ...tagColor]}
      r.forEach((item,index)=>{
        r[index].color = tagColor[index]
      })
      this.setData({
        tagList: r
      })
    })
  },
  //创建标签(组)
  addTagArr() {
    network.postRequest({funcNo: 1006 }, "post").then((res) => {
      console.log("创建标签：", res)
    })
    this.tagPost()
  },
  //删除标签（组）
  deleteTagArr(e) {
    console.log("删除标签组：", e)
    let value1 = e.target.dataset.groupid
    network.postRequest({ groupid: value1, funcNo: 1007 }, "post").then((res) => {
      console.log("删除标签：", res)
    })
  },
  
  //删除标签（单）
  deleteTag(e){
    console.log("删除标签（单）:", e)
    // network.postRequest({ creator: '4', funcNo: 1009 }, "post").then((res) => {
    //   console.log("删除单标签：", res)
    // })
  },
  //修改标签名（组） && input事件
  alterTagArr(e) {
    //tag与input的切换
    if (e.target.dataset.show) {
      console.log('1')
      this.setData({
        tagShow: false,
      })
      e.target.dataset.show = false
    } else {
      console.log('2')
      this.setData({
        tagShow: true
      })
      e.target.dataset.show = true
    }
    // 
  },
  //修改标签=>input聚焦
  bindFocus(e){
    console.log('聚焦', e.detail)
  },
  //修改标签=>input输入
  bindInput(e){
    console.log('输入', e.detail)
    
  },
  //修改标签=>input失去焦点
  //修改标签=>input完成
  inputConfirm(e){
    console.log('完成', e)
    let value1 = e.currentTarget.dataset.groupid
    let value2 = e.detail.value
    console.log("value2:",typeof value2)
    network.postRequest({ groupid: value1, name: value2, funcNo: 1008 }, "post").then((res) => {
      console.log("修改标签：", res)
      this.tagPost()
    })
  },
})