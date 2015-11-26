;
(function(){
	var dateViewFmt = "dd-MM-yyyy", dateTimeFmt = "dd-MM-yyyy hhmm", dateGkyFmt = "yyyy-MM-dd HH:mm", timeGkyFmt = "yyyy-MM-dd HH:mm:ss";
	var fxRateScale = 6, moneyScale = 2;

	if(typeof jQuery.fn.render == "undefined"){
		alert("This page need add javascript library \"jsrender\"!");
	}

	if(typeof $DateFormat == "undefined"){
		alert("This page need add javascript date format library!");
		// $("head").append("<script src='/crd/scripts/common/DateEx.js'><\/script>");
	}

	function dateFmt(val, fmt){
		if(val == null){
			val = "";
		} else if(val instanceof Date){
			val = $DateFormat.fmtDate(val, fmt);
		} else if(typeof val == "string"){
			if($.trim(val.length) > 0){
				val = $DateFormat.fmtDate($DateFormat.dateFromMysql(val), fmt);
			}
		} else if(typeof val == "number"){// milliseconds
			val = $DateFormat.fmtDate(new Date(val), fmt);
		}
		return val;
	}

	function numberFmt(val, scale){
		if(val == null){
			val = "";
		} else if(isFinite(val)){
			val = Number(val).toFixed(scale);
		}
		return val;
	}

	$.views.converters("date", function(val){
				return dateFmt(val, dateViewFmt);
			});

	$.views.converters("dateTime", function(val){
				return dateFmt(val, dateTimeFmt);
			});
	
	$.views.converters("datetime", function(val){
		return dateFmt(val, dateGkyFmt);
	});
	
	$.views.converters("time_format", function(val){
		return dateFmt(val, timeGkyFmt);
	});

	$.views.converters("fxRate", function(val){
				return numberFmt(val, fxRateScale);
			});

	$.views.converters("money", function(val){
				return numberFmt(val, moneyScale);
			});

	$.views.converters("percent", function(val){
				if(val == null){
					val = "";
				} else if(isFinite(val)){
					val = (Number(val) * 100).toFixed(2) + "%";
				}
				return val;
			});

})();