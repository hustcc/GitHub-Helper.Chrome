// trending.js


function addTrendingLink() {
	var menu_nav = document.querySelector('.flex-justify-between:first-child ul.list-style-none');
	/*
	<li class="header-nav-item">
	    <a href="/pulls" class="js-selected-navigation-item header-nav-link" data-ga-click="Header, click, Nav menu - item:pulls context:user" data-hotkey="g p" data-selected-links="/pulls /pulls/assigned /pulls/mentioned /pulls">Pull requests</a>        
	</li>
	*/
	if (menu_nav) {
		var trending = tag('li', 'header-nav-item', '<a href="/trending" class="js-selected-navigation-item HeaderNavlink px-2">Trending</a>');
		menu_nav.appendChild(trending);
	}
}

chrome.runtime.sendMessage({"get": "status", "from": "trending"}, function(response) {
    if ('off' !== response['status'] && 'off' !== response['trending_link']) {
        addTrendingLink();
    }
});
