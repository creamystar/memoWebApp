package com.example.demo3.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TestMapper {

	public List<HashMap<String, String>> getList(HashMap<String,String> params) throws Throwable;

	public int delete(List<String> delList) throws Throwable;

	public int sameIdCntCheck(String checkId) throws Throwable ;

	public void insertUser(HashMap<String, String> params) throws Throwable ;

	public List<HashMap<String,String>> getSearchList(HashMap<String, String> params) throws Throwable ;

	public void updateUser(HashMap<String, String> params) throws Throwable ;

	public int getListCnt() throws Throwable ;

	public List<HashMap<String, String>> getPagingList(HashMap<String, String> params) throws Throwable ;

	public List<HashMap<String, String>> getPagingList2(HashMap<String, String> params) throws Throwable ;

	public void putSearchWord(HashMap<String, String> params) throws Throwable;

	public int getSameSearchWordCnt(HashMap<String, String> params) throws Throwable;

	public List<HashMap<String, String>> getDatalist() throws Throwable;






}
