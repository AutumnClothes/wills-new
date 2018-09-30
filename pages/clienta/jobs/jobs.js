var util = require('../../../utils/util.js')

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    tab3: {
      type: Boolean,
      value: ''
    }
  },
  data: {
    jobList:[
      { title: '资讯', imgputh: '',to:'jobs/newmsg/newmsg'},
      { title: '常用语', imgputh: '', to:'jobs/newmsg/newmsg' },
      { title: '产品及服务', imgputh: '', to: 'jobs/newmsg/newmsg' },
      { title: '个人专栏', imgputh: '', to: 'jobs/newmsg/newmsg'  },
      { title: '即时直播', imgputh: '', to: 'jobs/newmsg/newmsg' },
      { title: '模拟盘', imgputh: '', to: 'jobs/newmsg/newmsg' },
      { title: '邀请函', imgputh: '', to: 'jobs/newmsg/newmsg' }
    ]
  },
  attached() {
  },
  methods: {
    tapchange() {
      var bb = this.data.tab3
      if (bb) {
        console.log("代码块3执行：", bb)
      }
    },
    nextTo(e) {
      let url = e.target.dataset.toUrl
      wx.navigateTo({
        url: url
      })
    }
  }
  
})