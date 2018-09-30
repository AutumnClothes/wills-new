// pages/customer/customer.js
var api = require('../../../utils/api.js');
var asd =  require('./asd.js');
var network = require('../../../utils/network.js')

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    tab2: {
      type: Boolean,
      value: ''
    }
  },
  data: {
    customer: [],
    idx: 0,
    current: 'tab1',
    current_scroll: 'tab1',
    souList: [],
    hidden: true,
  },
  attached() {
    this.tapchange()
  },
  methods: {
    tapchange() {
      var bb = this.data.tab2
      if (bb) {
        // console.log("代码块2执行：", bb)
        this.onReady()
      }
    },
    //列表渲染
    indexListUp(data) {
      let stockName = new Array();
      const word = [];
      //不显示不存在的索引
      data.forEach((item) => {
        let pinyin = asd.ConvertPinyin(item.nickname)
        let firstName = pinyin.substring(0, 1).toUpperCase();
        word.push(firstName)
      })
      word.sort();
      let words = [...new Set(word)]
      words.forEach((item, index) => {
        stockName[index] = {
          key: item,
          list: []
        }
      })
      data.forEach((item) => {
        let pinyin = asd.ConvertPinyin(item.nickname)
        let firstName = pinyin.substring(0, 1).toUpperCase();
        let index = words.indexOf(firstName);
        stockName[index].list.push({
					id:item.id,
          name: item.nickname,
          key: firstName,
          portraitpath: item.portraitpath
        })
      })
      this.data.customer = stockName;
      this.setData({
        indexList: this.data.customer
      })
    },
    //tabs标签点击事件
    handleChange({ detail }) {
      this.setData({
        current: detail.key
      });
      if (detail.key == "tab1") { this.indexListUp(this.data.stock) }
      else { this.indexListUp(this.data.latent) }
    },
    handleChangeScroll({ detail }) {
      this.setData({
        current_scroll: detail.key
      });
    },
    //input事件
    inputentry(e) {
      this.data.souList = []
      this.souList(e)
    },
    //搜索List
    souList(e) {
      var that = this
      let entry = e.detail.value
      var arr = that.data.customers
      var arr1 = api.deepcopy(arr)
      arr1.forEach((item) => {
        let nameArr = item.nickname
        if (nameArr.search(entry) != -1 && entry.length != 0) {
          that.data.souList.push(item)
        }
      })
      that.data.souList.forEach((item) => {
        let nameArr = item.nickname
        item.nickname = nameArr.replace(entry, "<span style='color:#ff8a01'>" + entry + "</span>")
      })
      that.setData({
        souList: that.data.souList
      })
    },
    //聚焦
    inputfocus(e) {
      this.setData({
        hidden: false
      })
    },
    //失去
    inputblur(e) {
      let entry = e.detail.value
      if (!entry) {
        this.setData({
          souList: []
        })
      }
    },
    //完成
    inputconfirm(e) {
    },
    //取消搜索
    cancelbind() {
      var pages = getCurrentPages()
      this.setData({
        hidden: true,
      })
    },
    onReady: function () {
      //列表数据请求
			var rdata = { managerid: '4', funcNo: '1001' };
      network.postRequest(rdata).then(res => {
        if(res.error_no == '0'){
					var resData = res.data;
					this.setData({
						customers: resData
					})
					var stock = new Array();
					var latent = new Array();
					resData.forEach(item => {
						if (item.newcus == "1") {
							stock.push(item)
						} else {
							latent.push(item)
						}
					})
					this.setData({
						stock: stock,
						latent: latent
					})
					this.indexListUp(stock);
				}else{
					
				}
      },rej =>{
				
			});
    },
    //标签--跳转
    nextTo(){
      wx.navigateTo({
        url: '/pages/clienta/usertag/usertag',
      })
    },
    toChat(e){
			// console.log(e);
			var toData = e.target.dataset;
			wx.setStorageSync("torealchatpage",toData);
      wx.navigateTo({url: '/pages/clienta/realchat/realchat'})
    }
  }
  
})