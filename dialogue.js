function dialogue($) {
  return function(node, cb) {
    var field_name, url, type, win;
    var box = $('<div class="se-file-browser-dialogue"><input id="se-file-browser-input" type="text"/><button id="se-file-browser-btn">Browse</button></div>');
    node.append(box);

    $('#se-file-browser-btn').click(function(e) {
      e.preventDefault();
      cb('se-file-browser-input', window)
    });

  }
}

export default dialogue;
