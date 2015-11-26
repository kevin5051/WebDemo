 package com.common.utils;
 
 import java.security.MessageDigest;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

import org.apache.commons.lang.StringUtils;

import com.mchange.lang.ByteUtils;
 
 public class CommonUtils
 {
   private static String to32BitString(String plainText, boolean is32or16, String charset)
   {
     try
     {
       MessageDigest md = MessageDigest.getInstance("MD5");
       if (StringUtils.isNotBlank(charset))
         md.update(plainText.getBytes(charset));
       else {
         md.update(plainText.getBytes());
       }
       byte[] b = md.digest();
       String buf = ByteUtils.toHexAscii(b);
       if (is32or16) {
         return buf;
       }
       return buf.substring(8, 24);
     } catch (Exception e) {
       e.printStackTrace();
     }
     return "";
   }
 
   public static final String MD5generator(String s) {
     return to32BitString(s, true, "");
   }
 
   public static final String MD5generator(String s, String charset) {
     return to32BitString(s, true, charset);
   }
 
   public static final String MD5generator16Bit(String s, String charset) {
     return to32BitString(s, false, charset);
   }
 
   public static final String MD5generator16Bit(String s) {
     return to32BitString(s, false, "");
   }
 
   public static Date getShiftDate(Date d, int field, int shift) {
     Calendar c = Calendar.getInstance();
     c.setTime(d);
     c.set(field, c.get(field) + shift);
     return c.getTime();
   }
 
   public static String getRandString(int length) {
     String str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
     Random random = new Random();
     StringBuffer buf = new StringBuffer();
     for (int i = 0; i < length; i++) {
       int num = random.nextInt(62);
       buf.append(str.charAt(num));
     }
     return buf.toString();
   }
 
 }

