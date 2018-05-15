import './simple-editor.css';

($ => {
  const $addBtn = '<button class="se-add-btn">+</button>';

  $.fn.simpleEditor = function(params) {

    //Initialized a editor
    if (typeof params === 'object') {

      //The entry point of simple-editor
      const node = $(this);

      // Storing params
      node.simpleEditorParams = {}

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

            if (!editable.hasClass('se-editable')) {
              editable.addClass('se-auto-editable');
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
      node.find('.se-editable, .se-auto-editable').each(function() {
        const editable = $(this);
        // $(this).attr('contentEditable', 'true');


        $(this).wrapInner('<div class="se-auto-wrapper" contentEditable="true"></div>')
        // $(this).parent().append('<div class="se-editable-icon"></div>')
        $(this).find('.se-auto-wrapper').append('<i class="fas fa-pen-square se-auto-editable-icon"></i>');

        $(this).find('.se-auto-wrapper').blur(function() {
          save(node);
        });
        return this
      })

      // Make user defined tags extendable
      node.find('.se-extendable, .se-auto-extendable').each(function() {
        const $extendable = $(this);
        const $clone = $extendable.children(':first');
        const $plus = $('<button class="se-extend">+</button>');

        $plus.click(function() {
          $(this).before($clone.clone());
        })

        $extendable.append($plus);

        return this
      })

      node.find('.se-can-copy').each(function() {
        const canCopy = $(this);

        $(this).wrapInner('<div class="se-auto-wrapper"></div>')
        // $(this).parent().append('<div class="se-editable-icon"></div>')
        $(this)
          .find('.se-auto-wrapper')
          .append('<i class="fas fa-plus-square se-auto-can-copy-icon"></i>')
          .find('.se-auto-can-copy-icon')
          .first()
          .click(function() {
            console.log('new copy');
            const newCopy = $(this).parent().parent();
            newCopy.after(newCopy.clone(true, true));
          })
        return this
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

  saveNode.find('.se-auto-editable-icon, .se-auto-can-copy-icon').remove();

  saveNode.find('.se-auto-extendable').each(function() {
    $(this).removeClass('se-auto-extendable');
  });

  saveNode.find('.se-editable').each(function() {
    $(this).removeAttr('contentEditable');
  });

  saveNode.find('.se-extend').each(function() {
    $(this).remove();
  })

  return saveNode.html()
}
