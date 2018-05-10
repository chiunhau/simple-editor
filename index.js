($ => {
  $.fn.simpleEditor = function(params) {
    if (typeof params === 'object') {
      // if initialize
      const node = $(this);

      if (params.saveURL && typeof params.saveURL === 'string') {
        node.attr('data-se-saveURL', params.saveURL);
      }

      if (params.editableSelectors && params.editableSelectors.length > 0) {
        node.attr('data-se-editableSelectors', params.editableSelectors.join());

        for (var i = 0; i < params.editableSelectors.length; i++) {
          $(this).find(params.editableSelectors[i]).each(function() {
            const editable = $(this);

            if (!editable.hasClass()) {
              editable.addClass('se-editable');
            }
          })

        }
      }

      if (params.extendableSelectors && params.extendableSelectors.length > 0) {
        node.attr('data-se-extendableSelectors', params.extendableSelectors.join());

        for (var i = 0; i < params.extendableSelectors.length; i++) {
          $(this).find(params.extendableSelectors[i]).each(function() {
            const extendable = $(this);

            if (!extendable.hasClass()) {
              extendable.addClass('se-extendable');
            }
          })

        }
      }

      $(this).find('.se-editable').each(function() {
        const editable = $(this);
        $(this).attr('contentEditable', 'true');
        $(this).blur(function() {
          save(node);
        })
        return this
      })

      $(this).find('.se-extendable').each(function() {
        const $extendable = $(this);
        const $clone = $extendable.children(':first');
        const $plus = $('<button class="se-extend">+</button>');

        $plus.click(function() {
          $(this).before($clone.clone());
        })

        $extendable.append($plus);

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
  $.post({
    url: node.attr('data-se-saveURL'),
    data: {
      html: node.html()
    },
    success: function() {
      console.log('saved');
    }
  })
}
