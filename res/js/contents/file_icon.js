var file_icon_dict = {
  '.html': '<i class="devicons devicons-html5"></i>',
  '.css': '<i class="devicons devicons-css3_full"></i>',
  '.sass': '<i class="devicons devicons-sass"></i>',
  '.less': '<i class="devicons devicons-less"></i>',
  '.js': '<i class="devicons devicons-javascript"></i>',
  '.java': '<i class="devicons devicons-java"></i>',
  '.py': '<i class="devicons devicons-python"></i>',
  '.php': '<i class="devicons devicons-php"></i>',
  '.git': '<i class="devicons devicons-git"></i>',
  '.gitignore': '<i class="devicons devicons-git"></i>',
  '.md': '<i class="devicons devicons-markdown"></i>',
  '.rb': '<i class="devicons devicons-ruby_rough"></i>',
  '.sh': '<i class="devicons devicons-terminal"></i>',
  '.yml': '<i class="devicons devicons-database"></i>',
  '.json': '<i class="devicons devicons-database"></i>',
  '.xml': '<i class="devicons devicons-database"></i>',
  '.xml': '<i class="devicons devicons-database"></i>',
  '.plist': '<i class="devicons devicons-apple"></i>',
  '.swift': '<i class="devicons devicons-swift"></i>',
  '.png': '<i class="devicons devicons-photoshop"></i>',
  '.jpg': '<i class="devicons devicons-photoshop"></i>',
  '.gif': '<i class="devicons devicons-photoshop"></i>',
  '.bpm': '<i class="devicons devicons-photoshop"></i>',

  '.svg': '<i class="devicons devicons-snap_svg"></i>',

  '.jshintrc': '<i class="devicons devicons-nodejs_small"></i>',
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
    return '<i class="devicons devicons-mitlicence"></i>';
  }
  if (fn === 'package.json') {
    return '<i class="devicons devicons-npm"></i>';
  }
  // 判断扩展名
  if (file_icon_dict[file_ext]) {
    return file_icon_dict[file_ext];
  }
}

var f = document.querySelectorAll('tr.js-navigation-item');

[].slice.call(f).forEach(function (tr) {
  var icon = tr.querySelector('.icon');
  var content = tr.querySelector('.content a');
  if (!content) {
    return;
  }
  var fn = content.innerText.trim().toLowerCase();;
  file_ext = getExt(fn).toLowerCase();

  var iconHtml = file2iconHtml(fn);
  if (iconHtml) {
    icon.innerHTML = iconHtml;
  }
});
