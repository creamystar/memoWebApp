//연결확인
/*
로그인시 아이디와 휴대전화정보를 저장하여 20초마다 신호를 보낼 수 있도록 하는 시그널아이디와 휴대전화
 */
var signalId = null;
var signalPhone = null;
var CallingId = null;


var CALLINGCHECK = null;

var interval = null;



////////////타이머

//0이면 타이머 정지상태 1이면 돌아가야함
var timeOnOff = 0;

var time = 0;
var starFlag = true;
// $(document).ready(function () {
// 	buttonEvt();
// });

function init() {
	document.getElementById("time").innerHTML = "00:00:00";
}

function outit() {
	document.getElementById("time").innerHTML = "연결중..";
}


function buttonEvt() {
	var hour = 0;
	var min = 0;
	var sec = 0;
	var timer;

	if (timeOnOff == 0) {
		init();
	}

	if (CALLINGCHECK == "CALLING" || CALLINGCHECK == "CONNECTED_PBX") {

		if (timeOnOff == 0) {
			timeOnOff = 1;
			if (starFlag) {

				starFlag = false;

				if (time == 0) {
					init();
				}

				timer = setInterval(function () {
					time++;

					min = Math.floor(time / 60);
					hour = Math.floor(min / 60);
					sec = time % 60;
					min = min % 60;

					var th = hour;
					var tm = min;
					var ts = sec;
					if (th < 10) {
						th = "0" + hour;
					}
					if (tm < 10) {
						tm = "0" + min;
					}
					if (ts < 10) {
						ts = "0" + sec;
					}

					document.getElementById("time").innerHTML = th + ":" + tm + ":" + ts;
				}, 1000);
			}
		};

	}

}
// pause btn
$("#pausebtn").click(function () {
	if (time != 0) {

		clearInterval(timer);
		starFlag = false;
	}
});

// stop btn
$("#endCall").click(function () {
	if (time != 0) {

		clearInterval(timer);
		starFlag = false;
		time = 0;
		init();
	}
});

////////////타이머
//url 서버 접속에 이용되는 url
var url = "http://52.79.242.171:28889/agent";

//날짜 계산 로그인시 이용되는 dateTime에 이용되는 함수
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

//받아온info배열 정보 info_1~10까지 저장 전화걸기에서 이용 
function infoeval(objName, info) {
	for (var i = 0; i < 10; i++) {
		eval(objName + ".info_" + (i + 1) + "= info[" + i + "]");
	}
}

//연결확인 
/*
실행하는 setIntreval 20초마다 RecSeeM_Connectionsignal 함수를 실행하여 서버에 신호를 준다.
 */
$(document).ready(function () {
	setInterval(function () {
		if (Boolean(signalId) && Boolean(signalPhone)) {
			RecSeeM_Connectionsignal(signalId, signalPhone);
		}
	}, 20000);
});

//전화연결확인
/*
전화가 걸리기 시작하면 3초마다 RecSeeM_GetCurrentStatus 함수를 실행햐여 서버에 신호를 준다.
*/
function RecSeeM_MakeCallin(CallingsId) {

	interval = setInterval(function () {
			if (Boolean(CallingId)) {
			RecSeeM_GetCurrentStatus(CallingsId);
		}
	}, 3000);

}

function stop() {
	console.log("stopped")
	clearInterval(interval)
}

//로그인시 아이디 비밀번호 확인하여 다르면 실행
function RecSeeM_Login_Check() {
	signalId = null;
	signalPhone = null;
}

//로그인
/*
앱이 실행되고 로그인할때
	
result : "success" 성공 else 실패사유
 */
function RecSeeM_Login(agentId, password, phone) {

	console.log("로그인을 시도 합니다.");

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
		dataType: "json",
		success: function (data) {

			if (data.result == 'success') {
				console.log("성공.");
				console.log(data);

				$("#MsgOutput").append(data);
				document.getElementById("btnLogin").disabled = true;
				document.getElementById("btnLogout").disabled = false;

				signalId = agentId;
				signalPhone = phone;

			} else {
				console.log("실패.");
				RecSeeM_Login_Check();
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("error");
		}
	});
}

//로그아웃
/*
앱에서 로그아웃을 누를때
	
result : "success" 성공 else 실패사유
 */
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
		success: function (data) {

			console.log("로그아웃 하였습니다.");
			console.log(data);

			$("#MsgOutput").append(data);
			document.getElementById("btnLogin").disabled = false;
			document.getElementById("btnLogout").disabled = true;

			signalId = null;
			signalPhone = null;
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("error");
		}
	});
}

