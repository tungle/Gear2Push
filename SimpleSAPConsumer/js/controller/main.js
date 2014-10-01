/*Instructions for JSLint*/
/*jslint browser: true*/
/*global Audio, tizen, webapis, initializeTGMMessage*/

var detailsHtml = null;
var notiHtml = null;

var SAAgent = null;
var SASocket = null;
var CHANNELID = 100;

var tag = "SIMPLE SAP ";
var ProviderAppName = "TripGo";
var connectButton;

var audio = null;
var timer = null;
var message = null;

var DISCONNECT_STRING = "Unlink";
var CONNECT_STRING = "Link";
var DISCONNECTED_MESSAGE = "Please connect with our service on your host device to get notications";
var no_notifications_string = "You have no new notifications";

/* Helper functions */
function loadHTML(url) {
	try {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", url, false);
		xmlhttp.send();
		console.log(xmlhttp.responseText);
		return xmlhttp.responseText;
	} catch (e) {
		console.log(e.message);
	}
}

function setHTMLForBodyTag(htmlString) {
	document.body.innerHTML = htmlString;
}

function createHTML(log_string) {
	var log = document.getElementById('resultBoard');
	if (log) {
		console.log("CREATEHTML: ok");
		log.innerHTML = log_string;
	}
	console.log("CREATEHTML: " + log_string);
}

function setupvaluesForNotiWindow() {
	var pSubtitle = document.getElementById("pSubTitle"), pTime = document
			.getElementById("pReceivedTime"), iconNotiImg = document
			.getElementById("icon-noti"), popCancel = document
			.getElementById("pop-cancel"), popSnooze = document
			.getElementById("pop-snooze");

	if (pSubtitle && pTime && iconNotiImg && popCancel && popSnooze) {
		console.log('setting up noti window');
		console.log('Message subtitle: ' + message.getSubtitle());
		pSubtitle.innerHTML = message.getSubtitle();
		console.log('Message received time: ' + message.getReceivedDateInString());
		pTime.innerHTML = message.getReceivedDateInString();
		console.log('Message icon path: ' + message.getIconPath());
		iconNotiImg.src = message.getIconPath();

		switch (message.getDisplayMode()) {
		case 'snooze':
			popCancel.style.display = "none";
			popSnooze.style.marginRight = "40%";
			break;
		case 'cancel':
			popSnooze.style.display = "none";
			popCancel.style.marginLeft = "40%";
			break;

		default:
			break;
		}
	}
}

function setupForDetailsWindowInCaseOfNoMessages() {
	if (!detailsHtml) {
		detailsHtml = loadHTML('view/message_details.html');
	}
	setHTMLForBodyTag(detailsHtml);

	var connectButton = document.getElementById("connectButton");

	if (connectButton) {
		if (SASocket) {
			connectButton.innerHTML = DISCONNECT_STRING;
			createHTML(no_notifications_string);
		} else {
			connectButton.innerHTML = CONNECT_STRING;
			createHTML(DISCONNECTED_MESSAGE);
		}
	}
}

function onerror(err) {
	console.log("ONERROR: err [" + err.name + "] msg[" + err.message + "]");
}

function onErrorFindingAgent(err) {
	alert("Cannot find device to connect.");
	console.log("onErrorFindingAgent: err [" + err.name + "] msg["
			+ err.message + "]");
}

function hideSnoozeAndCancel() {
	var divCancel = document.getElementById("pop-cancel"), divSnooze = document
			.getElementById("pop-snooze");
	if (divSnooze && divCancel) {
		divCancel.style.visibility = "hidden";
		divSnooze.style.visibility = "hidden";
	}
}

/* Handles connection */
function disconnect() {
	if (SASocket !== null) {
		console.log(" DISCONNECT SASOCKET NOT NULL");
		try {
			SASocket.close();
		} catch (err) {
			console.log(" DISCONNECT ERROR: exception [" + err.name + "] msg["
					+ err.message + "]");
		} finally {
			SASocket = null;
			setupForDetailsWindowInCaseOfNoMessages();
		}
	}
}

function onreceive(channelId, data) {
	try {
		tizen.application.launch("UUUSOmFAGG.TripGo");
		message = initializeTGMMessage(data);
	} catch (e) {
		console.log(e.name + ": " + e.message);
	}
	if (!notiHtml) {
		notiHtml = loadHTML('view/noti.html');
	}
	setHTMLForBodyTag(notiHtml);
	setupvaluesForNotiWindow();
}

