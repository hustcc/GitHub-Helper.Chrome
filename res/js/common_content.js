function tag(type, className, innerHTML) {
  var el = document.createElement(type);
  el.className = className;
  el.innerHTML = innerHTML;
  return el;
}