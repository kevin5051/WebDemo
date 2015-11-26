'use strict';
var getCookie=function(cKey){
	var pairs = document.cookie.split(/; ?/);
	
	for(var i = 0,l=pairs.length;i<l;i++){
		//console.log(pairs[i]);
		var pair = pairs[i].split('=');
		if(pair[0]==cKey)
			return pair[1];
	}
	return '';
};

