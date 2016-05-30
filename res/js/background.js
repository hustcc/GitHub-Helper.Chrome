var setting = {'status': 'on'};
chrome.storage.local.get(['on'], function(data) {
	if (data['status']) {
		setting['status'] = data['status'];
	}
	else {
		setting['status'] = 'on';
	}
	// 读取配置成功之后，显示图标
	setStatus(setting['status']);
});


function saveSetting() {
	chrome.storage.local.set({'status': setting['status']}, function() {}); // 保存到本地
}


function setStatus(status) {
	if (status === 'on') {
		chrome.browserAction.setBadgeText({'text': 'on'});
		chrome.browserAction.setBadgeBackgroundColor({'color': '#14892c'});
	}
	else {
		chrome.browserAction.setBadgeText({'text': 'off'});
		chrome.browserAction.setBadgeBackgroundColor({'color': '#d04437'});
	}
	saveSetting();
}

function toggleOnOff(tab) {
	if (setting['status'] === 'on') {
		setting['status'] = 'off';
	}
	else {
		setting['status'] = 'on';
	}
	setStatus(setting['status']);
}

// 监听点击事件
chrome.browserAction.onClicked.addListener(toggleOnOff);

// 回复状态
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	sendResponse(setting['status']);
});