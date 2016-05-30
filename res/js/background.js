var setting = {'status': 'on'};
chrome.storage.local.get(['status', 'trending_link', 'github_avatar', 'github_fileicon', 'github_filediff'], function(data) {
	setting = loadConfigueData(data);
	// 读取配置成功之后，显示图标
	setStatus(setting['status']);
});

function loadConfigueData(data, keys) {
	if (! keys) {
		keys = ['status', 'trending_link', 'github_avatar', 'github_fileicon', 'github_filediff']
	}
	[].slice.call(keys).forEach(function (e) {
		if (data[e]) {
			setting[e] = data[e];
		}
		else {
			setting[e] = 'on'; // 默认为开启
		}
	});
	return setting;
}

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
	if ('status' === request.set) {
		// reload config
		setting = loadConfigueData(request.data, ['trending_link', 'github_avatar', 'github_fileicon', 'github_filediff'])
		sendResponse(true);
	}
	else if ('status' === request.get) {
		sendResponse(setting);
	}
});