var agentCallback = {
	/* when a remote peer agent requests a service connection */
	onrequest : function(peerAgent) {
		console.log(" onrequest " + peerAgent);
		SAAgent.acceptServiceConnectionRequest(peerAgent);
	},
	onconnect : function(socket) {
		console.log("agentCallback onconnect" + socket);
		SASocket = socket;
		// alert("SAP Connection established with RemotePeer");
		setupForDetailsWindowInCaseOfNoMessages();
		if (!connectButton) {
			connectButton = document.getElementById('connectButton');
		}
		if (connectButton) {
			connectButton.innerHTML = DISCONNECT_STRING;
		}
		SASocket.setDataReceiveListener(onreceive);
		SASocket.setSocketStatusListener(function(reason) {
			console.log("Service connection lost, Reason : [" + reason + "]");
			disconnect();
		});
	},
	onerror : onerror
};

var peerAgentFindCallback = {
	onpeeragentfound : function(peerAgent) {
		try {
			if (peerAgent.appName === ProviderAppName) {
				console.log(" peerAgentFindCallback::onpeeragentfound "
						+ peerAgent.appname + " || " + ProviderAppName);

				SAAgent.requestServiceConnection(peerAgent);
			} else {
				console.log(" peerAgentFindCallback::onpeeragentfound else");
				alert("Not expected app!! : " + peerAgent.appName);
			}
		} catch (err) {
			console.log(" peerAgentFindCallback::onpeeragentfound exception ["
					+ err.name + "] msg[" + err.message + "]");
		}
	},
	onerror : onErrorFindingAgent
};

function onsuccess(agents) {
	try {
		if (agents.length > 0) {
			SAAgent = agents[0];
			// set this to passively wait for connection from Android side in
			// case this app is switched to background
			console.log(" set service connection listener " + SAAgent.name);

			SAAgent.setServiceConnectionListener(agentCallback);
			console.log(" onsuccess " + SAAgent.name);
		} else {
			alert("Not found SAAgent!!");
			console.log(" onsuccess else");
		}
	} catch (err) {
		console.log("onsuccess exception [" + err.name + "] msg[" + err.message
				+ "]");
	}
}

function connect() {
	try {
		// now actively find peer agents
		SAAgent.setPeerAgentFindListener(peerAgentFindCallback);
		SAAgent.findPeerAgents();
	} catch (err) {
		console.log("exception [" + err.name + "] msg[" + err.message + "]");
	}
}

try {
	webapis.sa.requestSAAgent(onsuccess, onerror);
} catch (e) {
	console.log("Error Exception, error name : " + e.name
			+ ", error message : " + e.message);
}

/* Handles click events */
function processConnection() {
	console.log("connect clicked!");
	if (SASocket) {
		console.log("SASocket not null, about to disconnect");
		disconnect();
	} else {
		console.log("SASocket NULL, about to connect");
		connect();
	}
}

function closeButtonClicked() {
	tizen.application.getCurrentApplication().hide();
	setTimeout(setupForDetailsWindowInCaseOfNoMessages, 100);
}

function viewMessage() {
	if (!detailsHtml) {
		detailsHtml = loadHTML('view/message_details.html');
	}
	setHTMLForBodyTag(detailsHtml);
	var headerContentTag = document.getElementById("headerContent"), connectButton = document
			.getElementById("connectButton");
	if (headerContentTag) {
		console.log("View message ok");
		if (message.getSubtitle().length > 14) {
			headerContentTag.innerHTML = message.getSubtitle().substr(0, 13) + "...";
		} else {
			headerContentTag.innerHTML = message.getSubtitle();
		}
		createHTML(message.getContent());
	}

	if (connectButton) {
		if (SASocket) {
			connectButton.innerHTML = DISCONNECT_STRING;
		} else {
			connectButton.innerHTML = CONNECT_STRING;
		}
	}

	console.log("View message.");
}

function snooze() {
	closeButtonClicked();
	if (SASocket) {
		SASocket.sendData(CHANNELID, "snooze#~#" + message.getTripId());
	}
	console.log("Snooze");
}

function cancelNotification() {
	closeButtonClicked();
	if (SASocket) {
		SASocket.sendData(CHANNELID, "cancel#~#" + message.getTripId());
	}
	console.log("Cancel notification");
}

window.onload = function() {
	document.addEventListener('tizenhwkey', function(e) {
		if (e.keyName === "back") {
			tizen.application.getCurrentApplication().hide();
			if (document.getElementById("connectButton")) {
				closeButtonClicked();
			} else {
				cancelNotification();
			}
		}
	});
};