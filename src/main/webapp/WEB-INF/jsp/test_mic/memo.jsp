<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
   
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>main</title>
<link rel="stylesheet" type="text/css" href="/css/test_mic.css">
<script type="text/javascript" src="/js/jquery.js"></script>
<script type="text/javascript" src="/js/test_mic.js"></script>
<script type="text/javascript">
</script>
</head>
<body>

<div class="wrap">
	 <%@ include file="/WEB-INF/jsp/test_mic/settings/header.jsp" %>
	 <%@ include file="/WEB-INF/jsp/test_mic/settings/left.jsp" %>
	<div class="right inlineBlock">
		<div class="memo-header">
			<!-- <input type="text" tabindex="-1" id="memo-search-input" list="search-options"/><button tabindex="-1" id="memo-search">검색</button>
			<datalist id="search-options">
				
			</datalist>
			<button tabindex="-1" id="memo-select-delete">다중삭제</button> 
			<select tabindex="-1" id="memo-order">
				<option value="wrtDt">최신작성순</option>
				<option value="updtDt">최신수정순</option>
				<option value="memo">가나다순</option>
			</select>  -->
			<input type="text" tabindex="-1" id="memo-search-input" list="search-options"/><button tabindex="-1" id="memo-search">검색</button>
			<datalist id="search-options">
				
			</datalist>
			<button tabindex="-1" id="memo-select-delete">다중삭제</button> 
			<select tabindex="-1" id="memo-order">
				<option value="wrtDt">최신작성순</option>
				<option value="updtDt">최신수정순</option>
				<option value="memo">가나다순</option>
			</select> 
			
		</div>
		<div class="memo-right">
		<!-- <div class=\"memo-small\">
            <div>
                <button tabindex=\"-1\" id=\"memo-insert\">추가</button>
            </div>
            <div class=\"memo-con\">
                <textarea tabindex=\"-1\" class=\"memo-textarea\" placeholder=\"메모빠른입력\"></textarea>
            </div>
        </div> -->
        <!-- <div class=\"memo-small\">
            <div>
            	<input type=\"checkbox\" class=\"memo-checkbox\"/>
                <div class=\"memo-wrtDt\">list[i].wrt_dt</div>
                <button tabindex=\"-1\" id=\"memo-update\">수정</button>
                <button tabindex=\"-1\" id=\"memo-delete\">삭제</button>
            </div>
            <div class=\"memo-con\">
            	<textarea tabindex=\"-1\" class=\"memo-textarea\">list[i].cntnt</textarea>
            </div>
        </div> -->
       </div>
        
	</div>
</div>
        <!-- <div id=\"memo-back\" style=\"position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:2;background-color:rgba(0,0,0,0.3);\">
        </div> -->

</body>
</html>
