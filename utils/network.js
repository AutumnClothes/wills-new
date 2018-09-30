//小程序的网络请求

var config  = require("../config.js");
function postRequest( data) {
  //构造函数
  var promise = new Promise((resolve, reject) => {
    //网络请求
		// var dataStr = JSON.stringify(data);
    wx.request({
      url:config.dataUrl ,
      data: data,//请求的参数
      method: "POST",//请求类型
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },//请求的 header
      success: function (res) {//服务器返回数据
        //如果返回的状态码为200
        if (res.data.statusCode = '200') {
          resolve(res.data);
        } else {
          reject("系统错误");
        }
      },
      error: function (e) {
        reject('网络出错');
      }
    })
		
  });
  return promise;
}


module.exports = {
  postRequest: postRequest
}