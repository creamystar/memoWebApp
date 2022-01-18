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
	
	@RequestMapping(value="/listAjax", method = RequestMethod.POST,produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String listAjax(@RequestParam HashMap<String,String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		try {
			List<HashMap<String,String>> list = iTestService.getList();
			modelMap.put("list",list);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "exception");
		}
		return mapper.writeValueAsString(modelMap);
	}
	

	@RequestMapping(value="/getPagingListAjax", method = RequestMethod.POST,produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String getPagingListAjax(@RequestParam HashMap<String,String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		try {
			int maxCnt = iTestService.getListCnt();
			int limit = 5; // 한 페이지에 볼 글 수 
			int pageCnt = 3; // 한 번에 볼 페이지 수 (ex) 3: 1-3페이지 / 4-6페이지 / 7-9페이지) 
			
			PagingBean pb = iPagingService.getPagingBean(Integer.parseInt(params.get("currentPage")), maxCnt, limit, pageCnt);
			
			params.put("limit", Integer.toString(limit));
			params.put("offset", Integer.toString(pb.getOffset()));
	
			List<HashMap<String,String>> list = iTestService.getPagingList2(params);
			
			modelMap.put("list",list);
			modelMap.put("pb",pb);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "exception");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	@RequestMapping(value="/deleteAjax", method = RequestMethod.POST,produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String deleteAjax(@RequestParam(value="checkList[]") List<String> delList, HttpSession session, HttpServletRequest request) throws Throwable {
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

	@RequestMapping(value="/idCheckAjax", method = RequestMethod.POST,produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String idCheckAjax(@RequestParam HashMap<String,String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		try {
			String checkId = params.get("checkId");
			int sameIdCnt = iTestService.sameIdCntCheck(checkId);
			modelMap.put("sameIdCnt", sameIdCnt);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "exception");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	@RequestMapping(value="/inserAjax", method = RequestMethod.POST,produces = "text/json;charset=UTF-8")
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
	
	
	@RequestMapping(value="/getOneUserInfoAjax", method = RequestMethod.POST,produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String getOneUserInfoAjax(@RequestParam(value="checkNo") int checkNo) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		try {
			HashMap<String,String> list = iTestService.getOneList(checkNo);
			modelMap.put("list", list);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "exception");
		} 
		return mapper.writeValueAsString(modelMap);
	} 
	 
	@RequestMapping(value="/updateAjax", method = RequestMethod.POST,produces = "text/json;charset=UTF-8") 
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
	
	
//	@RequestMapping(value="/test01")
//	public ModelAndView test01(ModelAndView mav) throws Throwable {
//		mav.addObject("title","사용자 관리"); 
//		mav.setViewName("test01");
//		
//		return mav;
//	}
//	
//	@RequestMapping(value="/listAjax", method = RequestMethod.POST,produces = "text/json;charset=UTF-8")
//	@ResponseBody
//	public String listAjax(@RequestParam HashMap<String,String> params) throws Throwable {
//		ObjectMapper mapper = new ObjectMapper();
//		Map<String, Object> modelMap = new HashMap<String, Object>();
//		try {
//			List<HashMap<String,String>> list = iTestService.getList();
//			modelMap.put("list",list);
//			modelMap.put("result", "success");
//		} catch (Throwable e) {
//			e.printStackTrace();
//			modelMap.put("result", "exception");
//		}
//		return mapper.writeValueAsString(modelMap);
//	}
//	
//
//	@RequestMapping(value="/getPagingListAjax", method = RequestMethod.POST,produces = "text/json;charset=UTF-8")
//	@ResponseBody
//	public String getPagingListAjax(@RequestParam HashMap<String,String> params) throws Throwable {
//		ObjectMapper mapper = new ObjectMapper();
//		Map<String, Object> modelMap = new HashMap<String, Object>();
//		try {
//			int maxCnt = iTestService.getListCnt();
//			int limit = 5; // 한 페이지에 볼 글 수 
//			int pageCnt = 3; // 한 번에 볼 페이지 수 (ex) 3: 1-3페이지 / 4-6페이지 / 7-9페이지) 
//			
//			PagingBean pb = iPagingService.getPagingBean(Integer.parseInt(params.get("currentPage")), maxCnt, limit, pageCnt);
//			
//			params.put("limit", Integer.toString(limit));
//			params.put("offset", Integer.toString(pb.getOffset()));
//	
//			List<HashMap<String,String>> list = iTestService.getPagingList2(params);
//			
//			modelMap.put("list",list);
//			modelMap.put("pb",pb);
//			modelMap.put("result", "success");
//		} catch (Throwable e) {
//			e.printStackTrace();
//			modelMap.put("result", "exception");
//		}
//		return mapper.writeValueAsString(modelMap);
//	}
//	
//	
//	@RequestMapping(value="/deleteAjax", method = RequestMethod.POST,produces = "text/json;charset=UTF-8")
//	@ResponseBody
//	public String deleteAjax(@RequestParam(value="checkList[]") List<String> delList, HttpSession session, HttpServletRequest request) throws Throwable {
//		ObjectMapper mapper = new ObjectMapper();
//		Map<String, Object> modelMap = new HashMap<String, Object>();
//		try {
//			iTestService.delete(delList);
//			modelMap.put("result", "success");
//		} catch(Throwable e) {
//			e.printStackTrace();
//			modelMap.put("result", "exception");
//		}
//		return mapper.writeValueAsString(modelMap);
//	}//deleteAjax
//
//	@RequestMapping(value="/idCheckAjax", method = RequestMethod.POST,produces = "text/json;charset=UTF-8")
//	@ResponseBody
//	public String idCheckAjax(@RequestParam HashMap<String,String> params) throws Throwable {
//		ObjectMapper mapper = new ObjectMapper();
//		Map<String, Object> modelMap = new HashMap<String, Object>();
//		try {
//			String checkId = params.get("checkId");
//			int sameIdCnt = iTestService.sameIdCntCheck(checkId);
//			modelMap.put("sameIdCnt", sameIdCnt);
//			modelMap.put("result", "success");
//		} catch (Throwable e) {
//			e.printStackTrace();
//			modelMap.put("result", "exception");
//		}
//		return mapper.writeValueAsString(modelMap);
//	}
//	
//	@RequestMapping(value="/inserAjax", method = RequestMethod.POST,produces = "text/json;charset=UTF-8")
//	@ResponseBody
//	public String inserAjax(@RequestParam HashMap<String,String> params) throws Throwable {
//		ObjectMapper mapper = new ObjectMapper();
//		Map<String, Object> modelMap = new HashMap<String, Object>();
//		try {
//			iTestService.insertUser(params);
//			modelMap.put("result", "success");
//		} catch (Throwable e) {
//			e.printStackTrace();
//			modelMap.put("result", "exception");
//		}
//		return mapper.writeValueAsString(modelMap);
//	}
//	
//	
//	@RequestMapping(value="/getOneUserInfoAjax", method = RequestMethod.POST,produces = "text/json;charset=UTF-8")
//	@ResponseBody
//	public String getOneUserInfoAjax(@RequestParam(value="checkNo") int checkNo) throws Throwable {
//		ObjectMapper mapper = new ObjectMapper();
//		Map<String, Object> modelMap = new HashMap<String, Object>();
//		try {
//			HashMap<String,String> list = iTestService.getOneList(checkNo);
//			modelMap.put("list", list);
//			modelMap.put("result", "success");
//		} catch (Throwable e) {
//			e.printStackTrace();
//			modelMap.put("result", "exception");
//		} 
//		return mapper.writeValueAsString(modelMap);
//	} 
//	 
//	@RequestMapping(value="/updateAjax", method = RequestMethod.POST,produces = "text/json;charset=UTF-8") 
//	@ResponseBody 
//	public String updateAjax(@RequestParam HashMap<String,String> params) throws Throwable { 
//		ObjectMapper mapper = new ObjectMapper(); 
//		Map<String, Object> modelMap = new HashMap<String, Object>(); 
//		try { 
//			iTestService.updateUser(params); 
//			modelMap.put("result", "success"); 
//		} catch (Throwable e) { 
//			e.printStackTrace(); 
//			modelMap.put("result", "exception"); 
//		} 
//		return mapper.writeValueAsString(modelMap); 
//	}

	
}
