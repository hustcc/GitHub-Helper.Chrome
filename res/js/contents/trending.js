// trending.js


function addTrendingLink() {
	var menu_nav = document.querySelector('.Header nav');
	/*
	<li class="header-nav-item">
	    <a href="/pulls" class="js-selected-navigation-item header-nav-link" data-ga-click="Header, click, Nav menu - item:pulls context:user" data-hotkey="g p" data-selected-links="/pulls /pulls/assigned /pulls/mentioned /pulls">Pull requests</a>        
	</li>
	*/
	if (menu_nav) {
		var trending = tag('a', 'js-selected-navigation-item Header-link  mr-3', 'Trending');
		trending.href = '/trending'
		menu_nav.appendChild(trending);
	}
}

chrome.runtime.sendMessage({"get": "status", "from": "trending"}, function(response) {
    if ('off' !== response['status'] && 'off' !== response['trending_link']) {
        addTrendingLink();
    }
});
