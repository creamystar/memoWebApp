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
		
		<div class="memo-small memo-new">
            <div>
                <button>추가</button>
            </div>
            <div class="memo-con">
                <textarea class="memo-textarea" placeholder="메모빠른입력"></textarea>
            </div>
        </div>
        <div class="memo-small" id="0">
            <div>
                <div><!-- list.wrt_dt.replace("T"," ").replace(".000Z","") --></div>
                <button id="memo-delete">삭제</button>
            </div>
            <div class="memo-con">
	        <!-- list.cntnt -->
            <textarea class="memo-textarea" placeholder="메모빠른입력">
            </textarea>
            </div>
        </div>
		
	</div>
</div>

</body>
</html>
