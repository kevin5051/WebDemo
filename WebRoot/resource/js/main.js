function tips(language) {
  var a = document.body,
  b = null,
  c = !1;
  _css = '.wxtips{text-align:left;position:fixed;top:0;left:0;width:100%;z-index:999;height:100%;background:rgba(0,0,0,0.5);}.wxtips-doc{background:#fff;border-radius:0 0 6px 6px;margin:0 10px;padding:15px}.wxtips-doc h3{font-size:18px;margin-bottom:10px;}.wxtips-doc i{display:inline-block;background:url("/GKYManage/img/wx_tips.png") no-repeat;background-size:61px auto;line-height:300px;overflow:hidden;height:27px;width:48px;margin:0 5px;vertical-align:middle;}.wxtips-doc ol{padding-left:22px;}.wxtips-doc ol li{margin:12px 0 26px;line-height:1.4em;}.wxtips-doc ol li:before{margin-left:-14px;}.wxtips-doc i.wxtips-top{position:fixed;top:10px;right:20px;width:31px;height:56px;background-position:0 -175px;}';
  var d = function (d) {
	var e = document.createElement('style');
	//var htmlContent = '<div class="wxtips-doc"><h3>Please download by Browser :</h3><ol><li>Click the button<i style="background-position: 0 -112px">...</i>or<i style="background-position: 0 -143px">分享</i></li>' + ('ios' !== d ? '<li>Click the button<i style="margin-top:-23px; width: 47px; height: 47px; background-position: 0 -61px;">浏览器</i><br>to download EzyCloud in the browser</li>' : '<li>Choose Safari to <br>download EzyCloud<i style="margin-top:-28px; width: 61px; height: 61px;">Safari</i></li>') + '</ol>' + '<i class="wxtips-top">右上角</i>' + '</div>' ;
	var htmlContent = '<div class="wxtips-doc"><h3>请用浏览器打开下载：</h3><ol><li>点击右上角的<i style="background-position: 0 -112px">...</i>或者<i style="background-position: 0 -143px">分享</i></li>' + ('ios' !== d ? '<li>选择在浏览器中打开<br>可下载广科掌上通App<i style="margin-top:-23px;width: 47px; height: 47px; background-position: 0 -61px;">浏览器</i></li>' : '<li>选择在Safari中打开<br>即可下载广科掌上通<i style="margin-top:-28px; width: 61px; height: 61px;">Safari</i></li>') + '</ol>' + '<i class="wxtips-top">右上角</i>' + '</div>' ;
	e.innerHTML = _css,
	document.head.appendChild(e),
	b = document.createElement('div'),
	b.className = 'wxtips',
	b.innerHTML = htmlContent,
	a.appendChild(b),
	b.addEventListener('click', function () {
	  c && (b.style.display = 'none', c = !1)
	})
  },
  e = window.navigator.userAgent;
  e.indexOf('MicroMessenger') > - 1 && a.addEventListener('click', function (a) {
	a.target.className.indexOf('download') >= 0 && (a.preventDefault(), null != b ? b.style.display = 'block' : d(e.indexOf('iPhone') > 0 ? 'ios' : '')),
	c = !0
  })
};
