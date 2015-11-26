var $DateFormat = {
	__lang: {
		en: {
				aWeekStr: ["wk", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				aLongWeekStr:["wk","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
				aMonStr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				aLongMonStr: ["January","February","March","April","May","June","July","August","September","October","November","December"],
				},			
				zhCN: {
					aWeekStr: ["\u5468","\u65E5","\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D"],
					aLongWeekStr:["\u5468","\u661F\u671F\u65E5","\u661F\u671F\u4E00","\u661F\u671F\u4E8C","\u661F\u671F\u4E09","\u661F\u671F\u56DB","\u661F\u671F\u4E94","\u661F\u671F\u516D"],
					aMonStr: ["\u4E00\u6708","\u4E8C\u6708","\u4E09\u6708","\u56DB\u6708","\u4E94\u6708","\u516D\u6708","\u4E03\u6708","\u516B\u6708","\u4E5D\u6708","\u5341\u6708","\u5341\u4E00","\u5341\u4E8C"],
					aLongMonStr: ["\u4E00\u6708","\u4E8C\u6708","\u4E09\u6708","\u56DB\u6708","\u4E94\u6708","\u516D\u6708","\u4E03\u6708","\u516B\u6708","\u4E5D\u6708","\u5341\u6708","\u5341\u4E00\u6708","\u5341\u4E8C\u6708"],
					},
				__end__:null,
				},		
		
	__pf : function(d, v) {
		var s = "" + v;
		while (s.length < d) {
			s = "0" + s;
		}
		return s;
	},
	
	dateFromMysql : function (d) {
		if(d == null || d == "") {
			d = "0001-01-01T00:00:00";
		}
		var t = d.split(/[- :TZ]/);
		for (var i = t.length ; i < 6 ; ++i) {
			t[i] = 0;
		}
		
		var date = new Date();
		date.setUTCFullYear(t[0]);
		date.setUTCMonth(parseInt(t[1],10) - 1);
		date.setUTCDate(t[2]);
		date.setUTCHours(t[3]);
		date.setUTCMinutes(t[4]);
		date.setUTCSeconds(t[5]);
		date.setUTCMilliseconds(0);
		return date;
	},

	fmtDate : function(dd, p, lang) {
		if (!lang) {
			lang = 'en';
		}
		var $lang = this.__lang[lang];
		var A = /yyyy|yyy|yy|y|MMMM|MMM|MM|M|dd|d|HH|H|mm|m|ss|s|DD|D|WW|W|w/g;
		var arr = (p.match(A));
		var l = arr.length;

		var y = dd.getUTCFullYear();
		var M = dd.getUTCMonth();
		var d = dd.getUTCDate();
		var h = dd.getHours();
		var m = dd.getUTCMinutes();
		var s = dd.getUTCSeconds();

		var lefts = p;
		var idx = 0;
		var rlt = "";
		for ( var i = 0; i < l; ++i) {
			var patt = arr[i];
			idx = lefts.search(patt);
			rlt += lefts.substr(0, idx);
			lefts = lefts.substr(patt.length + idx);
			switch (patt) {
			case "yyyy":
				rlt += this.__pf(4, y);
				break;
			case "MMMM":
				rlt += $lang.aLongMonStr[M];
				break;
			case "MMM":
				rlt += $lang.aMonStr[M];
				break;
			case "MM":
				rlt += this.__pf(2, M + 1);
				break;
			case "M":
				rlt += this.__pf(1, M + 1);
				break;
			case "dd":
				rlt += this.__pf(2, d);
				break;
			case "d":
				rlt += d;
				break;
			case "HH":
				rlt += this.__pf(2, h);
				break;
			case "H":
				rlt += h;
				break;
			case "mm":
				rlt += this.__pf(2, m);
				break;
			case "m":
				rlt += m;
				break;
			case "ss":
				rlt += this.__pf(2, s);
				break;
			case "s":
				rlt += s;
				break;
			}
		}
		return rlt;
	},
	__end__ : null,
};

var DateEx = $DateFormat;
function printableDate(d, fmt) {
	if (d == null || d == 0) 
		return "";
	return DateEx.fmtDate(DateEx.dateFromMysql(d), fmt);
}