//연결확인
/*
로그인 이후 20초마다 전송
*/
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
		success: function (data) {

			console.log(data);

			$("#MsgOutput").append(data);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("error");
		}
	});
}

//전화걸기1
/*
info는 배열 방식으로 10개까지만 들어갑니다.
info_1~10까지의 key가 준비되어있고 배열로 들어온 info의 정보가 순서대로 저장됩니다. 
휴대폰으로 전화걸기 명령
	
result : "success" 성공 else 실패사유
 */
function RecSeeM_MakeCall(agentId, dial_number, cust_lv, cust_id, info) {

	var MakeCall = {
		"cmd": "dial_ap_req",
		"agentId": agentId,
		"dial_number": dial_number,
		"cust_lv": cust_lv,
		"cust_id": cust_id
	}
	var objName = "MakeCall";
	if (info != null) {
		infoEval(objName, info);
	}

	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(MakeCall),
		success: function (data) {
			console.log("Call1가는중");
			console.log(data);

			//전화를 받으면 알수있도록 CallingId에 agentId를 담아 RecSeeM_MakeCallin함수를 실행하여 3초마다 확인할 수 있게 한다.
			CallingId = agentId;
			RecSeeM_MakeCallin(CallingId);

			$("#MsgOutput").append(data);

			document.getElementById("popup_calling_bar2").hidden = false;

		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("errorcall");
		}
	});
}

//전화걸기2
/*
info는 배열 방식으로 10개까지만 들어갑니다.
info_1~10까지의 key가 준비되어있고 배열로 들어온 info의 정보가 순서대로 저장됩니다.
	
휴대폰으로 전화걸기 명령 Calltype 분류
	
calltype : "USIM(유심통화)", "PBX(데이터전화)"
pbxProtocol : 데이터전화 시 교환기 접속 프로토콜
pbxIP : 데이터전화 시 교환기 접속 IP
pbxPort : 데이터전화 시 교환기 접속 포트
pbxId : 데이터전화 시 교환기 로그인 ID
pbxPw : 데이터전화 시 교환기 로그인 PW
	
result : "success" 성공 else 실패사유
 */
function RecSeeM_MakeCall2(
	agentId, dial_number, cust_lv, cust_id,
	calltype, pbxProtocol, pbxIP, pbxPort, pbxId, pbxPw, info) {


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
	if (info != null) {
		infoEval(objName, info);
	}
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(MakeCall),
		dataType: "json",
		success: function (data) {

			console.log("Call2가는중");
			console.log(data);
			timeOnOff=0;
			//전화를 받으면 알수있도록 CallingId에 agentId를 담아 RecSeeM_MakeCallin함수를 실행하여 3초마다 확인할 수 있게 한다.
			CallingId = agentId;
			RecSeeM_MakeCallin(CallingId);

			$("#MsgOutput").append(data);

			document.getElementById("popup_calling_bar2").hidden = false;

			$("#MsgOutput").append(data);

		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("error");
		}
	});
}

//전화받기
/*
휴대폰으로 전화받기 명령
	
result : "success" 성공 else 실패사유
*/
function RecSeeM_AnswerPhone(agentId) {
	var AnswerPhone = {
		"cmd": "answer_ap_req",
		"agentId": agentId
	}
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(AnswerPhone),
		dataType: "json",
		success: function (data) {
			$("#MsgOutput").append(data);
			console.log(data);



		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("error");
		}
	});
}

//내선번호호출 
/*
상태 불러오기
통화를 시작한후에 지속적으로 통화중인지 체크하는 함수
*/
function RecSeeM_GetCurrentStatus(agentId) {

	var GetCurrentStatus = {
		"agentId": agentId
	}
	$.ajax({
		type: "POST",
		url: "http://52.79.242.171:8080/receiver/getCallStatus",
		data: GetCurrentStatus,
		dataType: "json",
		success: function (data) {
			$("#MsgOutput").append(data);

			//데이터에 "CAILING"가들어오는지 확인
			CALLINGCHECK = data.status;
			console.log(data);

			//시간돌아가는 함수(CAILING이나 CONNECTED_PBX 들어올때실행)
			buttonEvt();


		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("error3c");
		}
	});
}


//전화끊기
/*
휴대폰으로 전화끊기 명령
	
reason : "busy(통화중)", "noAnswer(부재중)", "notFound(없는번호)", "endCall(통화종료)"
	
result : "success" 성공 else 실패사유
 */
