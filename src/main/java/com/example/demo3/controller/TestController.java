package com.example.demo3.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo3.bean.PagingBean;
import com.example.demo3.service.IPagingService;
import com.example.demo3.service.ITestService;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
//@ComponentScan(basePackages = ("demo3"))
public class TestController {
	
	@Autowired
	public ITestService iTestService;
	
	@Autowired
	public IPagingService iPagingService;
	
	@RequestMapping(value="/")
	public ModelAndView main(ModelAndView mav) throws Throwable {
		mav.addObject("title","사용자 관리"); 
		mav.setViewName("test_mic/main");
		
		return mav;
	}
	
	@RequestMapping(value="/memo")
	public ModelAndView memo(ModelAndView mav) throws Throwable {
		mav.addObject("title","사용자 관리"); 
		mav.setViewName("test_mic/memo");
		
		return mav;
	}
	
	@RequestMapping(value="/listAjax", method = RequestMethod.GET,produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String listAjax(@RequestParam HashMap<String,String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		try {
			List<HashMap<String,String>> list = iTestService.getList(params);
			modelMap.put("list",list);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "exception");
		}
		return mapper.writeValueAsString(modelMap);
	}
	

	@RequestMapping(value="/deleteAjax", method = RequestMethod.POST,produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String deleteAjax(@RequestParam(value="wrtDt[]") List<String> delList, HttpSession session, HttpServletRequest request) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		try {
			iTestService.delete(delList);
			modelMap.put("result", "success");
		} catch(Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "exception");
		}
		return mapper.writeValueAsString(modelMap);
	}//deleteAjax
	
	@RequestMapping(value="/insertAjax", method = RequestMethod.POST,produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String inserAjax(@RequestParam HashMap<String,String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		try {
			iTestService.insertUser(params);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "exception");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	@RequestMapping(value="/searchListAjax", method = RequestMethod.GET,produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String getOneUserInfoAjax(@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
//		System.out.println("********************");
//		System.out.println(params);
		try {
			List<HashMap<String,String>> list = iTestService.getSearchList(params);
			modelMap.put("list", list);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "exception");
		} 
		return mapper.writeValueAsString(modelMap);
	} 
	 
	@RequestMapping(value="/updateAjax", method = RequestMethod.PUT,produces = "text/json;charset=UTF-8") 
	@ResponseBody 
	public String updateAjax(@RequestParam HashMap<String,String> params) throws Throwable { 
		ObjectMapper mapper = new ObjectMapper(); 
		Map<String, Object> modelMap = new HashMap<String, Object>(); 
		try { 
			iTestService.updateUser(params); 
			modelMap.put("result", "success"); 
		} catch (Throwable e) { 
			e.printStackTrace(); 
			modelMap.put("result", "exception"); 
		} 
		return mapper.writeValueAsString(modelMap); 
	}
	
}
