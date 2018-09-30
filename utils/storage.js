var app  = getApp();

var o = {};
function messageSaveProcess(){
	var message = wx.getStorageSync("MESSAGE");  //聊天列表
	if(message == "") message = {};
	app.globalData.saveProcessRunning = true;
	while(app.globalData.messageQueue.length!=0){
		var msd = app.globalData.messageQueue.pop();
		var cusid = msd["cusid"];
		var cusData = message[cusid];
		if(!cusData){ // 第一条消息
			cusData = {id:cusid,portrait:msd['portrait'],nickname:msd['nickname']};
			message[cusid] = cusData;
		}
		var timeline = new Date().getTime();
		var messagesList =  wx.getStorageSync("messageList"+cusid); //  单个人的聊天数据
		if(messagesList == ""){
			messagesList = [];
		}
		
		messagesList.push({
			//  send  or receive
			direction:msd["direction"],
			content:msd['content'],
			contenttype:msd['contenttype'],
			timeline:timeline
		});
		wx.setStorageSync("messageList"+cusid,messagesList);
	}
	wx.setStorageSync("MESSAGE",message);
	app.globalData.saveProcessRunning  = false;
}

/**
 * 
 一条消息的产生， 发出或者接收
 @param object{ cusid ,portrait,nickname,content,contenttype,direction}
 */

o.saveMessageToStorage = function(msd){
		app.globalData.messageQueue.unshift(msd);
		if(!app.globalData.saveProcessRunning )
				messageSaveProcess();
}

o.saveGroupMessageToStorage = function(msd){
	var message = wx.getStorageSync("GOUPMESSAGE");  //聊天列表
	if(message == "") message = {};
	var groupid = msd["groupid"];
	var groupData = message[groupid];
	if(!groupData){ 
		groupData = {groupid:groupid,groupname:msd['name']};
		message[groupid] = groupData;
	}
	var timeline = new Date().getTime();
	var groupMessageList =  wx.getStorageSync("groupMessageList"+groupid); //聊天记录
	if(messagesList == ""){
		messagesList = [];
	}
	messagesList.push({
		content:msd["content"],
		contenttype:msd["contenttype"],
		timeline:timeline
	});
	wx.setStorageSync("groupMessageList"+cusid,messagesList);
	wx.setStorageSync("GOUPMESSAGE",message);
}




module.exports= o;