package com.common.utils;

import java.io.IOException;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.EntityBuilder;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

@SuppressWarnings("deprecation")
public class HttpClientUtil {

	private static HttpClient httpClient = new DefaultHttpClient();

	public static String sendGet(String url) {
		String body = "";
		HttpGet get = new HttpGet(url);
		try {
			HttpResponse response = httpClient.execute(get);
			HttpEntity entity = response.getEntity();
			if (entity != null) {
				body = EntityUtils.toString(entity, "utf-8");
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return body;
	}

	public static String sendPost(String url, String JsonStr) {
		String body = "";
		HttpPost post = new HttpPost(url);
		HttpEntity entity = EntityBuilder.create().setContentType(
				ContentType.TEXT_PLAIN.withCharset("utf-8"))
				.setContentEncoding("utf-8").setText(JsonStr).build();
		post.setEntity(entity);

		try {
			HttpResponse response = httpClient.execute(post);
			HttpEntity responseEntity = response.getEntity();
			if (responseEntity != null) {
				body = EntityUtils.toString(responseEntity, "utf-8");
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		BaseLog.debug("response:" + body);
		return body;
	}
	
}
