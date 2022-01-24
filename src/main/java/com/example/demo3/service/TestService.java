package com.example.demo3.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo3.dao.TestMapper;

@Service
public class TestService implements ITestService {
//	@Autowired
//	public ITestDao iTestDao;
	@Autowired 
	public TestMapper testMapper;

	@Override
	public List<HashMap<String, String>> getList(HashMap<String,String> params) throws Throwable {
//		return iTestDao.getList();
		return testMapper.getList(params);
	}

	@Override
	public void delete(List<String> delList) throws Throwable {
			testMapper.delete(delList);
	}

	@Override
	public int sameIdCntCheck(String checkId) throws Throwable {
		return testMapper.sameIdCntCheck(checkId);
	}

	@Override
	public void insertUser(HashMap<String, String> params) throws Throwable {
		testMapper.insertUser(params);
		
	}

	@Override
	public List<HashMap<String,String>> getSearchList(HashMap<String, String> params) throws Throwable {
		return testMapper.getSearchList(params);
	}

	@Override
	public void updateUser(HashMap<String, String> params) throws Throwable {
		testMapper.updateUser(params);
		
	}

	@Override
	public int getListCnt() throws Throwable {
		return testMapper.getListCnt();
	}

	@Override
	public List<HashMap<String, String>> getPagingList(HashMap<String, String> params) throws Throwable {
		return testMapper.getPagingList(params);
	}

	@Override
	public List<HashMap<String, String>> getPagingList2(HashMap<String, String> params) throws Throwable {
		return testMapper.getPagingList2(params);
	}

	@Override
	public void putSearchWord(HashMap<String, String> params) throws Throwable {
		testMapper.putSearchWord(params);
	}

	@Override
	public int getSameSearchWordCnt(HashMap<String, String> params) throws Throwable {
		return testMapper.getSameSearchWordCnt(params);
	}

	@Override
	public List<HashMap<String, String>> getDatalist() throws Throwable {
		return testMapper.getDatalist();
	}

}
