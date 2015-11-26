var golf = (function() {
	var golf= {};
	Date.prototype.format = function (format) {  
        var o = {  
            "M+": this.getMonth() + 1,  
            "d+": this.getDate(),  
            "h+": this.getHours(),  
            "m+": this.getMinutes(),  
            "s+": this.getSeconds(),  
            "q+": Math.floor((this.getMonth() + 3) / 3),  
            "S": this.getMilliseconds()  
        };  
        if (/(y+)/.test(format)) {  
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
        }  
        for (var k in o) {  
            if (new RegExp("(" + k + ")").test(format)) {  
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));  
            }  
        }  
        return format;  
    };
	
   golf.getUrlVars = function (){
		var vars = [], hash;
		var url = window.location.href.replace("#", "");
		var hashes = url.slice(url.indexOf('?') + 1).split('&');
		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	};

	var countdown = 59;
	golf.settime = function(val){
		console.log(countdown);
		if (countdown == 0) {
			val.attr("onclick","getCode(this);");
			val.html("获取验证码");
			val.css("background","#ea5504");
			countdown = 59;
			return;
		} else {
			val.attr("onclick", "");
			val.html("重新发送(" + countdown + ")");
			val.css("background","gray");
			countdown--;
		}
		setTimeout(function() {
			golf.settime(val);
		}, 1000);
	};
	
	
	/************************  微信屏蔽掉右上角分享按钮  ***************************************/
	document.write("<script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>"); 
	golf.noShare = function(){
		/*$.post("../getShareSign.do",{
			"url" : window.location.href,
			"linkUrl" : ""
		},function(data){
			wx.config({
			    debug: false,
			    appId: data.appId,
			    timestamp: data.timestamp,
			    nonceStr: data.nonceStr, 
			    signature: data.signature,
			    jsApiList: ["hideAllNonBaseMenuItem"] 
			});
			wx.ready(function(){
				wx.hideAllNonBaseMenuItem();
			});
			wx.error(function(res){
				var description = ""; 
				for(var i in res){   
				   var property=res[i];   
				   description+=i+" = "+property+"\n";  
				} 
				alert(description); 
			    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
	
			});
		});*/
	};
	
/************************  微信屏蔽掉右上角分享按钮 ***************************************/

	
	/************************  微信分享配置  ***************************************/
	golf.share = function(share_id,amount,invite_code){
		/*$.post("../getShareSign.do",{
			"url" : window.location.href,
			"linkUrl" : "http://m.golf2win.com/golfwinner/authorize.do?share_id=" + share_id + "&invite_code=" + invite_code
		},function(data){
			wx.config({
			    debug: false,
			    appId: data.appId,
			    timestamp: data.timestamp,
			    nonceStr: data.nonceStr, 
			    signature: data.signature,
			    jsApiList: ["showMenuItems","onMenuShareTimeline","onMenuShareAppMessage"] 
			});
			wx.ready(function(){
				var linkUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4642a1c6933e1cfc&redirect_uri=" 
						+ data.encodeUrl + "&response_type=code&scope=snsapi_userinfo&state=grab#wechat_redirect";
				var imgUrl = "http://m.golf2win.com/golfwinner/resource/images/r_share.png";
				wx.showMenuItems({
				    menuList: ["menuItem:share:appMessage","menuItem:share:timeline"]
				});
				wx.onMenuShareTimeline({
				    title: '【球童专属】我刚刚抢了' + amount + '块，你也快来抢吧', 
				    link: linkUrl,
				    imgUrl: imgUrl, 
				    success: function () {
						$(".share-tip").hide();
						$("#mcover").show();
				    	$(".success-tip").show();
				    },
				    cancel: function () { 
				    }
				});
				wx.onMenuShareAppMessage({
					title: '【球童专属】我刚刚抢了' + amount + '元红包，你也快来抢吧', 
				    desc: '邀请球童球友加入【高球大战】，可获得更多奖励！', 
				    link: linkUrl,
				    imgUrl: imgUrl, 
				    type: 'link',
				    dataUrl: '',
				    success: function () { 
				    	$(".share-tip").hide();
				    	$("#mcover").show();
				    	$(".success-tip").show();
				    },
				    cancel: function () { 
				    }
				});
			});
			wx.error(function(res){
				var description = ""; 
				for(var i in res){   
				   var property=res[i];   
				   description+=i+" = "+property+"\n";  
				} 
				alert(description); 
			    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
	
			});
		});*/
	};
	/************************  微信分享配置 about ***************************************/
	
	
/************************  生成二维码和将canvas转化成图片<img></img> ***************************************/
	golf.utf16to8 = function(str) { //转码
		var out, i, len, c;
		out = "";
		len = str.length;
		for (i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if ((c >= 0x0001) && (c <= 0x007F)) {
		out += str.charAt(i);
		} else if (c > 0x07FF) {
		out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
		out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
		out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		} else {
		out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
		out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		}
		}
		return out;
	};
	golf.convertCanvasToImage = function(canvas) {
		var image = new Image();
		image.src = canvas.toDataURL("D://");
		return image;
	};
/************************  生成二维码和将canvas转化成图片<img></img> ***************************************/
	return golf;
})(jQuery);


