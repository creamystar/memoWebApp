// event binding(menu)

$(document).on("click","#headerMain",function(){
	location.href = "/";
})
$(document).on("click","#leftMemo",function(){
	location.href = "/memo";
})
$(document).on("click","#headerMain2",function(){
	alert("준비중입니다!");
})
$(document).on("click","#leftTypingGame",function(){
	alert("준비중입니다!");
})

// memo 

var textareaKeyUpFlag = false;
var memoSelectDeleteFlag = false;
var memoSelectDeleteWrtDT = [];
var memoOrder = "";

$(document).ready(function(){
	getList(memoOrder);
})

$(document).on("click",".memo-small",function(e){
	if(memoSelectDeleteFlag){
		return;
	}
	
	$(this).css("z-index","3")
	var bh = "<div id=\"memo-back\" style=\"position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:2;background-color:rgba(0,0,0,0.3);\"></div>"
	if($("body").find("#memo-back").length == 0) $("body").append(bh);
})

$(document).on("click","#memo-back",function(){
	if(!textareaKeyUpFlag){
		$("#memo-back").remove();
		getList(memoOrder);
	}
	
	else if(confirm("작성한 메모 변경사항이 모두 사라집니다. 계속하시겠습니까?")){
		$("#memo-back").remove();
		getList(memoOrder);
	}
	
	$(".memo-small").css("z-index","0");
	textareaKeyUpFlag = false;
})

$(document).on("keyup",".memo-textarea",function(){
	if(memoSelectDeleteFlag){
		alert("다중선택 모드에서는 메모 변경이 불가합니다.");
		return;
	}
	textareaKeyUpFlag = true;
})

$(document).on("click","#memo-insert",function(){
	if(memoSelectDeleteFlag){
		alert("다중선택 모드에서는 메모 변경이 불가합니다.");
		return;
	}
	
	if($(this).parent().next().children(".memo-textarea").val().length == 0){
		alert("메모 내용을 기입 후 추가해주세요.")
		return;
	}
	
	createMemo($(this).parent().next().children(".memo-textarea").val());
	
})

$(document).on("click", "#memo-update", function(){
	if(memoSelectDeleteFlag){
		alert("다중선택 모드에서는 메모 변경이 불가합니다.");
		return;
	}
	
	if(!textareaKeyUpFlag){
		alert("메모에 수정된 부분이 없습니다.")
		return;
	}
	
	if(confirm("정말 수정하시겠습니까?")){
		var memoCon = $(this).parent().next().children(".memo-textarea").val();
		var wrtDt = $(this).prev().text()
		console.log(memoCon)
		console.log(wrtDt)
		updateMemo(memoCon,wrtDt)
	}
})

$(document).on("click", "#memo-delete", function(){
	if(memoSelectDeleteFlag){
		alert("다중선택 모드에서는 메모 변경이 불가합니다.");
		return;
	}
	
	if(confirm("정말 삭제하시겠습니까?")){
		var wrtDt = [];
		wrtDt.push($(this).prev().prev().text())
		console.log(wrtDt)
		deleteMemo(wrtDt)
	}
})

$(document).on("keyup", "#memo-search-input", function(e){
	if(e.key == "Enter" && $(this).val().length == 0) getList(memoOrder); 
	if(e.key == "Enter" && $(this).val().length > 0){
		searchList($(this).val())
	}
})

$(document).on("click", "#memo-search", function(){
	if(memoSelectDeleteFlag){
		alert("다중선택 모드에서는 메모 변경이 불가합니다.");
		return;
	}
	
	if($("#memo-search-input").val().length == 0) getList(memoOrder);
	if($("#memo-search-input").val().length > 0){
		searchList($("#memo-search-input").val())
	}
})

$(document).on("click", "#memo-select-delete", function(){
	if(!memoSelectDeleteFlag){
		alert("삭제할 메모를 선택후 다중삭제 버튼을 한번더 눌러주세요.")
		// 다중선택모드 진입 
		$(".memo-checkbox").show();
		memoSelectDeleteFlag = !memoSelectDeleteFlag
	}else{
		// 선택한사항 삭제
		if(memoSelectDeleteWrtDT.length == 0){
			alert("선택한 메모가 없습니다. 다중선택모드만 헤재합니다.")
			deleteSelectMemoSuccess();
			return;
		}
		if(confirm("선택한 메모를 모두 정말 삭제하시겠습니까?")){
			deleteMemo(memoSelectDeleteWrtDT);
		}
	}
})

$(document).on("click",".memo-checkbox", function(){
	if($(this).prop("checked")){
		memoSelectDeleteWrtDT.push($(this).next().text())
	}else{
		memoSelectDeleteWrtDT.indexOf($(this).next().text())
		memoSelectDeleteWrtDT.splice($(this).next().text(),1)
	}
})

$(document).on("change","#memo-order", function(){
	memoOrder = $(this).val()
	getList(memoOrder)
})

