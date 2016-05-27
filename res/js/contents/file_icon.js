var f = document.querySelectorAll('tr.js-navigation-item');

f.forEach(function (tr) {
  var icon = tr.children[0];
  var fn = tr.children[1].children[0].textContent;

  if (fn.toLowerCase() === 'license') {
    icon.innerHTML = '<i class="fa fa-certificate"></i>';
  } else if (fn.startsWith('.git')) {
    icon.innerHTML = '<i class="devicons devicons-git"></i>';
  } else if (fn.endsWith('.js')) {
    icon.innerHTML = '<i class="devicons devicons-javascript_badge"></i>';
  } else if (fn.endsWith('.css')) {
    icon.innerHTML = '<i class="devicons devicons-css3_full"></i>';
  } else if (fn.endsWith('.scss')) {
    icon.innerHTML = '<i class="devicons devicons-sass"></i>';
  } else if (fn.endsWith('.less')) {
    icon.innerHTML = '<i class="devicons devicons-less"></i>';
  } else if (fn.endsWith('.html')) {
    icon.innerHTML = '<i class="devicons devicons-html5"></i>';
  } else if (fn.endsWith('.md')) {
    icon.innerHTML = '<i class="devicons devicons-markdown"></i>';
  } else if (fn.endsWith('.hs')) {
    icon.innerHTML = '<i class="devicons devicons-haskell"></i>';
  } else if (fn.endsWith('.py')) {
    icon.innerHTML = '<i class="devicons devicons-python"></i>';
  } else if (fn.endsWith('.php')) {
    icon.innerHTML = '<i class="devicons devicons-php"></i>';
  } else if (fn.endsWith('.rb')) {
    icon.innerHTML = '<i class="devicons devicons-ruby_rough"></i>';
  } else if (fn.endsWith('.sh')) {
    icon.innerHTML = '<i class="icon-script-alt"></i>';
  } else if (fn.endsWith('.yml') || fn.endsWith('.yaml') || fn.endsWith('.json')) {
    icon.innerHTML = '<i class="devicons devicons-database"></i>';
  } else if (fn.endsWith('.swift')) {
    icon.innerHTML = '<i class="devicons devicons-swift"></i>';
  } else if (fn.endsWith('.plist')) {
    icon.innerHTML = '<i class="devicons devicons-apple"></i>';
  }
});
