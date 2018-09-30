// dist/topbar/topbar.js
Component({
  properties: {
    text:{
      type:String,
      value:''
    },
    backBox:{
      type:Boolean,
      value:''
    },
    delta:{
      type:Number,
      value:''
    }
  },
  data: {
    topHeight:''
  },

  attached(){
    this.systemForm()
    this.setData({
      topHeight: this.data.topHeight,
      backBox: this.data.backBox
    })
  },
  methods: {
    systemForm() {
      var that = this
      wx.getSystemInfo({
        success: function (res) {
          that.data.topHeight = ((res.statusBarHeight * (750 / res.windowWidth)) + 10)
        }
      })
    },
    backTo(e){
      let toNum = e.target.dataset.toDelta
      wx.navigateBack({
        delta: toNum
      })
    }
  }
})
