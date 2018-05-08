($ => {
  $.fn.simpleEditor = function(params) {
    if (typeof params === 'object') {
      const node = $(this);

      if (params.saveURL) {
        node.attr('data-se-saveURL', params.saveURL);
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
