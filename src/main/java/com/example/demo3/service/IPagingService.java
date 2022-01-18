package com.example.demo3.service;

import com.example.demo3.bean.PagingBean;

public interface IPagingService {
	// limit offset 쿼리에 넣을 offset 값 
	public int getOffset(int currentPage,int limit);
	
	// 페이징 최대 크기
	public int getMaxPage(int maxCount, int limit);

	// 현재페이지 기준 시작페이지
	public int getStartPage(int currentPage, int pageCnt);

	// 현재페이지 기준 종료페이지
	public int getEndPage(int currentPage, int maxCount, int limit, int pageCnt);
	
	// 빈형식 (현재페이지/총 유저 수/페이지 당 볼 유저 수/한번에 볼 페이지 수)
	public PagingBean getPagingBean(int currentPage, int maxCnt, int limit, int pageCnt);

}
