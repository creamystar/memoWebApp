
//잠금화면
function RecSeeM_LockScreen() {
	
	var LockScreen = {
		"lockpass" : $("#lockpass").val()
	}
	
	var url = "/LockScreen";
	
	$.ajax({
		type:"POST",
		url : url,
		data:LockScreen,
		success: function(data) {
			$("#MsgOutput").append(data);
			
			document.getElementById("btnLogin").disabled = false;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("애러");
		}
	});
}

//로그인
function RecSeeM_Login() {

	var RecSeeM_Login = {
		"cmd": "login_ap_req",
		"agentId": $("#agentId").val(),
		"password": $("#password").val(),
		"dateTime": "date"
	}
	
	var url = "/loginSet";
	
	$.ajax({
		type : "POST",            // HTTP method type(GET, POST) 형식이다.
		url : url,      // 컨트롤러에서 대기중인 URL 주소이다.
		data : RecSeeM_Login,            // Json 형식의 데이터이다.
		success: function(data) { // 비동기통신의 성공일경우 success콜백으로 들어옵니다. 'data'는 응답받은 데이터이다.
			//alert("ok");
			var msg = "로그인 되었습니다.\n";
			
			$("#MsgOutput").append(msg);
			document.getElementById("btnLogin").disabled = true;
			document.getElementById("btnLogout").disabled = false;
			document.getElementById("btnSend1").disabled = false;
			document.getElementById("btnSend2").disabled = false;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
			alert("애러");
		}
	});
	
	
}
//로그아웃
function RecSeeM_Logout(phoneNumber) {

	var RecSeeM_Logout = {
		"cmd": "logout_ap_req",
		"agentId": $("#agentId").val(),
		"phone": phoneNumber
	}
	
	var url = "/logout";
	
	$.ajax({
		type:"POST",
		url : url,
		data:RecSeeM_Logout,
		success: function(data) {
			$("#MsgOutput").append(data);
			
			document.getElementById("btnLogin").disabled = false;
			document.getElementById("btnLogout").disabled = true;
			document.getElementById("btnSend1").disabled = true;
			document.getElementById("btnSend2").disabled = true;
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("애러");
		}
	});
	
}
//전화걸기1
function RecSeeM_MakeCall() {

	var RecSeeM_MakeCall = {
		"cmd": "dial_ap_req", 
		"agentId": $("#agentId").val(),
		"dial_number1": $("#dialNum").val(),
		"cust_lv": "clv", 
		"cust_id": "cid",
		"info_1" : "info_1",
		"info_2" : "info_2",
		"info_3" : "info_3",
		"info_4" : "info_4",
		"info_5" : "info_5",
		"info_6" : "info_6",
		"info_7" : "info_7",
		"info_8" : "info_8",
		"info_9" : "info_9",
		"info_10" : "info_10"
	}
	
	var url = "/MakeCall1";
	
	$.ajax({
		type : "POST",
		url : url,
		data:RecSeeM_MakeCall,
		success: function(data) {
			
			$("#MsgOutput").append(data);
			
			document.getElementById("btnSend1").disabled = true;
			document.getElementById("btnAnswer1").disabled = false;
			document.getElementById("transfer").disabled = false;
			document.getElementById("callthree").disabled = false;
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("애러");
		}
	});
	
	
}
//전화걸기2
function RecSeeM_MakeCall2() {
	
	var RecSeeM_MakeCall2 = {
		"cmd" : "dial_ap_req2", 
		"agentId": $("#agentId").val(),
		"dial_number2": $("#dialNum2").val(),
		"cust_lv":"코드표 참조", 
		"cust_id":"cid", 
		"calltype" : "ctype", 
		"pbxId":"pid", 
		"pbxPw":"ppw", 
		"info_1" : "info_1",
		"info_2" : "info_2",
		"info_3" : "info_3",
		"info_4" : "info_4",
		"info_5" : "info_5",
		"info_6" : "info_6",
		"info_7" : "info_7",
		"info_8" : "info_8",
		"info_9" : "info_9",
		"info_10" : "info_10"
		}
		
	var url = "/MakeCall2";
		
	$.ajax({
		type:"POST",
		url:url,
		data:RecSeeM_MakeCall2,
		success: function(data) {
			
			$("#MsgOutput").append(data);
			
			document.getElementById("btnSend2").disabled = true;
			document.getElementById("btnAnswer2").disabled = false;
			document.getElementById("transfer").disabled = false;
			document.getElementById("callthree").disabled = false;
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("애러");
		}
	});
		
}

//전화끊기
function RecSeeM_DropCall() {
	
	var RecSeeM_DropCall = {
		"cmd" : "drop_ap_req", 
		"agentId" : $("#agentId").val(),
		"reason":"endCall" }

	var url = "/DropCall";
	
	$.ajax({
		type:"POST",
		url:url,
		data:RecSeeM_DropCall,
		success: function(data) {
			
			document.getElementById("btnSend1").disabled = false;
			document.getElementById("btnAnswer1").disabled = true;
			document.getElementById("btnSend2").disabled = false;
			document.getElementById("btnAnswer2").disabled = true;
			
			document.getElementById("transfer").disabled = true;
			document.getElementById("transback").disabled = true;
			document.getElementById("callthree").disabled = true;
			
			$("#MsgOutput").append(data);
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("애러");
		}
	});


	
	
}
//파일명 얻기
function RecSeeM_GetFile() { 
	
	var RecSeeM_GetFile = {
		"cmd" : "get_filename_ap_req", 
		"agentId" : "", "phone" : "", 
		"starttime":"", 
		"call_type":""
		}

	var url = "/";

	$.ajax({
		type:"POST",
		url:url,
		data:"",
		success: function(data) {
			$("#MsgOutput").append(data);
		
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("애러");
		}
	});

}
//내선번호
function RecSeeM_GetCurrentStatus() {
	
	var RecSeeM_GetCurrentStatus = {
		"cmd" : " "
	}
	
	var url = "/Extension";
	
	$.ajax({
		type:"POST",
		url:url,
		data:"",
		success: function(data) {
			$("#MsgOutput").append(data);
		
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("애러");
		}
	});
	
}
//호전환하기
function RecSeeM_CallTransfer(){
	
	var url = "/CallTransfer";
	
	$.ajax({
		type:"POST",
		url:url,
		data:"",
		success: function(data) {
			$("#MsgOutput").append(data);
		
			document.getElementById("transfer").disabled = true;
			document.getElementById("transback").disabled = false;
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("애러");
		}
	});
	
}
//복귀하기
function RecSeeM_CallBack(){
	
	var url = "/CallBack";
	
	$.ajax({
		type:"POST",
		url:url,
		data: "",
		success: function(data) {
			$("#MsgOutput").append(data);
		
			document.getElementById("transfer").disabled = false;
			document.getElementById("transback").disabled = true;
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("애러");
		}
	});
	
	
}
//3자통화하기
function RecSeeM_CallThreeWay(){
	
	var url = "/";
	
	var data = "3자 통화모드 시작합니다.\n";		
	$("#MsgOutput").append(data);
	
	$.ajax({
		type:"POST",
		url:url,
		data:"",
		success: function(data) {
			$("#MsgOutput").append(data);
		
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("애러");
		}
	});
}

