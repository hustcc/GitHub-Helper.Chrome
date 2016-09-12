function start_inject_diff() {
  var insertedNodes = [];
  var observer = new WebKitMutationObserver(function(mutations) {
    inject_diff_helpers();
    mutations.forEach(function(mutation) {
      for (var i = 0; i < mutation.addedNodes.length; i++)
        insertedNodes.push(mutation.addedNodes[i]);
    })
  });
  var nodes = document.querySelectorAll('#js-repo-pjax-container');
  if (nodes && nodes.length >= 1) {
    observer.observe(document.querySelectorAll('#js-repo-pjax-container')[0], { childList: true });
    inject_diff_helpers();
  }
}

inject_diff_helpers = function(){
  if ($('.toc-diff-stats').length || $('.toc-select').length) {
    window.extensions = ls_get(location.pathname) || {};
    $toc = ($('.toc-select').length) ? $('.toc-select') : $('#toc .content');

    $toc.find('a').each(function () {
      ext_str_full = $(this).text().trim().split('.');
      if (ext_str_full.length && ext_str_full != "") {
        ext_str = ext_str_full[ext_str_full.length - 1];
        if (typeof extensions[ext_str] == 'undefined') {
          extension = extensions[ext_str] = {};
        } else {
          extension = extensions[ext_str];
        }
        if (typeof extension["hidden"] == 'undefined') {
          extension["hidden"] = false;
        }
        //put the data-extension on the file link
        $(this).attr('data-extension', ext_str);
        //put the data-extension on the file diff itself
        //file diffs, don't have ID's, but they do have links with the same name before them
        $('[name=' + $(this).attr('href').substr(1) + ']').next().attr('data-extension', ext_str);
      }
      // console.log("exts",extensions);
    });


    $modal = $('<div id="filter-menu" class="select-menu js-menu-container js-select-menu is-showing-clear-item left" data-multiple style="position:relative;margin-right: 10px">\n\n      <span class="btn btn-sm btn-with-count select-menu-button js-menu-target">\n        <span class="octicon octicon-search"></span>\n        Visible file types: (<span class="filtered-string">0</span>)\n      </span>\n\n    <div class="select-menu-modal-holder js-menu-content js-navigation-container" style="top:25px">\n        <div class="select-menu-modal">\n            <div class="select-menu-header">\n                <span class="select-menu-title">Toggle appearance of file type</span>\n                <span class="octicon octicon-x js-menu-close"></span>\n            </div>\n            \n            <div class="select-menu-filters">\n                <div class="select-menu-text-filter">\n                    <input type="text" id="text-filter-field" class="js-filterable-field js-navigation-enable"\n                           placeholder="Filter file extensions">\n                </div>\n            </div>\n\n            <div class="select-menu-list">\n                <div class="extensions-to-remove" data-filterable-for="text-filter-field" data-filterable-type="substring">\n\n                    \n                </div>\n\n                <div class="select-menu-no-results">Nothing to show</div>\n            </div>\n\n            <div class="select-menu-footer js-menu-close">\n                <span class="octicon octicon-check">\n                    <svg aria-hidden="true" class="octicon octicon-check select-menu-item-icon" height="16" role="img" version="1.1" viewBox="0 0 12 16" width="12"><path d="M12 5L4 13 0 9l1.5-1.5 2.5 2.5 6.5-6.5 1.5 1.5z"></path></svg>\n                </span>\n                <a id="clear-all-filters" href="#">Show all file types</a>\n            </div>\n        </div>\n        <!-- /.select-menu-modal -->\n    </div>\n    <!-- /.select-menu-modal-holder -->\n</div>')

    $tmpl = $('<div class="select-menu-item js-navigation-item file-type">\n    <span class="select-menu-item-icon octicon octicon-eye-watch">\n        <svg aria-hidden="true" class="octicon octicon-eye" height="16" role="img" version="1.1" viewBox="0 0 16 16" width="16"><path d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6c4.94 0 7.94-6 7.94-6S13 2 8.06 2z m-0.06 10c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4z m2-4c0 1.11-0.89 2-2 2s-2-0.89-2-2 0.89-2 2-2 2 0.89 2 2z"></path></svg>\n    </span>\n    \n    \n    <span class="select-menu-item-icon octicon octicon-x"></span>\n\n    <div class="select-menu-item-text">\n        <h4 class="js-select-button-text select-menu-item-heading"></h4>\n        <span class="description">Hide show <b></b> files</span>\n    </div>\n</div>\n\n');

    $.each(Object.keys(extensions), function (k, v) {
      $new_tmpl = $tmpl.clone();
      $new_tmpl.find('.js-select-button-text, .description>b').text('.' + v);
      $modal.find('.extensions-to-remove').append($new_tmpl);
      if (!extensions[v]["hidden"]) {
        $new_tmpl.addClass('selected');
      }

    });
    if($('.toc-select').length){
      $('.toc-select').after($modal)
    }else{
      $('#toc .btn-group').prepend($modal)
    }


    $("#filter-menu").find(".select-menu-item").on('click', function () {
      setTimeout(function () {
        exts = $("#filter-menu").find(".select-menu-item");
        $.each(exts, function () {
          curr_ext_str = $(this).find('.js-select-button-text').text().trim();
          if ($(this).hasClass('selected')) {
            extensions[curr_ext_str.substr(1)]["hidden"] = false
          } else {
            extensions[curr_ext_str.substr(1)]["hidden"] = true
          }

        });

        hide_filtered_diffs();
      }, 200)
    });

    $('#clear-all-filters').on('click', function (e) {
      e.preventDefault();
      window.exts_arr = [];
      $("#filter-menu").find(".select-menu-item").addClass('selected');
      $.each(extensions, function (k) {
        extensions[k]["hidden"] = false;
      });
      hide_filtered_diffs();
    })

    $toggle_state_btn = '<a href="#" class="minibutton tooltipped tooltipped-n toggle-state-btn" rel="nofollow" aria-label="Toggle visibility of diff"><span class="octicon octicon-triangle-down"></span><span class="octicon octicon-triangle-up"></span> <span class="show_hide_btn_cont"></span></a>';
    $("#files").find('.file .file-actions').prepend($toggle_state_btn);

    $('.toggle-state-btn').on('click', function (e) {
      e.preventDefault();
      $(this).parents('.file').toggleClass('diff-helper-hidden')
    })
    var hide_filtered_diffs = function () {
      $('.filter-notice').remove();
      $files_arr = $("#files").find('.file');
      var files_length = $files_arr.length;
      var hidden_length = 0;
      var hidden_extension_length = 0;
      $.each(extensions, function (k, ext) {
        var $file = $files_arr.filter('.file[data-extension="' + k + '"]');
        var $link = $toc.find('a[data-extension="' + k + '"]');
        if (ext["hidden"]) {
          var $hidden_by_filter = '<i class="filter-notice">(hidden by filter)</i>';
          $file.addClass('diff-helper-hidden')

          $link.css('opacity', 0.4).append($hidden_by_filter);
          hidden_length += $file.length;
          hidden_extension_length += 1;
        } else {
          $file.removeClass('diff-helper-hidden');
          $link.css('opacity', 1);
        }
      });

      $('.filtered-string').text(Object.keys(extensions).length - hidden_extension_length);

      if (hidden_length > 0) {
        $add_info = $('<strong class="added_info">(' + hidden_length + ' hidden by filter)</strong>');
        $toc.find('.added_info').remove();
        $toc.find('.toc-diff-stats').append($add_info)
        ls_set(location.pathname, extensions);
      } else {
        $toc.find('.added_info').remove();
        ls_set(location.pathname, null);
      }

    };
    hide_filtered_diffs();
  }}

ls_set = function(key, data){
    window.localStorage.setItem(key, JSON.stringify(data));
};
ls_get = function(key){
    return JSON.parse(window.localStorage.getItem(key));
};

chrome.runtime.sendMessage({"get": "status", "from": "file_icon"}, function(response) {
  if ('off' !== response['status'] && 'off' !== response['github_filediff']) {
    start_inject_diff();
  }
});