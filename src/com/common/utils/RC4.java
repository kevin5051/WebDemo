package com.common.utils;

public class RC4 {
	private static String key = "TheRelentlessPursuitOfPerfection.ChatlinkFor2015";

	// 下面4个函数是暴露给外面使用的，函数参数里不用key
	/*
	 * 输入为数组，输出也为数组
	 */
	public static byte[] enc_dec(byte[] data) {
		if (data == null || key == null) {
			return null;
		}
		return RC4Base(data, key);
	}
		
	/*
	 * 下面几个函数是内部使用的，参数可带key
	 */	
	
	private static byte[] initKey(String aKey) {
		byte[] b_key = aKey.getBytes();
		byte state[] = new byte[256];

		for (int i = 0; i < 256; i++) {
			state[i] = (byte) i;
		}
		int index1 = 0;
		int index2 = 0;
		if (b_key == null || b_key.length == 0) {
			return null;
		}
		for (int i = 0; i < 256; i++) {
			index2 = ((b_key[index1] & 0xff) + (state[i] & 0xff) + index2) & 0xff;
			byte tmp = state[i];
			state[i] = state[index2];
			state[index2] = tmp;
			index1 = (index1 + 1) % b_key.length;
		}
		return state;
	}

	private static byte[] RC4Base(byte[] input, String mKkey) {
		int x = 0;
		int y = 0;
		byte key[] = initKey(mKkey);
		int xorIndex;
		byte[] result = new byte[input.length];

		for (int i = 0; i < input.length; i++) {
			x = (x + 1) & 0xff;
			y = ((key[x] & 0xff) + y) & 0xff;
			byte tmp = key[x];
			key[x] = key[y];
			key[y] = tmp;
			xorIndex = ((key[x] & 0xff) + (key[y] & 0xff)) & 0xff;
			result[i] = (byte) (input[i] ^ key[xorIndex]);
		}
		return result;
	}
	
	public static String decry_RC4(byte[] data, String key) {  
        if (data == null || key == null) {  
            return null;  
        }  
        return asString(RC4Base(data, key));  
    }  
  
    public static byte[] encry_RC4_byte(String data, String key) {  
        if (data == null || key == null) {  
            return null;  
        }  
        byte b_data[] = data.getBytes();  
        return RC4Base(b_data, key);  
    }  
  
    
  
    private static String asString(byte[] buf) {  
        StringBuffer strbuf = new StringBuffer(buf.length);  
        for (int i = 0; i < buf.length; i++) {  
            strbuf.append((char) buf[i]);  
        }  
        return strbuf.toString();  
    }  
  
    private static String toHexString(String s) {  
        String str = "";  
        for (int i = 0; i < s.length(); i++) {  
            int ch = (int) s.charAt(i);  
            String s4 = Integer.toHexString(ch & 0xFF);  
            if (s4.length() == 1) {  
                s4 = '0' + s4;  
            }  
            str = str + s4;  
        }  
        return str;// 0x表示十六进制  
    }  
  
    private static byte[] HexString2Bytes(String src) {  
        int size = src.length();  
        byte[] ret = new byte[size / 2];  
        byte[] tmp = src.getBytes();  
        for (int i = 0; i < size / 2; i++) {  
            ret[i] = uniteBytes(tmp[i * 2], tmp[i * 2 + 1]);  
        }  
        return ret;  
    }  
  
    private static byte uniteBytes(byte src0, byte src1) {  
        char _b0 = (char) Byte.decode("0x" + new String(new byte[] { src0 })).byteValue();  
        _b0 = (char) (_b0 << 4);  
        char _b1 = (char) Byte.decode("0x" + new String(new byte[] { src1 })).byteValue();  
        byte ret = (byte) (_b0 ^ _b1);  
        return ret;  
    }  
    
    public static String decry_RC4(String data, String key) {  
        if (data == null || key == null) {  
            return null;  
        }  
        return new String(RC4Base(HexString2Bytes(data), key));  
    }  
    
    /*
     * 对字符串加密
     */
    public static String encry_RC4_string(String data) {  
        if (data == null || key == null) {  
            return null;  
        }  
        return toHexString(asString(encry_RC4_byte(data, key)));  
    }  
    /*
     * 对字符串解密
     */
    public static String decry_RC4_string(String data) {  
        if (data == null || key == null) {  
            return null;  
        }  
        return new String(RC4Base(HexString2Bytes(data), key));  
    }  
    
   /* public static void main(String[] args) {  
        String inputStr = "做个好男人";  
        String str = encry_RC4_string(inputStr);  
        System.out.println(str);  
        System.out.println(decry_RC4_string("25f82f764f3d99fe76eb963df0a0c94eb45722c46f594fb7f7962118bae399e707293aaf71b40a852697afde3392541046f0392d3760c19429f53f47d2ef0efce890aca7e701846d110fb5791f15640eadaaf4e289367610ea1ad09c4ec23543e942a03b3d199d2adacb69872831c4f2774e09b2573496f3e7f6726626348b45cf010a6115736d2060514d223f660abeaa611089aecba6cf0248c7b733b4ba734ce046bb5786afcd963f549a7301851ee6e20f29fe3ca10c1c23a04232cf0e87a9c929246113c1450413eec11b406352fb2546320e4bcbae87cff6e8ae761223d892010f4d275fca3edb06cb4e48f38755517e918a3d0c728e02e3a221994f154855fa5dc0b7901157a6c4a5f8df1001acc0ca102cb97d424af6441d0266df4181a5378702c157a6c008d3ccfb3d96ec736f56a306b0939f7ef8bcc952e33157105fe69743c276c997ff9c8bf6692c036d74732c67c5e18801548a89a5ea28d1b782700e16b33ec43298014197ffe74b861bf2f01c7c06d1054e846ebb5043ff9b344358251805643d476109bb489b05fa7890e2b14a102d027e97c3a6ad85322b60fd7f1365f04ad490ed745db467e9490b1ade0a56a4e25da5e9a13ccefe17f1059952fcbe74bc5e18c0fd93d0e3ed6f492a882b1f6cfffc3bdcdb575f40c857989895ef729957ca4979"));  
    } */
    
   /* public static void main(String[] args) {
		String str="";
		byte[] date=null;
		try {
			date = RC4.enc_dec(str.getBytes("UTF-8"));
			System.out.println("加密后：" + new String(date,"UTF-8"));
			byte[] dateResult= RC4.enc_dec(date);
			System.out.println("解密后：" + new String(dateResult,"UTF-8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}*/
}
