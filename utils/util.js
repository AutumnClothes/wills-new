function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return year+'年' + month+'月' + day+'日' + ' ' + hour+'时' + minute+'分'+ second+'秒'
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//获取设备height =>rpx
function systemHeight() {
  let scHeight
  wx.getSystemInfo({
    success: function(res) {
      scHeight = (res.windowHeight * (750 / res.windowWidth))
    }
  })
  return scHeight
}

//计算content的高度
function systemForm(){
  let contentHeight
  wx.getSystemInfo({
    success: function (res) {
      contentHeight = ((res.windowHeight * (750 / res.windowWidth)) - 217);
    }
  })
  return contentHeight
}

module.exports = {
  formatTime: formatTime,
  systemHeight: systemHeight,
  systemForm:systemForm,
}



