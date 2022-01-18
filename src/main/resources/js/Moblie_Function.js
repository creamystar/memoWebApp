//연결확인
var signalId = null;
var signalPhone = null;
//url
var url = "http://52.79.242.171:28889/agent";
// 날짜 계산
function MakeDateString() {
	var today = new Date();

	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);
	var hours = ('0' + today.getHours()).slice(-2);
	var minutes = ('0' + today.getMinutes()).slice(-2);
	var seconds = ('0' + today.getSeconds()).slice(-2);

	var DateString = '' + year + month + day + hours + minutes + seconds;

	return DateString;
}

//받아온info배열 정보 info_1~10까지 저장
function infoeval(objName, info) {
	for (var i = 0; i < 10; i++) {
		eval(objName + ".info_" + (i + 1) + "= info[" + i + "]");
	}
}

//연결확인 실행하는 setIntreval 20초마다
$(document).ready(function() {
	setInterval(function() {
		if (Boolean(signalId) && Boolean(signalPhone)) {
			RecSeeM_Connectionsignal(signalId, signalPhone);
		}
	}, 12000);
});

//연결확인
function RecSeeM_Connectionsignal(agentId, phone) {
	var ConnectionCheck = {
		"cmd": "ack",
		"agentId": agentId,
		"phone": phone
	}
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(ConnectionCheck),
		success: function(data) {
			$("#MsgOutput").append(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("error");
		}
	});
}



//로그인
function RecSeeM_Login(agentId, password, phone) {
	alert("로그인을 시도 합니다.");
	signalId = agentId;
	signalPhone = phone;
	var login = {
		"cmd": "login_ap_req",
		"agentId": agentId,
		"password": password,
		"phone": phone,
		"dateTime": MakeDateString()
	}
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(login),
		success: function(data) {
			$("#MsgOutput").append(data);
			
			signalId = agentId;
			signalPhone = phone;

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("error");
		}
	});
}

//로그아웃
function RecSeeM_Logout(agentId, phone) {

	var logout = {
		"cmd": "logout_ap_req",
		"agentId": agentId,
		"phone": phone
	}
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(logout),
		success: function(data) {
			$("#MsgOutput").append(data);
			
			signalId = null;
			signalPhone = null;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("error");
		}
	});
}

//전화걸기1
function RecSeeM_MakeCall(agentId, dial_number, cust_lv, cust_id, info) {//info는 배열 방식으로 10개까지만 들어갑니다.

	document.getElementById("popup_calling_bar").hidden = false;
	var nackName = document.getElementById("agentId").value;
	var Calltype = "모바일폰";
	$("#calltype").html(Calltype);
	$("#nackName").html(nackName);


	var MakeCall = {
		"cmd": "dial_ap_req",
		"agentId": agentId,
		"dial_number": dial_number,
		"cust_lv": cust_lv,
		"cust_id": cust_id
	}
	var objName = "MakeCall";
	if (info != null)
		infoEval(objName, info);
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(MakeCall),
		success: function(data) {
			$("#MsgOutput").append(data);
		
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			// alert("error");
		}
	});
}

//전화걸기2
function RecSeeM_MakeCall2(
	agentId, dial_number, cust_lv, cust_id,
	calltype, pbxProtocol, pbxIP, pbxPort, pbxId, pbxPw, info) {//info는 배열 방식으로 10개까지만 들어갑니다.

	document.getElementById("Callbar").hidden = false;
	var nackName = document.getElementById("agentId").value;
	var Calltype = "소프트폰";
	$("#calltype").html(Calltype);
	$("#nackName").html(nackName);

	var MakeCall = {
		"cmd": "dial_ap_req2",
		"agentId": agentId,
		"dial_number": dial_number,
		"cust_lv": cust_lv,
		"cust_id": cust_id,
		"calltype": calltype,
		"pbxProtocol": pbxProtocol,
		"pbxIP": pbxIP,
		"pbxPort": pbxPort,
		"pbxId": pbxId,
		"pbxPw": pbxPw
	}
	var objName = "MakeCall";
	if (info != null)
		infoEval(objName, info);
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(MakeCall),
		success: function(data) {
			$("#MsgOutput").append(data);
		
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("error");
		}
	});
}

