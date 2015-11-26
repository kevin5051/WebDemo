package com.common.utils;

import java.util.Collection;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class CollectionUtils {

	//最常规的一种遍历方法，最常规就是最常用的，虽然不复杂，但很重要，这是我们最熟悉的，就不多说了！！
    public static void work(Map<String, Object> map) {
        Collection<Object> c = map.values();
        Iterator it = c.iterator();
        for (; it.hasNext();) {
            System.out.println(it.next() + ",");
        }
    }
    //利用keyset进行遍历，它的优点在于可以根据你所想要的key值得到你想要的 values，更具灵活性！！
    public static void workByKeySet(Map<String, Object> map) {
        Set<String> key = map.keySet();
        for (Iterator it = key.iterator(); it.hasNext();) {
            String s = (String) it.next();
            System.out.print(s + ":" + map.get(s) + ",");
        }
    }
    //比较复杂的一种遍历在这里，呵呵~~他很暴力哦，它的灵活性太强了，想得到什么就能得到什么~~
    public static void workByEntry(Map<String, Object> map) {
        Set<Map.Entry<String, Object>> set = map.entrySet();
        for (Iterator<Map.Entry<String, Object>> it = set.iterator(); it.hasNext();) {
            Map.Entry<String, Object> entry = (Map.Entry<String, Object>) it.next();
            System.out.print(entry.getKey() + ":" + entry.getValue() + ",");
        }
    }
}

