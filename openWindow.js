function openWindow($) {
  return function(node, outsideOptions, insideOptions) {
    node.append($('<iframe>', {
      src: outsideOptions.file,
      width: outsideOptions.width,
      height: outsideOptions.height
    }))
  }
}

export default openWindow;
