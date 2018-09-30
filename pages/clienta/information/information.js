Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    tab1: {
      type: Boolean,
      value: ''
    },
    scrollHight: {
      type: Number,
      value: ''
    }
  },
  data: {
    text: '消息',
    current: 'dynamic',
    current_scroll: 'dynamic',
    num:'11',
    customer:'潜在客户',
    //聊天测试数据
    list:[
      {
        name:"用户一",
        portraitpath:"",
        text:"有图了嘛",
        time:"23：00"
      },
      {
        name: "用户二",
        portraitpath: "",
        text: "有图了嘛",
        time: "23：00"
      }
    ],
    //动态-标签测试数据
    labelList:[
      {
        name:'最新动态',
      },
      {
        name: '存量客户'
      },
      {
        name: '潜在客户'
      }
    ],
    label: '最新动态',
    //动态-list测试数据
    dynamicList:[
      {
        time: '23:00',
        name: '用户一',
        action: '查看了',
        text: '文档一'
      }, {
        time: '12月',
        name: '用户二',
        action: '查看了',
        text: '文档一文档一文档一'
      }, {
        time: '2017/03/02',
        name: '用户三',
        action: '查看了',
        text: '文档一文档一文档一文档一文档一文档一文档一文档一文档一'
      },
    ]
  },
  attached() {
    this.Systemform()
  },
  methods: {
    Systemform(){
      var that = this
      wx.getSystemInfo({
        success: function (res) {
          let windowHeight = ((res.windowHeight * (750 / res.windowWidth))-485); 
          let windowBarHeight = ((res.statusBarHeight * (750 / res.windowWidth))+10)
          that.setData({
            scrollHeight: windowHeight,
            groupHeight: windowBarHeight
          })
        }
      })
    },
    tapchange() {
      var bb = this.data.tab1
      if (bb) {
        console.log("代码块1执行：", bb)
      }
    },
    //tabs标签iview
    handleChange({ detail }) {
      this.setData({
        current: detail.key
      });
    },
    handleChangeScroll({ detail }) {
      this.setData({
        current_scroll: detail.key
      });
    },
    //table点击切样式
    labelBind(e){
      var itm = e.currentTarget.dataset
      console.log(itm.labelItm)
      this.setData({
        label: itm.labelItm
      })
    },
    groupTo(){
      wx.navigateTo({
        url: '/pages/clienta/group/group',
      })
    },
    toChat(){
      wx.navigateTo({
        url: '/pages/clienta/realchat/realchat',
      })
    }
  }
})