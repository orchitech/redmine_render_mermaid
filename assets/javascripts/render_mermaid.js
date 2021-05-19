// Expected window variables: redmine_render_mermaid_lib

var renderMermaid = (function () {
  var mermaidLoaded = false;
  function loadMermaid() {
    if (mermaidLoaded) {
      return $.when();
    }
    return $.ajax({
      url: window.redmine_render_mermaid_lib,
      dataType: "script",
      cache: true,
      success: function(e) {
        mermaid.initialize({
          securityLevel: 'strict',
          startOnLoad: false,
          flowchart:{
            htmlLabels: false,
            useMaxWidth: true,
          }
        });
        mermaidLoaded = true;
      },
    });
  }

  function withoutTextChildren() {
    for (var i = 0; i < this.childNodes.length; i++) {
      if (this.childNodes[i].nodeType === 3) {
        // we can ignore whitespace text nodes if this turns out to be too strict
        return false;
      }
    }
    return true;
  }

  function findMermaidsToRender($wikis) {
    return $wikis
      .find('pre > code[data-language="mermaid"]:only-child')
      .parent()
      .filter(withoutTextChildren);
  }

  return function ($wikis) {
    var mermaids = findMermaidsToRender($wikis);
    if (mermaids.length == 0) {
      // avoid loading mermaid lib if there is nothing to render
      return;
    }

    loadMermaid().then(function () {
      mermaids.each(function(i, pre) {
        // plain source without eventual server-side code highlighting
        var source = pre.textContent;
        // diagram rendering container
        mermaidDiv = document.createElement('div');
        mermaidDiv.classList.add('render-mermaid');
        mermaidDiv.textContent = source;

        pre.replaceWith(mermaidDiv);
        mermaid.init(undefined, mermaidDiv);
      });
    });
  }
})();

$(document).ready(function () {
  renderMermaid($('div.wiki'));
});
$(document).ajaxSuccess(function(event, request, settings) {
  renderMermaid($('div.wiki-preview'));
});
