$(document).ready(function () {
	fontSize();
	miniheight();
	function fontSize(){
		var winwidth = $(window).width();
		if(winwidth<640){
			$("html").css("fontSize",winwidth/160*7+"px");
		}else{
			$("html").css("fontSize",640/160*7+"px");
		}
	}
	function miniheight(){
		var winheight = $(window).height();
		$(".section").css("min-height",winheight);
	}	
	$(window).on('resize',function(){
		fontSize();
		miniheight();
	});
	document.body.addEventListener('touchstart', function () { }); //css active ios 
});
