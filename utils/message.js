var config =require("../config.js");
var storage = require("storage.js");

//----------------------

// var socketIsOpen = false;


var thisobject = {
	socketIsOpen : false
};
thisobject.openConection =  id =>{
    // 打开连接 
    wx.connectSocket({
      url: config.websocketurl
    });
    // 当连接创建。
		
    wx.onSocketOpen(function (r) {
			thisobject.socketIsOpen = true;
      //发送创建连接消息
      var msg = {id:id, messagetype: "c" };
      wx.sendSocketMessage({
        data: JSON.stringify(msg)
      })
    })
  }
	/**
	 * 
	 */
	thisobject.sendMessage = function(fromid,toid,portrait,nickname,content,contenttype){
		
		//-----------保存到本地库
		var msd = {cusid:toid,portrait:portrait,nickname:nickname,
			contenttype:contenttype,content:content,direction:"send"};
		storage.saveMessageToStorage(msg);
		/**
		 * 	       	消息类型 ，   c 创建连接，      s 单点消息        g群发
	*		内容类型          t  img   article   
	*      {fromid:"1",toid:"2",messagetype:"c",contenttype:"t",content:""}
	*      {messagetype:"c",id:"1"}
		 */
		msd =  {fromid:fromid,toid:toid,messagetype:"s",contenttype:contenttype,content:content};
		var messageObject = JSON.stringify(msd);
		wx.sendSocketMessage({
			data:messageObject
		});
	}
	
	thisobject.sendGroupMessage = function(fromid,togroupid,name,content,contenttype,members){
		
		//-----------保存到本地库
		var msd = {groupid:togroupid,name:name,
			contenttype:contenttype,content:content};
		storage.saveGroupMessageToStorage(msg);
		for(var i = 0 ; i<members.length ; i++){
			var one =  members[i];
			msd = {cusid:one["cusid"],portrait:one["portrait"],nickname:one["nickname"],
				contenttype:contenttype,content:content,direction:"send"};
			storage.saveMessageToStorage(msd);
		}
		/**
		* 	       	消息类型 ，   c 创建连接，      s 单点消息        g群发
	*		内容类型          t  img   article   
	*      {fromid:"1",toid:"2",messagetype:"c",contenttype:"t",content:""}
	*      {messagetype:"c",id:"1"}
		*/
		msd =  {fromid:fromid,togroupid:togroupid,messagetype:"g",contenttype:contenttype,content:content};
		var messageObject = JSON.stringify(msd);
		wx.sendSocketMessage({
			data:messageObject
		});
	}
	
	
module.exports= thisobject;