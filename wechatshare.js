
;(function($){
	$.fn.WechatShare = function(options){
        var settings ={
                appId: "",  //
                imgUrl: "",
                imgWidth: "200",
                imgHeight: "200",
                url: "",
                title: "",
                desc: "",
                callback: function () {
            }
		};

		settings = $.extend({}, settings, options);
		
        var onBridgeReady = function () {
            // 发送给朋友
            WeixinJSBridge.on("menu:share:appmessage", function (argv) {
                WeixinJSBridge.invoke("sendAppMessage", {
                    "appid": settings.appId,
                    "img_url": settings.imgUrl,
                    "img_width": settings.imgWidth,
                    "img_height": settings.imgHeight,
                    "link": settings.url,
                    "desc": settings.desc,
                    "title": settings.title
                }, function (res) { settings.callback(); });
            });

            // 发送到朋友圈
            WeixinJSBridge.on("menu:share:timeline", function (argv) {
                WeixinJSBridge.invoke("shareTimeline", {
                    "appid": settings.appId,
                    "img_url": settings.imgUrl,
                    "img_width": settings.imgWidth,
                    "img_height": settings.imgHeight,
                    "link": settings.url,
                    "desc": settings.desc,
                    "title": settings.title
                }, function (res) { settings.callback(); });
            });

            // 分享到微博
            WeixinJSBridge.on("menu:share:weibo", function (argv) {
                WeixinJSBridge.invoke("shareWeibo", {
                    "content": settings.title,
                    "url": settings.url
                }, function (res) { settings.callback(); });
            });

            // 分享到facebook
            WeixinJSBridge.on("menu:share:facebook", function (argv) {
                WeixinJSBridge.invoke("shareFB", {
                    "img_url": settings.imgUrl,
                    "img_width": settings.imgWidth,
                    "img_height": settings.imgHeight,
                    "link": settings.url,
                    "desc": settings.desc,
                    "title": settings.title
                }, function (res) { settings.callback(); });
            });
        };
                
		if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
        } else if (document.attachEvent) {
            document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
        }
	}
})(jQuery);