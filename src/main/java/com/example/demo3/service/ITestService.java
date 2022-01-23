package com.example.demo3.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public interface ITestService {

	public List<HashMap<String, String>> getList(HashMap<String,String> params) throws Throwable ;

	public void delete(List<String> delList) throws Throwable ;

	public int sameIdCntCheck(String checkId) throws Throwable ;

	public void insertUser(HashMap<String, String> params) throws Throwable ;

	public List<HashMap<String,String>> getSearchList(HashMap<String, String> params) throws Throwable ;

	public void updateUser(HashMap<String, String> params) throws Throwable ;

	public int getListCnt() throws Throwable ;

	public List<HashMap<String, String>> getPagingList(HashMap<String, String> params) throws Throwable ;

	public List<HashMap<String, String>> getPagingList2(HashMap<String, String> params) throws Throwable ;


}
