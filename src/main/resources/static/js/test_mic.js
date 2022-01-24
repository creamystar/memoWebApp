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
var textareaKeyupFlag = false;
var memoOrder = "";
var deleteClickFlag = false;
var memoSelectDeleteFlag = false;
$(document).ready(function(){
	getList(memoOrder);
	getDatalist();
})
$(document).on("click",".memo-small", function(){
	if(memoSelectDeleteFlag) return;
	if(deleteClickFlag){
		deleteClickFlag = false;
		return;
	}
	$(this).css("z-index","3")
	var mh = "<div id=\"memo-back\" style=\"position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:2;background-color:rgba(0,0,0,0.3);\"></div>"
	if($("body").find("#memo-back").length == 0) $("body").append(mh)
})
$(document).on("keyup",".memo-textarea",function(e){
	if(!textareaKeyupFlag) textareaKeyupFlag = true;
})
$(document).on("click","#memo-back",function(){
	if(textareaKeyupFlag){
		if(confirm("메모 변경내용이 사라집니다. 계속하시겠습니까?")){}
		else return; 
	}
	getList(memoOrder);
})
$(document).on("click","#memo-insert",function(){
	if(textareaKeyupFlag){
		insertMemo($(this).parent().next().children(".memo-textarea").val())
	}else{
		alert("메모변경사항이 없습니다.")
	}
})
$(document).on("change","#memo-order",function(){
	memoOrder = $(this).val()
	getList(memoOrder)
})
$(document).on("click","#memo-update",function(){
	if(textareaKeyupFlag){
		if(confirm("정말 수정하시겠습니까?")){
			var memoCon = $(this).parent().next().children(".memo-textarea").val()
			var wrtDt = $(this).prev().text()
			updateMemo(memoCon,wrtDt)
		}
	}else{
		alert("메모변경사항이 없습니다.")
	}
})
$(document).on("click","#memo-delete",function(){
	if(confirm("정말 삭제하시겠습니까?")){
		var wrtDt = [];
		wrtDt.push($(this).prev().prev().text())
		deleteMemo(wrtDt)
	}
	deleteClickFlag = true;
})
$(document).on("keyup","#memo-search-input",function(e){
	if(e.key == "Enter"){
		if($("#memo-search-input").val()){
			getSearchList($("#memo-search-input").val())
		}else{
			getList(memoOrder);
		}
	}
})
$(document).on("click","#memo-search",function(){
	if($("#memo-search-input").val()){
		getSearchList($("#memo-search-input").val())
	}else{
		getList(memoOrder);
	}
})
$(document).on("click","#memo-select-delete",function(){
	if(!memoSelectDeleteFlag){
		// 다중선택 모드 시작 
		$(".memo-checkbox").show();
		alert("삭제할 메모를 선택 후 다시 다중삭제를 눌러 삭제해주세요.")		
		memoSelectDeleteFlag = !memoSelectDeleteFlag;
	}else{
		if(checkboxWrtDt.length == 0){
			alert("선택한 메모가 없습니다.")
			getList(memoOrder)
			memoSelectDeleteFlag = !memoSelectDeleteFlag;
			return;
		}
		if(confirm("정말 삭제하시겠습니까?")){
			deleteMemo(checkboxWrtDt)
			memoSelectDeleteFlag = !memoSelectDeleteFlag;
		}
	}
})
var checkboxWrtDt = [];
$(document).on("click",".memo-checkbox",function(){
	if($(this).prop("checked")){
		checkboxWrtDt.push($(this).next().text())	
	}else{
		var io = checkboxWrtDt.indexOf($(this).next().text())	
		checkboxWrtDt.splice(io,1)	
	}
})

function getList(memoOrder){
	$.ajax({
		type: "get", 
		url: "listAjax", 
		dataType: "json", 
		data: {order:memoOrder},
		success: function(res){
			if(res.result == "success"){
				drawMemo(res.list);
			}else{
				alert("메모조회에 실패하였습니다. 다시 시도하거나 관리자에게 문의하세요.")
			}
		},
		error: function(request, error){
			alert("메모조회기능 호출에 실패하였습니다. 다시 시도하거나 관리자에게 문의하세요.")
			console.log(request.responseJSON);
			console.log(error)
		}
	})
}

