# Simple Editor
Yet another jQuery inline editor.

## Demo
```bash
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

<div id="my-editor"></div>

<script type="text/javascript">
  $('#my-editor').simpleEditor({
    saveURL: '/api'
  })
</script>
```

### 2. Make things `Editable`.
```html
<div id="my-editor">
  <h1 class="se-editable">Editable title</h1>
  <p class="se-editable">Editable paragraph</p>
</div>
```

### 3. Make things `Extendable`.
You can duplicate the first child element and append it to the end of the `se-extendable` by clicking the add button.
```html
<div id="my-editor">
  <ul class="se-extendable">
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>
```

### 4. Or just set the rules before you go
```js
$('#my-editor').simpleEditor({
  saveURL: '/api',
  editableSelectors: ['.these-will-be-editable', 'and-these-do-too'],
  extendableSelectors: ['.some-other-extendable-box']
})
```
