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
  '.markdown': '<i class="devicons devicons-markdown"></i>',
  '.rst': '<i class="devicons devicons-markdown"></i>',
  '.mdown': '<i class="devicons devicons-markdown"></i>',
  '.rb': '<i class="devicons devicons-ruby_rough"></i>',
  '.sh': '<i class="devicons devicons-terminal"></i>',
  '.bat': '<i class="devicons devicons-terminal"></i>',
  '.hs': '<i class="devicons devicons-haskell"></i>',
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
  '.clj': '<i class="devicons devicons-clojure"></i>',

  '.png': '<i class="devicons devicons-nancy"></i>',
  '.jpg': '<i class="devicons devicons-nancy"></i>',
  '.gif': '<i class="devicons devicons-nancy"></i>',
  '.bpm': '<i class="devicons devicons-nancy"></i>',
  '.ico': '<i class="devicons devicons-nancy"></i>',
  '.crx': '<i class="devicons devicons-chrome"></i>',
  '.svg': '<i class="devicons devicons-snap_svg"></i>',
  '.exe': '<i class="devicons devicons-windows"></i>',

  '.jshintrc': '<i class="devicons devicons-nodejs_small"></i>',
  '.npmignore': '<i class="devicons devicons-npm"></i>',
  '.gitignore': '<i class="devicons devicons-git"></i>',
  '.viminfo': '<i class="devicons devicons-vim"></i>',
  '.vim': '<i class="devicons devicons-vim"></i>',
  '.sublime-settings': '<i class="devicons devicons-sublime"></i>',
  '.sublime': '<i class="devicons devicons-sublime"></i>',
  '.eslintrc': '<i class="devicons devicons-nodejs_small"></i>',
  '.docker': '<i class="devicons devicons-docker"></i>',
  // font devicons devicons-symfony
  '.eot': '<i class="devicons devicons-symfony"></i>',
  '.ttf': '<i class="devicons devicons-symfony"></i>',
  '.woff': '<i class="devicons devicons-symfony"></i>',
}

function getExt(f) {
  var index = f.lastIndexOf('.');
  if (index === -1) {
    return '';
  }
  return f.substr(index); 
}

function file2iconHtml(fn) {
  // 文件扩展名小写
  var file_ext = getExt(fn).toLowerCase(); 
  // 优先判断文件名（小写）
  fn = fn.toLowerCase();
  if (fn === 'license' || fn === 'license.txt') {
    return '<i class="devicons devicons-opensource"></i>';
  }
  if (fn.startsWith('.npm') || (fn === 'package.json')) {
    return '<i class="devicons devicons-npm"></i>';
  }
  if (fn.startsWith('.travis.yml')) {
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
  if (fn === 'androidmanfest.xml') {
    return '<i class="devicons devicons-android"></i>';
  }
  if (fn.startsWith('.docker') || (fn === 'dockerfile')) {
      return '<i class="devicons devicons-docker"></i>';
  }
  if (fn === 'makefile') {
    return '<i class="devicons devicons-terminal"></i>';
  }
  if (fn === 'cname') {
    return '<i class="devicons devicons-ie"></i>';
  }
  // 判断扩展名
  if (file_icon_dict[file_ext]) {
    return file_icon_dict[file_ext];
  }
  return null;
}

var icon = null;
var iconHtml = null;
var content = null;
var fn = null;

var fileTable = null;
var fileTrs = null;

function doFileIcon() {
  fileTable = document.querySelector('table.files.js-navigation-container');
  // 有文件列表，并且没有被处理过
  if (fileTable && ('1' !== fileTable.getAttribute('github-helper-chrome'))) {

    fileTrs = fileTable.querySelectorAll('tr.js-navigation-item');
    // 设置已处理
    fileTable.setAttribute('github-helper-chrome', '1');
    // 开始处理
    [].slice.call(fileTrs).forEach(function (tr) {
      icon = tr.querySelector('.icon');
      if (! icon) {
        return;
      }
      content = tr.querySelector('.content a');
      if (!content) {
        return;
      }
      fn = content.innerText.trim();
      iconHtml = file2iconHtml(fn);
      if (iconHtml) {
        icon.innerHTML = iconHtml;
      }
    });
  }

  if ('off' != status_local) {
    frame_func(doFileIcon);
  }
}

var frame_func = function(func) {
  window.setTimeout(func, 1000 / 8);
};

var status_local = null;

chrome.runtime.sendMessage({"get": "status", "from": "file_icon"}, function(response) {
  status_local = response;
  if ('off' !== status_local['status'] && 'off' !== status_local['github_fileicon']) {
    doFileIcon();
  }
});