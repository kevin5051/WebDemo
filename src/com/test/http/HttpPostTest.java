package com.test.http;

import com.common.utils.HttpPostUtil;

public class HttpPostTest {
	public static void main(String[] args) {
		String baseUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx4642a1c6933e1cfc&secret=3e539a4d2d775c12eb8a347a21a1c649 ";
		String postStr="{\"touser\":\"o_Yfosn4qQ58OsrWInbdzX-eTIg8\",\"template_id\":\"3PoEncrv0mB7XI2al7wLNbCNSYXpNsdGC0VZMvhDJRY\",\"url\":\"http://www.baidu.com\",\"topcolor\":\"#FF0000\",\"data\":{\"first\":{\"value\":\"黄先生\",\"color\":\"#173177\"},\"keywora1\":{\"value\":\"06月07日 19时24分\",\"color\":\"#173177\"},\"keyword2\":{\"value\":\"0426\",\"color\":\"#173177\"},\"keyword3\":{\"value\":\"消费\",\"color\":\"#173177\"},\"remark\":{\"value\":\"人民币260.00元\",\"color\":\"#173177\"}}}";
		HttpPostUtil.post(baseUrl, postStr);
	}
	
}