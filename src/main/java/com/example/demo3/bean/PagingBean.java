package com.example.demo3.bean;

public class PagingBean {
		
		//offset 값
		int offset;
		//마지막 페이지 번호
		int maxPage;
		//현재 페이지 기준 시작 페이지 번호
		int startPage;
		//현재 페이지 기준 종료 페이지 번호
		int endPage;
		
		//Getter & Setter
		public int getOffset() {
			return offset;
		}
		public void setOffset(int offset) {
			this.offset = offset;
		}
		public int getMaxPage() {
			return maxPage;
		}
		public void setMaxPage(int maxPage) {
			this.maxPage = maxPage;
		}
		
		public int getStartPage() {
			return startPage;
		}
		public void setStartPage(int startPage) {
			this.startPage = startPage;
		}
		
		public int getEndPage() {
			return endPage;
		}
		public void setEndPage(int endPage) {
			this.endPage = endPage;
		}

}
