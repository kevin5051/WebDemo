package com.common.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

/*
 * @version golf 1.5
 * @auth Kevin
 * @date 2015年7月18日 下午5:00:02
 * @comment 
 */
public class DateUtils {
	
	public static String getNowDate(){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH时mm分");
		return sdf.format(new Date());
	}
	public static String getDateStr(){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		return sdf.format(new Date());
	}
	
}