function getList(order){
	console.log(order)
	$.ajax({
		type: "get", 
		url: "listAjax", 
		dataType: "json", 
		data: {order:order},
		success: function(res){
			if(res.result == "success"){
				drawMemo(res.list)
			}else{
				alert("메모를 조회하는데 오류가 발생했습니다. 다시 시도하거나 관리자에게 문의하세요.")
			}
		}, 
		error: function(request,error){
			console.log(request.responseJSON)
			console.log(error)
			alert("메모조회 기능을 호출하는데에 오류가 발생했습니다. 다시 시도하거나 관리자에게 문의하세요.")
		}
	})
}

function drawMemo(list){
	var lh = "";
	lh += "<div class=\"memo-small memo-new\"><div><button id=\"memo-insert\">추가</button></div>";
	lh += "<div class=\"memo-con\"><textarea class=\"memo-textarea\" placeholder=\"메모빠른입력\"></textarea></div></div>";
	
	for(var i=0;i<list.length;i++){
		lh += "<div class=\"memo-small\"><div><input type=\"checkbox\" class=\"memo-checkbox\"/>"
		lh += "<div class=\"memo-wrtDt\">"
		lh += list[i].wrt_dt
		lh += "</div><button id=\"memo-update\">수정</button><button id=\"memo-delete\">삭제</button></div>"
		lh += "<div class=\"memo-con\"><textarea class=\"memo-textarea\">"
		lh += list[i].cntnt
		lh += "</textarea></div></div>"
	}
	
	$(".memo-right").html(lh);
	
	if($("body").find("#memo-back").length > 0) $("#memo-back").remove();	
	textareaKeyUpFlag = false;
}

function createMemo(memoCon){
	var wrtDt = makeDt();
	
	$.ajax({
		type: "post", 
		url: "insertAjax", 
		dataType: "json", 
		data: {wrtDt: wrtDt, memoCon: memoCon}, 
		success: function(res){
			if(res.result == "success"){
				getList(memoOrder);
			}else{
				alert("메모를 추가하는데 오류가 발생했습니다. 다시 시도하거나 관리자에게 문의하세요.")
			}
		}, 
		error: function(request,error){
			console.log(request.responseJSON)
			console.log(error)
			alert("메모추가 기능을 호출하는데에 오류가 발생했습니다. 다시 시도하거나 관리자에게 문의하세요.")
		}
	})
}

function updateMemo(memoCon,wrtDt){
	var updtDt = makeDt();
	
	$.ajax({
		type: "put", 
		url: "updateAjax", 
		dataType: "json", 
		data: {wrtDt: wrtDt, memoCon: memoCon, updtDt: updtDt}, 
		success: function(res){
			if(res.result == "success"){
				getList(memoOrder);
			}else{
				alert("메모를 수정하는데 오류가 발생했습니다. 다시 시도하거나 관리자에게 문의하세요.")
			}
		}, 
		error: function(request,error){
			console.log(request.responseJSON)
			console.log(error)
			alert("메모수정 기능을 호출하는데에 오류가 발생했습니다. 다시 시도하거나 관리자에게 문의하세요.")
		}
	})
}

function deleteMemo(wrtDtArray){
	console.log("deleteMemo")
	console.log(wrtDtArray)
	$.ajax({
		type: "post", 
		url: "deleteAjax", 
		dataType: "json", 
		data: {wrtDt: wrtDtArray}, 
		success: function(res){
			if(res.result == "success"){
				getList(memoOrder);
				deleteSelectMemoSuccess();
			}else{
				alert("메모를 삭제하는데 오류가 발생했습니다. 다시 시도하거나 관리자에게 문의하세요.")
			}
		}, 
		error: function(request,error){
			console.log(request.responseJSON)
			console.log(error)
			alert("메모삭제 기능을 호출하는데에 오류가 발생했습니다. 다시 시도하거나 관리자에게 문의하세요.")
		}
	})
}

function deleteSelectMemoSuccess(){
	if(memoSelectDeleteFlag){
		// 다중삭제 성공시 다중선택모드 해제 
		$(".memo-checkbox").hide();
		memoSelectDeleteFlag = !memoSelectDeleteFlag;
		memoSelectDeleteWrtDT = [];
	}
}

function searchList(searchWord){
	console.log("searchList")
	console.log(searchWord)
	$.ajax({
		type: "get", 
		url: "searchListAjax", 
		dataType: "json", 
		data: {searchWord: searchWord}, 
		success: function(res){
			if(res.result == "success"){
				drawMemo(res.list);
			}else{
				alert("메모를 검색하는데 오류가 발생했습니다. 다시 시도하거나 관리자에게 문의하세요.")
			}
		}, 
		error: function(request,error){
			console.log(request.responseJSON)
			console.log(error)
			alert("메모검색 기능을 호출하는데에 오류가 발생했습니다. 다시 시도하거나 관리자에게 문의하세요.")
		}
	})
}

function makeDt(){
	var d = new Date();
	var dt = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).substr(-2) + "-" + ("0" + d.getDate()).substr(-2) + " " + ("0" + d.getHours()).substr(-2) + ":" + ("0" + d.getMinutes()).substr(-2) + ":" + ("0" + d.getSeconds()).substr(-2);
	return dt;
}

