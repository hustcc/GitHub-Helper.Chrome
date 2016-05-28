var file_icon_dict = {
  '.html': '<i class="devicons devicons-html5"></i>',
  '.css': '<i class="devicons devicons-css3_full"></i>',
  '.sass': '<i class="devicons devicons-sass"></i>',
  '.scss': '<i class="devicons devicons-css3_full"></i>',
  '.less': '<i class="devicons devicons-less"></i>',

  '.js': '<i class="devicons devicons-javascript"></i>',
  '.java': '<i class="devicons devicons-java"></i>',
  '.py': '<i class="devicons devicons-python"></i>',
  '.php': '<i class="devicons devicons-php"></i>',
  '.git': '<i class="devicons devicons-git"></i>',
  
  '.md': '<i class="devicons devicons-markdown"></i>',
  '.rb': '<i class="devicons devicons-ruby_rough"></i>',
  '.sh': '<i class="devicons devicons-terminal"></i>',
  '.go': '<i class="devicons devicons-go"></i>',
  '.go': '<i class="devicons devicons-mysql"></i>',
  '.erl': '<i class="devicons devicons-erlang"></i>',
  '.c': '<i class="devicons devicons-visualstudio"></i>',
  '.cpp': '<i class="devicons devicons-visualstudio"></i>',
  '.asp': '<i class="devicons devicons-netmagazine"></i>',
  '.cs': '<i class="devicons devicons-visualstudio"></i>',
  '.coffee': '<i class="devicons devicons-coffeescript"></i>',
  '.scala': '<i class="devicons devicons-scala"></i>',
  '.swift': '<i class="devicons devicons-swift"></i>',
  
  '.yml': '<i class="devicons devicons-database"></i>',
  '.json': '<i class="devicons devicons-database"></i>',
  '.xml': '<i class="devicons devicons-database"></i>',
  '.conf': '<i class="devicons devicons-database"></i>',
  '.map': '<i class="devicons devicons-database"></i>',
  '.plist': '<i class="devicons devicons-apple"></i>',

  '.png': '<i class="devicons devicons-nancy"></i>',
  '.jpg': '<i class="devicons devicons-nancy"></i>',
  '.gif': '<i class="devicons devicons-nancy"></i>',
  '.bpm': '<i class="devicons devicons-nancy"></i>',
  '.ico': '<i class="devicons devicons-nancy"></i>',
  '.crx': '<i class="devicons devicons-chrome"></i>',
  '.svg': '<i class="devicons devicons-snap_svg"></i>',

  '.jshintrc': '<i class="devicons devicons-nodejs_small"></i>',
  '.npmignore': '<i class="devicons devicons-npm"></i>',
  '.gitignore': '<i class="devicons devicons-git"></i>',
  '.viminfo': '<i class="devicons devicons-vim"></i>',
  '.sublime-settings': '<i class="devicons devicons-sublime"></i>',
  '.sublime': '<i class="devicons devicons-sublime"></i>',
  '.eslintrc': '<i class="devicons devicons-nodejs_small"></i>',
  
  // font devicons devicons-symfony
  '.eot': '<i class="devicons devicons-symfony"></i>',
  '.ttf': '<i class="devicons devicons-symfony"></i>',
  '.woff': '<i class="devicons devicons-symfony"></i>',

}

function getExt(f) {
  var index = f.lastIndexOf('.');
  if (index === -1) {
    return ''
  }
  return f.substr(index); 
}

function file2iconHtml(fn) {
  var file_ext = getExt(fn).toLowerCase();
  // 优先判断文件名
  if (fn === 'license') {
    return '<i class="devicons devicons-opensource"></i>';
  }
  if (fn === 'package.json') {
    return '<i class="devicons devicons-npm"></i>';
  }
  if (fn === '.travis.yml') {
    return '<i class="devicons devicons-travis"></i>';
  }
  if (fn === 'bower.json') {
    return '<i class="devicons devicons-bower"></i>';
  }
  if (fn === 'gulpfile.js') {
    return '<i class="devicons devicons-gulp"></i>';
  }
  if (fn === 'manifest.json') {
    return '<i class="devicons devicons-chrome"></i>';
  }
  if (fn === 'androidmanfest.xml.') {
    return '<i class="devicons devicons-android"></i>';
  }
  // 判断扩展名
  if (file_icon_dict[file_ext]) {
    return file_icon_dict[file_ext];
  }
  return null;
}

var icon = null;
var iconHtm = null;
var content = null;
var fn = null;

function doFileIcon() {
  var f = document.querySelectorAll('tr.js-navigation-item');

  [].slice.call(f).forEach(function (tr) {
    icon = tr.querySelector('.icon');
    if (! icon) {
      return;
    }
    if (icon.getAttribute('github-chrome') == '1') {
      return;
    }
    icon.setAttribute('github-chrome', '1');

    content = tr.querySelector('.content a');
    if (!content) {
      return;
    }
    fn = content.innerText.trim().toLowerCase();;
    iconHtml = file2iconHtml(fn);
    if (iconHtml) {
      icon.innerHTML = iconHtml;
    }
  });
  frame_func(doFileIcon);
}

var frame_func = function(func) {
  window.setTimeout(func, 1000 / 10);
};

doFileIcon();