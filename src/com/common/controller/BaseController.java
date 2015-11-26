package com.common.controller;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.common.utils.BaseLog;
import com.common.utils.BaseResult;
import com.common.utils.Config;

public class BaseController {

	final String DEFAULT_RESPONSE_TEXT = "{\"result\":\"failed\",\"text\":\"System Error, please contact our staff\"}";
	
	@ResponseBody
	@ExceptionHandler({Exception.class})  
    public Object exception(Exception e) {  
		BaseLog.error(e.getMessage(), e);
       return new BaseResult(false, Config.getString("opfailed"));  
    }  
}
