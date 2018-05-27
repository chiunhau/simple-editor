import './simple-editor.scss';
import dia from './dialogue.js';

($ => {
  const $addBtn = '<button class="se-add-btn">+</button>';
  const dialogue = dia($);


  $.fn.simpleEditor = function(params) {

    //Initialized a editor
    if (typeof params === 'object') {

      //The entry point of simple-editor
      const node = $(this);

      // Storing params
      node.simpleEditorParams = params

      // If 'saveURL' is provided
      if (params.saveURL && typeof params.saveURL === 'string') {
        node.simpleEditorParams.saveURL = params.saveURL;
      }

      // If 'saveCallback' is provided
      if (params.saveCallback && typeof params.saveCallback === 'function') {
        node.simpleEditorParams.saveCallback = params.saveCallback;
      }

      // If 'editableSelectors' is provided
      if (params.editableSelectors && params.editableSelectors.length > 0) {
        node.simpleEditorParams.editableSelectors = params.editableSelectors;

        for (var i = 0; i < params.editableSelectors.length; i++) {
          node.find(params.editableSelectors[i]).each(function() {
            const editable = $(this);

            if (!editable.hasClass('se-can-edit')) {
              editable.addClass('se-auto-editable');
            }
          })
        }
      }

      if (params.styledEditableSelectors && params.styledEditableSelectors.length > 0) {
        node.simpleEditorParams.styledEditableSelectors = params.styledEditableSelectors;

        for (var i = 0; i < params.styledEditableSelectors.length; i++) {
          node.find(params.styledEditableSelectors[i]).each(function() {
            const styledEditable = $(this);

            if (!styledEditable.hasClass('se-can-edit-with-style')) {
              styledEditable.addClass('se-auto-can-edit-with-style');
            }
          })
        }
      }

      // If 'extendableSelectors' is provided
      if (params.extendableSelectors && params.extendableSelectors.length > 0) {
        node.simpleEditorParams.extendableSelectors = params.extendableSelectors;

        for (var i = 0; i < params.extendableSelectors.length; i++) {
          node.find(params.extendableSelectors[i]).each(function() {
            const extendable = $(this);

            if (!extendable.hasClass('se-extendable')) {
              extendable.addClass('se-auto-extendable');
            }
          })
        }
      }

      // Make user defined tags editable
      node.find('.se-can-edit, .se-auto-editable').each(function() {
        const editable = $(this);
        // $(this).attr('contentEditable', 'true');
        if (!editable.children().find('.se-auto-wrapper').length > 0) {
          $(this).wrapInner('<div class="se-auto-wrapper" contentEditable="true"></div>')
        }
        else {
          editable.children().find('.se-auto-wrapper').each(function() {
            $(this).attr('contentEditable', true);
          })
        }

        $(this).find('.se-auto-wrapper').append('<i class="fas fa-pen-square se-auto-icon se-auto-editable-icon"></i>');

        return this
      })

      node.find('.se-can-copy').each(function() {
        const canCopy = $(this);


        if (!canCopy.children('.se-auto-wrapper').length > 0) {
          $(this).wrapInner('<div class="se-auto-wrapper"></div>')
        }
        // $(this).parent().append('<div class="se-can-edit-icon"></div>')
        $(this)
          .find('.se-auto-wrapper')
          .first()
          .append('<i class="fas fa-clone se-auto-icon se-auto-can-copy-icon"></i>')
          .find('.se-auto-can-copy-icon')
          .first()
          .click(function() {
            const newCopy = $(this).parent().parent();
            newCopy.after(newCopy.clone(true, true));
          })
        return this
      })

      const mediaBoxSrc = $('<div class="se-auto-media-box" contenteditable="false">Replace</div>');

      node.find('.se-can-edit-with-style, .se-auto-can-edit-with-style').each(function() {
        console.log($(this));
        const $canEditWithStyle = $(this);
        // $(this).attr('contentEditable', 'true');

        const mediaBox = mediaBoxSrc.clone();
        $canEditWithStyle.append(mediaBox);

        if (!$canEditWithStyle.children().find('.se-auto-wrapper').length > 0) {
          $(this).wrapInner('<div class="se-auto-wrapper" contentEditable="true"></div>')
        }
        else {
          $canEditWithStyle.children().find('.se-auto-wrapper').each(function() {
            $(this).attr('contentEditable', true);
          })
        }

        var activeImg;


        mediaBox.click(function() {
          console.log(activeImg);
          node.simpleEditorParams.fileBrowserCallback(activeImg, window);
        })

        $canEditWithStyle.find('img').each(function(index, element) {
          console.log(index);
          $(this).attr('tabindex', -1);
          $(this).click(function() {
            activeImg = $(this);
            $(this).addClass('-focused');
            mediaBox.addClass('-active');
            mediaBox.css({
              left: $(this).position().left + ($(this).width() - mediaBox.width()) / 2 + 'px',
              top: $(this).position().top - 48 + 'px',
            });


            console.log(mediaBox);
          })
          var thisImg = $(this);
          // $(document).click(function(e) {
          //   if (!$(e.target).is(thisImg) && !$(e.target).is('.se-auto-media-box')) {
          //
          //   }
          // })

          $(this).focusout(function(e) {
            thisImg.removeClass('-focused');
            if (thisImg.hasClass('-focused')) {
              window.setTimeout(function() {
                mediaBox.removeClass('-active');
              }, 100);
            }


          })


          // $(this).focusout(function(e) {
          //
          // })

        })
        $canEditWithStyle.find('.se-auto-wrapper').first().append('<i class="fas fa-magic se-auto-icon se-auto-can-edit-with-style-icon"></i>');
        $canEditWithStyle.find('.se-auto-wrapper').first()
        .prepend('<ul class="se-style-toolbar" contentEditable="false"><li><i class="fas fa-bold"></i></li><li><i class="fas fa-italic"></i></li><li><i class="fas fa-image"></i></li></ul>');

        $canEditWithStyle.find('.se-style-toolbar .fa-bold').first()
        .mousedown(function(e) {
          e.preventDefault();
          console.log(getSelectedText());
          pasteHTMLAtCaret('<span style="font-weight:bold">' + getSelectedText() + '</span>');
        })

        $canEditWithStyle.find('.se-style-toolbar .fa-italic').first()
        .mousedown(function(e) {
          e.preventDefault();
          console.log(getSelectedText());
          pasteHTMLAtCaret('<span style="font-style:italic">' + getSelectedText() + '</span>');
        })

        $canEditWithStyle.find('.se-style-toolbar .fa-image').first()
        .mousedown(function(e) {
          e.preventDefault();
          dialogue(node, node.simpleEditorParams.fileBrowserCallback);
          ;
        })

        return this

      })

      var timer;
      node.on('click keypress',function() {
        console.log('change');
        clearTimeout(timer);
        timer = setTimeout(function() {
          console.log('auto save');
          save(node);
          clearTimeout(timer);
        }, 3000);
      })
      return this;
    }

    else if (typeof params === 'string') {
      switch (params) {
        case 'save':
          save($(this))
          break;
        default:

      }
    }


  }

  window.openWindow = {};

  $.fn.openWindow = function(outsideOptions, insideOptions) {
    $(this).append($('<iframe>', {
      src: outsideOptions.file,
      width: outsideOptions.width,
      height: outsideOptions.height,
      class: 'se-file-browser-iframe',
      id: 'se-file-browser-iframe'
    }))

    window.openWindow = {};
    window.openWindow.params = insideOptions;
    window.openWindow.close = function() {
      $('#se-file-browser-iframe').remove();
    }
  }
})(jQuery);

