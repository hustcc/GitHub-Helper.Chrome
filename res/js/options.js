function $_(id) {
	return document.getElementById(id);
}

var configuration = {};

function saveConfiguration() {
	[].slice.call(['trending_link', 'github_avatar', 'github_fileicon', 'github_filediff']).forEach(function (e) {
		if ($_(e).checked) {
			configuration[e] = 'on';
		}
		else {
			configuration[e] = 'off';
		}
	});
	chrome.storage.local.set(configuration, function() {
		chrome.runtime.sendMessage({"set": "status", "data": configuration}, function(response) {
	  		$_('tip_label').innerHTML = ' Saved.';
		});
		setTimeout(function() {
			$_('tip_label').innerHTML = '';
		}, 2000);
	}); // 保存到本地
}

function loadConfiguration() {
	chrome.storage.local.get(['status', 'trending_link', 'github_avatar', 'github_fileicon', 'github_filediff'], function(data) {
		// 写入状态
		[].slice.call(['trending_link', 'github_avatar', 'github_fileicon', 'github_filediff']).forEach(function (e) {
			if ('off' !== data[e]) {
				$_(e).setAttribute('checked', true);
				configuration[e] = 'on';
			}
			else {
				configuration[e] = 'off';
			}
		});

		if ('off' === data['status']) {
			configuration['status'] == 'off';
			// 总闸关闭，配置项全部不可写
			[].slice.call(['trending_link', 'github_avatar', 'github_fileicon', 'github_filediff']).forEach(function (e) {
				$_(e).disabled = true;
			});
			$_('save_button').disabled = true;
			
			$_('tip_label').innerHTML = ' Plugin is OFF.'
		}
		else {
			configuration['status'] = 'on';
		}
	});
}

loadConfiguration();

$_('save_button').onclick = saveConfiguration;