function RecSeeM_DropCall(agentId, reason) {

	var DropCall = {
		"cmd": "drop_ap_req",
		"agentId": agentId,
		"reason": reason
	}
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(DropCall),
		success: function (data) {

			console.log(data);

			$("#MsgOutput").append(data);

			//전화를 끊으면 3초마다 확인되는 RecSeeM_MakeCallin함수를 정지시키기위해 null을 넣어준다.
			CallingId = null;
			//다시 통화를 할 준비
			timeOnOff = 3;

			outit();

			stop();

			CALLINGCHECK = null;

		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("error");
		}
	});
}


//호전환하기
/*
caller : 기존 전화번호
excaller : 전환 전화번호
 */
function RecSeeM_CallTransfer(agentId, caller, excaller) {


	var CallTransfer = {
		"cmd": "exchange_ap_req",
		"agentId": agentId,
		"caller": caller,
		"excaller": excaller
	}
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(CallTransfer),
		success: function (data) {
			console.log("호전환");
			console.log(data);

			$("#MsgOutput").append(data);

		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("error");
		}
	});
}

//복귀하기
/*
caller : 복귀 전화번호
excaller : 전환 전화번호
 */
function RecSeeM_CallBack(agentId, caller, excaller) {

	var CallBack = {
		"cmd": "call_back_ap_req",
		"agentId": agentId,
		"caller": caller,
		"excaller": excaller
	}
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(CallBack),
		success: function (data) {
			console.log("복귀");
			console.log(data);

			$("#MsgOutput").append(data);

		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("error");
		}
	});
}

//3자통화하기
/*
	excaller : 3자 전화번호
 */
function RecSeeM_CallThreeWay(agentId, caller, excaller) {
	var CallThreeWay = {
		"cmd": "third_call_ap_req",
		"agentId": agentId,
		"caller": caller,
		"excaller": excaller
	}
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(CallThreeWay),
		success: function (data) {
			console.log("3자통화");
			console.log(data);
			$("#MsgOutput").append(data);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("error");
		}
	});
}

//파일명 얻기
/*
녹취가 시작될때 서버로부터 녹취파일명 수신.
이미 파일명을 수신한경우는(GW를 통한 O.B) 진행 안함.
 */
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
		success: function (data) {
			$("#MsgOutput").append(data);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("error");
		}
	});
}

//버튼녹취 시작
/*
버튼녹취 시작 명령
	
result : "success" 성공 else 실패사유
 */
function RecSeeM_RecordingStart(agentId) {
	var Recording = {
		"cmd": "btn_rec_start_ap_req",
		"agentId": agentId
	}

	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(Recording),
		success: function (data) {
			console.log(data);
			$("#MsgOutput").append(data);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("error");
		}
	});
}

//버튼녹취 일시정지
/*
버튼녹취 일시정지명령
	
result : "success" 성공 else 실패사유
 */
function RecSeeM_RecordingPause(agentId) {
	var Pause = {
		"cmd": "btn_rec_pause_ap_req",
		"agentId": agentId
	}
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(Pause),
		success: function (data) {
			console.log(data);
			$("#MsgOutput").append(data);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("error");
		}
	});
}

//버튼녹취 재시작
/*
버튼녹취 재시작 명령
	
result : "success" 성공 else 실패사유
 */
function RecSeeM_RecordingRestart(agentId) {
	var Restart = {
		"cmd": "btn_rec_resume_ap_req",
		"agentId": agentId
	}
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(Restart),
		success: function (data) {
			console.log(data);
			$("#MsgOutput").append(data);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("error");
		}
	});
}

//버튼녹취 종료
/*
버튼녹취 종료 명령
	
result : "success" 성공 else 실패사유
 */
function RecSeeM_RecordingTermination(agentId) {
	var Termination = { "cmd": "btn_rec_stop_ap_req", "agentId": agentId }
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(Termination),
		success: function (data) {
			console.log(data);
			$("#MsgOutput").append(data);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("error");
		}
	});
}


//IVR걸기
/*
현재 통화중인지 확인한후에 통화중이 아닐경우 통화연결?
통화중일경우 진행 계속 
 */
function RecSeeM_InteractiveVoiceResponse() {
	var InteractiveVoiceResponse = {

	}
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(InteractiveVoiceResponse),
		success: function (data) {
			$("#MsgOutput").append(data);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("error");
		}
	});
}
