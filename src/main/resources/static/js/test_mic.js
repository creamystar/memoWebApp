// global variable 

var insertMemo = "";
var deleteWrtDt = "";
var updateWrtDt = "";
var updateMemo = "";
var searchWord = ""; // search 

// event binding

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
$(document).on("click",".memo-small",function(){
	if($(this).css("z-index") == "3") return;
	console.log("memo-small");
	$(this).css("z-index","3");
	let htmlBack = "<div id=\"memo-back\" style=\"position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:2;background-color:rgba(0,0,0,0.3);\"></div>";
	console.log($("body").find("#memo-back").length);
	if($("body").find("#memo-back").length == 0){
		console.log("body find memo back");
		$("body").append(htmlBack);
	}
	// $(this).addClass("memo-selected");
	console.log($(this).children("textarea.memo-textarea").text());
	if($(this).attr("class").indexOf("memo-new") != -1){
		// 새로운 메모 추가 
	}else{
		// 기존 메모 수정 
		$(".memo-textarea").val(memoCon);
	}
	$(".memo-textarea").focus();
})
$(document).on("click","#memo-back",function(){
	if(confirm("작성중인 메모가 취소됩니다. 계속하시겠습니까?")){
		location.reload();	
	}
})

$(document).ready(function(){
	getList();
})

// memo draw

function drawMemo(list){
	console.log(list);
}

// call ajax

var memoList = [];
function getList() {
	memoList = [];
	
	$.ajax({
		type: "get",
		url: "listAjax",
		dataType: "json",
		data: {},
		success: function(res){
			if(res.result == "success"){
				drawMemo(res.list);
			}
		},
		error: function(request,error){
			console.log("text: " + request.reponseText);
			console.log("error: " + error);
		}
	})
}

function getSearchList(searchWord){
	
}

function updateMemo(){
	
}

function deleteMemo(){
	if(confirm("정말 삭제하시겠습니까?")){
		$.ajax({
			type: "post",
			url: "deleteAjax",
			dataType: "json",
			data: {deleteWrtDt:deleteWrtDt},
			
			
		})
	}
}