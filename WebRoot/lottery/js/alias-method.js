/*
 * 本插件使用的算法为alias method，具体介绍请参照该帖子http://www.cnblogs.com/younggun/p/3249772.html（非作者博客）
 */
var AliasMethod = (function () {
	var prizes = null;
	var props = null;
	var alias = null;
	
	// 初始化算法模型
	this.init = function (items) {
		prizes = items;
		var len = prizes.length;
		props = new Array();
		alias = new Array();
		
		var smallProps = new Array();
		var largeProps = new Array();
		for (var i = 0; i < len; ++i) {
			var pb = (items[i].probability * len).toFixed(2);
			props.push(pb);
			alias.push(null);
			if (props[i] < 1.0) {
				smallProps.push(i);
			} else {
				largeProps.push(i);
			}
		}
		while (smallProps.length != 0 && largeProps.length != 0) {
			var smallIndex = smallProps.shift();
			var largeIndex = largeProps.shift();
			alias[smallIndex] = largeIndex;
			props[largeIndex] = (props[largeIndex] - (1 - props[smallIndex])).toFixed(2);
			if (props[largeIndex] < 1.0) {
				smallProps.push(largeIndex);
			} else {
				largeProps.push(largeIndex);
			}
		}
		while (smallProps.length != 0) {
			props[smallProps.shift()] = 1.0;
		}
		while (largeProps.length != 0) {
			props[largeProps.shift()] = 1.0;
		}
	}
	
	// 随机生成一个奖项，即中奖
	this.generate = function () {
		var posibility = Math.random();
		var randomCol = parseInt(Math.random() * prizes.length);
		return prizes[posibility < props[randomCol] ? randomCol : alias[randomCol]];
	}
	
	// 奖项
	this.Prize = function (index, name, probability) {
		this.index = index;
		this.name = name;
		this.probability = probability;
	}
	
	// 测试
	this.test = function () {
		var prizeArray = new Array();
		var gutoufan = new AliasMethod.Prize(0, "骨头饭", 0.06);
		prizeArray.push(gutoufan);
		var dazuiba = new AliasMethod.Prize(1, "大嘴巴", 0.2);
		prizeArray.push(dazuiba);
		var qiandaohu = new AliasMethod.Prize(2, "千岛湖", 0.08);
		prizeArray.push(qiandaohu);
		var quzhoucai = new AliasMethod.Prize(3, "衢州菜", 0.15);
		prizeArray.push(quzhoucai);
		var laodifang = new AliasMethod.Prize(4, "老地方", 0.12);
		prizeArray.push(laodifang);
		var huangmenji = new AliasMethod.Prize(5, "黄焖鸡", 0.12);
		prizeArray.push(huangmenji);
		var zhengbaihui = new AliasMethod.Prize(6, "蒸百惠", 0.06);
		prizeArray.push(zhengbaihui);
		var dengdeng = new AliasMethod.Prize(7, "等等", 0.06);
		prizeArray.push(dengdeng);
		var ciwudamian = new AliasMethod.Prize(8, "次坞打面", 0.05);
		prizeArray.push(ciwudamian);
		var sichuan = new AliasMethod.Prize(9, "四川", 0.1);
		prizeArray.push(sichuan);
		
		AliasMethod.init(prizeArray);
		var count = 0;
		for (var i = 0; i < 10000000; ++i) {
			var prize = this.generate();
			if ('大嘴巴' == prize.name) {
				++count;
			}
		}
		console.log(count/10000000);
	}
	
	return this;
})();