package com.example.demo3.service;

import org.springframework.stereotype.Service;

import com.example.demo3.bean.PagingBean;

@Service
public class PagingService implements IPagingService{

	@Override
	public int getOffset(int currentPage, int limit) {
		int offset = (currentPage - 1) * limit;
		return offset;
	}

	@Override
	public int getMaxPage(int maxCnt, int limit) {
		int maxPage = 0;
		
		if(maxCnt % limit > 0){
			maxPage = (maxCnt / limit) + 1;
		} else {
			maxPage = (maxCnt / limit);
		}
		
		if(maxCnt == 0) {
			maxPage = 1;
		}
		
		return maxPage;
	}

	@Override
	public int getStartPage(int currentPage, int pageCnt) {
		int startPage = 0;
		if(currentPage % pageCnt == 0 ) {
			startPage = currentPage - pageCnt + 1;
		} else {
			startPage = ((currentPage / pageCnt) * pageCnt) + 1;
		}
		return startPage;
	}

	@Override
	public int getEndPage(int currentPage, int maxCnt, int limit, int pageCnt) {
		int endPage = 0;
		int maxPage = getMaxPage(maxCnt, limit);
		
		endPage = getStartPage(currentPage, pageCnt) + pageCnt - 1;
		
		if(endPage >= maxPage){
			endPage = maxPage;
		}
		return endPage;
	}

	@Override
	public PagingBean getPagingBean(int currentPage, int maxCnt, int limit, int pageCnt) {
		
		PagingBean pb = new PagingBean();
		
		pb.setOffset(getOffset(currentPage, limit));
		pb.setMaxPage(getMaxPage(maxCnt, limit));
		pb.setStartPage(getStartPage(currentPage, pageCnt));
		pb.setEndPage(getEndPage(currentPage, maxCnt, limit, pageCnt));
		
		return pb;
	}

	
	
	
}