function save(node) {
  if (node.simpleEditorParams.saveURL) {
    $.post({
      url: node.simpleEditorParams.saveURL,
      data: {
        html: clean(node)
      },
      success: function() {
        console.log('saved');
      }
    })
  }

  if (node.simpleEditorParams.saveCallback) {
    node.simpleEditorParams.saveCallback(clean(node), node.html());
  }
}

// Clean all simpleEditor auto-generated classes and attrs before save
function clean(node) {
  var saveNode = node.clone();
  saveNode.find('.se-auto-editable').each(function() {
    $(this).removeClass('se-auto-editable');
    $(this).removeAttr('contentEditable');
  });

  saveNode.find('.se-auto-wrapper').contents()
    .unwrap();

  saveNode.find('.se-auto-icon').remove();

  saveNode.find('.se-auto-extendable').each(function() {
    $(this).removeClass('se-auto-extendable');
  });

  saveNode.find('.se-can-edit, .se-can-edit-with-style, .se-auto-can-edit, .se-auto-can-edit-with-style').each(function() {
    $(this).removeAttr('contentEditable');
    $(this).removeClass(['se-auto-can-edit', 'se-auto-can-edit-with-style']);
  });

  saveNode.find('.se-style-toolbar, .se-file-browser-dialogue, .se-file-browser-iframe, .se-auto-media-box').remove();

  return saveNode.html()
}

// Codes below come from https://github.com/webfashionist/RichText/blob/master/src/jquery.richtext.js

function getSelectedText() {
  var range;
  if (window.getSelection) {  // all browsers, except IE before version 9
      range = window.getSelection();
      return range.toString() ? range.toString() : range.focusNode.nodeValue;
  } else  if (document.selection.createRange) { // Internet Explorer
      range = document.selection.createRange();
      return range.text;
  }
  return false;
}

function pasteHTMLAtCaret(html) {
  // add HTML code for Internet Explorer
  var sel, range;
  if (window.getSelection) {
      // IE9 and non-IE
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();

          // Range.createContextualFragment() would be useful here but is
          // only relatively recently standardized and is not supported in
          // some browsers (IE9, for one)
          var el = document.createElement("div");
          el.innerHTML = html;
          var frag = document.createDocumentFragment(), node, lastNode;
          while ( (node = el.firstChild) ) {
              lastNode = frag.appendChild(node);
          }
          range.insertNode(frag);

          // Preserve the selection
          if (lastNode) {
              range = range.cloneRange();
              range.setStartAfter(lastNode);
              range.collapse(true);
              sel.removeAllRanges();
              sel.addRange(range);
          }
      }
  } else if (document.selection && document.selection.type !== "Control") {
      // IE < 9
      document.selection.createRange().pasteHTML(html);
  }
}
