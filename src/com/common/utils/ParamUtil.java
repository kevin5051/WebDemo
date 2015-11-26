package com.common.utils;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;

public class ParamUtil {
	public static final SerializerFeature[] features =	{ 	
			SerializerFeature.WriteMapNullValue, // 输出空置字段
	        SerializerFeature.WriteNullListAsEmpty, // list字段如果为null，输出为[]，而不是null
	        SerializerFeature.WriteNullNumberAsZero, // 数值字段如果为null，输出为0，而不是null
	        SerializerFeature.WriteNullBooleanAsFalse, // Boolean字段如果为null，输出为false，而不是null
	        SerializerFeature.WriteNullStringAsEmpty,// 字符类型字段如果为null，输出为""，而不是null
	        SerializerFeature.DisableCircularReferenceDetect
	};
	
	public static JSONObject getEncryptJson(HttpServletRequest request) throws Exception{
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		int i = -1;
		InputStream in = request.getInputStream();
		while ((i = in.read()) != -1) {
			baos.write(i);
		}
		return JSON.parseObject(new String(RC4.enc_dec(baos.toByteArray())));
	}
	
	public static JSONObject getRequestJson(HttpServletRequest request) throws Exception{
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		int i = -1;
		InputStream in = request.getInputStream();
		while ((i = in.read()) != -1) {
			baos.write(i);
		}
		return JSON.parseObject(baos.toString());
	}
	
	public static byte[] encryptObject(Object obj) throws Exception{
		String result = JSON.toJSONString(obj,features);
		BaseLog.debug("返回参数:" + result);
		return RC4.enc_dec(result.getBytes());
	}

}
