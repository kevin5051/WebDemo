package com.common.utils;

import com.alibaba.fastjson.serializer.SerializerFeature;

public class Constant {
	
	//public static final int OTHER_OTHER_REASON_ID = 10000; // other_repair_reason_id 其他
	
	public static final String REDIS_PREFIX = "golf";
	public static final String PWD_KEY = "GOLF2015";
	
	public static final SerializerFeature[] FEATURES = {
		SerializerFeature.WriteNullNumberAsZero,
		SerializerFeature.WriteNullStringAsEmpty,
		SerializerFeature.DisableCircularReferenceDetect
	}; 
	
	
}
