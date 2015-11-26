package com.test.junit;

import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.alibaba.fastjson.JSON;
import com.common.utils.ParamUtil;

/**
 * @author Administrator
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="classpath:applicationContext.xml")
public class JunitTest {
	@Autowired
	JdbcTemplate jdbcTemplate;
	
	//@Ignore
	@Test
	public void test() {
		List<Map<String, Object>> userList = jdbcTemplate.queryForList("select * from `user` limit 10");
		System.out.println(JSON. toJSONString(userList,ParamUtil.features));
	}
}
