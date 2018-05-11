# Simple Editor
Yet another jQuery inline editor.

## Demo
```shell
$ npm run start
// Demo frontend site served at localhost:3000

$ npm run server
// A simple express server at localhost:3001

```
## Instruction
### 1. Init simple-editor
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="/simple-editor.js"></script>

<div id="my-editor">
...your html markup here...
</div>

<script type="text/javascript">
  $('#my-editor').simpleEditor({
    saveURL: ..., // somewhere to POST to when saved
    saveCallback: ..., // or something to do
  })
</script>
```

### 2. Make things `Editable`.
You can predefine what should be editable in the markups.
```html
<div id="my-editor">
  <h1 class="se-editable">Editable title</h1>
  <p class="se-editable">Editable paragraph</p>
</div>
```

### 3. Make things `Extendable`.
```html
<div id="my-editor">
  <ul class="se-extendable">
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>
```

### 4. Or just set the rules before you go
Those elements selected by the selectors you provide would automatically become editable or extendable.
```js
$('#my-editor').simpleEditor({
  saveURL: '/api',
  editableSelectors: ['.these-will-become-editable', 'and-these-do-too'],
  extendableSelectors: ['.some-other-extendable-box']
})
```

## Methods
### `save`
This method fires everytime you leave an editable (`onBlur`), but you can call it on your own:
```js
$('#my-editor').simpleEditor('save');
```

To disable auto-save, simply add an option before start:

```js
$('#my-editor').simpleEditor({
  saveURL: ..., // somewhere to POST to when saved
  saveCallback: ..., // or something to do,
  autoSave: false
})
```

## Todo
- [ ] File browser api.
- [ ] Styled `Editable`.
- [ ] Add `Duplicatable`, `Draggable`.
