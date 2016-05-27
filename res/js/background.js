function checkForGithub(tabId, changeInfo, tab) {
	if (tab.url.indexOf('https://github.com/') === 0 || tab.url.indexOf('http://github.com/') === 0) {
		chrome.pageAction.show(tab.id);
	}
	else {
		chrome.pageAction.hide(tab.id);
	}
};

// 如果是github地址，则显示图标
chrome.tabs.onUpdated.addListener(checkForGithub);