function drawMemo(list){
	var mh = "";
	mh += "<div class=\"memo-small\"><div><button tabindex=\"-1\" id=\"memo-insert\">추가</button></div><div class=\"memo-con\"><textarea tabindex=\"-1\" class=\"memo-textarea\" placeholder=\"메모빠른입력\"></textarea></div></div>"
	
	for(var i=0;i<list.length;i++){
		mh += "<div class=\"memo-small\"><div><input type=\"checkbox\" class=\"memo-checkbox\"/><div class=\"memo-wrtDt\">"
		mh += list[i].wrt_dt
		mh += "</div><button tabindex=\"-1\" id=\"memo-update\">수정</button><button tabindex=\"-1\" id=\"memo-delete\">삭제</button></div><div class=\"memo-con\"><textarea tabindex=\"-1\" class=\"memo-textarea\">"
		mh += list[i].cntnt
		mh += "</textarea></div></div>"
	}
	
	$(".memo-right").html(mh);
	
	if($("body").find("#memo-back").length > 0) $("#memo-back").remove();
	textareaKeyupFlag = false;
	
}
function insertMemo(memoCon){
	var wrtDt = makeWrtDt();
	$.ajax({
		type: "post", 
		url: "insertAjax", 
		dataType: "json", 
		data: {memoCon:memoCon,wrtDt:wrtDt},
		success: function(res){
			if(res.result == "success"){
				getList(memoOrder)
			}else{
				alert("메모추가에 실패하였습니다. 다시 시도하거나 관리자에게 문의하세요.")
			}
		},
		error: function(request, error){
			alert("메모추가기능 호출에 실패하였습니다. 다시 시도하거나 관리자에게 문의하세요.")
			console.log(request.responseJSON);
			console.log(error)
		}
	})
}
function updateMemo(memoCon,wrtDt){
	var updtDt = makeWrtDt();
	$.ajax({
		type: "put", 
		url: "updateAjax", 
		dataType: "json", 
		data: {memoCon:memoCon,wrtDt:wrtDt,updtDt:updtDt},
		success: function(res){
			if(res.result == "success"){
				getList(memoOrder)
			}else{
				alert("메모수정에 실패하였습니다. 다시 시도하거나 관리자에게 문의하세요.")
			}
		},
		error: function(request, error){
			alert("메모수정기능 호출에 실패하였습니다. 다시 시도하거나 관리자에게 문의하세요.")
			console.log(request.responseJSON);
			console.log(error)
		}
	})
}
function deleteMemo(wrtDt){
	$.ajax({
		type: "post", 
		url: "deleteAjax", 
		dataType: "json", 
		data: {wrtDt:wrtDt},
		success: function(res){
			if(res.result == "success"){
				getList(memoOrder)
				alert("삭제되었습니다.")
			}else{
				alert("메모삭제에 실패하였습니다. 다시 시도하거나 관리자에게 문의하세요.")
			}
		},
		error: function(request, error){
			alert("메모삭제기능 호출에 실패하였습니다. 다시 시도하거나 관리자에게 문의하세요.")
			console.log(request.responseJSON);
			console.log(error)
		}
	})
}
function getSearchList(searchWord){
	$.ajax({
		type: "get", 
		url: "searchListAjax", 
		dataType: "json", 
		data: {searchWord:searchWord},
		success: function(res){
			if(res.result == "success"){
				drawMemo(res.list)
				getDatalist()
			}else{
				alert("메모검색조회에 실패하였습니다. 다시 시도하거나 관리자에게 문의하세요.")
			}
		},
		error: function(request, error){
			alert("메모검색조회기능 호출에 실패하였습니다. 다시 시도하거나 관리자에게 문의하세요.")
			console.log(request.responseJSON);
			console.log(error)
		}
	})
}
function getDatalist(){
	$.ajax({
		type: "get", 
		url: "getDatalistAjax", 
		dataType: "json", 
		data: {},
		success: function(res){
			if(res.result == "success"){
				var dlh = "";
				for(var i=0;i<res.list.length;i++){
					dlh += "<option>"
					dlh += res.list[i].search_word
					dlh += "</option>"
				}
				$("#search-options").html(dlh)
			}else{
				alert("메모자동완성 리스트조회에 실패하였습니다. 다시 시도하거나 관리자에게 문의하세요.")
			}
		},
		error: function(request, error){
			alert("메모자동완성 리스트조회기능 호출에 실패하였습니다. 다시 시도하거나 관리자에게 문의하세요.")
			console.log(request.responseJSON);
			console.log(error)
		}
	})
}
function makeWrtDt(){
	var d = new Date();
	var dt = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).substr(-2) + "-" + ("0" + d.getDate()).substr(-2) + " " + ("0" + d.getHours()).substr(-2) + ":" + ("0" + d.getMinutes()).substr(-2) + ":" + ("0" + d.getSeconds()).substr(-2);
	return dt;
}




