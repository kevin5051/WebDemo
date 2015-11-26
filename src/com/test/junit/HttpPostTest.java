package com.test.junit;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import com.common.utils.Constant;

public class HttpPostTest {

	public static void post(String httpsUrl, String postStr) {

		try {
			// 创建连接
			URL url = new URL(httpsUrl);
			HttpURLConnection connection = (HttpURLConnection) url
					.openConnection();
			connection.setDoOutput(true);
			connection.setDoInput(true);
			connection.setRequestMethod("POST");
			connection.setUseCaches(false);
			connection.setInstanceFollowRedirects(true);
			connection.setRequestProperty("Content-Type","application/x-www-form-urlencoded");
			//connection.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)");
			connection.connect();

			// POST请求
			DataOutputStream out = new DataOutputStream(
					connection.getOutputStream());

			out.write(postStr.getBytes());
//			out.writeBytes(postStr);
			out.flush();
			out.close();

			// 读取响应
			BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			String lines;
			StringBuffer sb = new StringBuffer("");
			while ((lines = reader.readLine()) != null) {
				lines = new String(lines.getBytes(), "utf-8");
				sb.append(lines);
			}
			System.out.println(sb);		// sb.toString()就是返回的XML串了
			
			reader.close();
			// 断开连接
			connection.disconnect();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		String baseUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx4642a1c6933e1cfc&secret=3e539a4d2d775c12eb8a347a21a1c649 ";
		String postStr="{\"touser\":\"o_Yfosn4qQ58OsrWInbdzX-eTIg8\",\"template_id\":\"3PoEncrv0mB7XI2al7wLNbCNSYXpNsdGC0VZMvhDJRY\",\"url\":\"http://www.baidu.com\",\"topcolor\":\"#FF0000\",\"data\":{\"first\":{\"value\":\"黄先生\",\"color\":\"#173177\"},\"keywora1\":{\"value\":\"06月07日 19时24分\",\"color\":\"#173177\"},\"keyword2\":{\"value\":\"0426\",\"color\":\"#173177\"},\"keyword3\":{\"value\":\"消费\",\"color\":\"#173177\"},\"remark\":{\"value\":\"人民币260.00元\",\"color\":\"#173177\"}}}";
		post(baseUrl, postStr);
	}
	
}