//전화받기
function RecSeeM_AnswerPhone(agentId) {
	var AnswerPhone = {
		"cmd": "answer_ap_req",
		"agentId": agentId
	}
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(AnswerPhone),
		success: function(data) {
			$("#MsgOutput").append(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("error");
		}
	});
}

//전화끊기
function RecSeeM_DropCall(agentId, reason) {

	document.getElementById("popup_calling_bar").hidden = true;

	var DropCall = {
		"cmd": "drop_ap_req",
		"agentId": agentId,
		"reason": reason
	}
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(DropCall),
		success: function(data) {
			$("#MsgOutput").append(data);
		
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("error");
		}
	});
}

//전화옴 gw
function RecSeeM_Calls(phone, caller) {
	var Calls = {
		"evt": "onoffer",
		"phone": phone,
		"caller": caller
	}
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(Calls),
		success: function(data) {
			$("#MsgOutput").append(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("error");
		}
	});
}

//전화연결중 gw
function RecSeeM_CallConnecting(phone, caller) {
	var CallConnecting = {
		"evt": "ondialing",
		"phone": phone,
		"caller": caller
	}
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(CallConnecting),
		success: function(data) {
			$("#MsgOutput").append(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("error");
		}
	});
}
//전화연결됨 gw
function RecSeeM_CallConnected() {
	var CallConnected = {
		"cmd": "login_ap_req"
	}
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(CallConnected),
		success: function(data) {
			$("#MsgOutput").append(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("error");
		}
	});
}
//전화끊김 gw
function RecSeeM_CallDisconnected() {
	var CallDisconnected = {
		"cmd": "login_ap_req"
	}
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(CallDisconnected),
		success: function(data) {
			$("#MsgOutput").append(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("error");
		}
	});
}



//내선번호호출 url이 다름
function RecSeeM_GetCurrentStatus(ext) {
	var GetCurrentStatus = {
		"ext": ext
	}
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(GetCurrentStatus),
		success: function(data) {
			$("#MsgOutput").append(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("error");
		}
	});
}

//호전환하기
function RecSeeM_CallTransfer(agentId, caller, excaller) {


	var CallTransfer = { "cmd": "exchange_ap_req", "agentId": agentId, "caller": caller, "excaller": excaller }
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(CallTransfer),
		success: function(data) {
			$("#MsgOutput").append(data);
			document.getElementById("CallTransfer").disabled = true;
			document.getElementById("CallBack").disabled = false;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("error");
		}
	});
}

//복귀하기
function RecSeeM_CallBack(agentId, caller, excaller) {

	var CallBack = { "cmd": "call_back_ap_req", "agentId": agentId, "caller": caller, "excaller": excaller }
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(CallBack),
		success: function(data) {
			$("#MsgOutput").append(data);
			document.getElementById("CallTransfer").disabled = false;
			document.getElementById("CallBack").disabled = true;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("error");
		}
	});
}

//3자통화하기
function RecSeeM_CallThreeWay(agentId, caller, excaller) {
	var CallThreeWay = { "cmd": "third_call_ap_req", "agentId": agentId, "caller": caller, "excaller": excaller }
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(CallThreeWay),
		success: function(data) {
			$("#MsgOutput").append(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("error");
		}
	});
}

//파일명 얻기
function RecSeeM_GetFile(agentId, phone, starttime, call_type) {
	var GetFile = {
		"cmd": "get_filename_ap_req",
		"agentId": agentId,
		"phone": phone,
		"starttime": starttime,
		"call_type": call_type
	}
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(GetFile),
		success: function(data) {
			$("#MsgOutput").append(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("error");
		}
	});
}


