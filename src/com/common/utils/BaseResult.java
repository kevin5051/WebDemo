package com.common.utils;

/**
 * 返回消息的基本类型
 * @author YY
 *
 */
public class BaseResult {
	private String result;
	private String text;

	public BaseResult() {

	}
	
	public BaseResult(Boolean res, String text) {
		this.result = res ? "success" : "failed";
		this.text = text;
	}
	public BaseResult(String result, String text) {
		this.result = result;
		this.text = text;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
}
