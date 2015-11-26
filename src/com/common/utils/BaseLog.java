package com.common.utils;

import org.apache.log4j.Logger;

public class BaseLog {
	public static Logger log = Logger.getLogger("parameter");

	public static void debug(Object logStr) {
		log.debug(logStr);
	}

	public static void info(Object logStr) {
		log.info(logStr);
	}
	
	public static void warn(Object logStr) {
		log.warn(logStr);
	}

	public static void error(Object logStr) {
		log.error(logStr);
	}
	
	public static void error(Object message, Throwable t) {
		log.error(message, t);
	}
	
}
