# Simple Editor
🚀An instant jQuery inline editor that works every where.

## Demo
```shell
$ npm run start
// Demo frontend site served at localhost:3000

```
## Instruction
### 1. Init simple-editor
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="/path/to/simple-editor.js"></script>

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

### 2. Add `.se-can-edit` to allow edit.
You can predefine what should be editable in the markups.
```html
<div id="my-editor">
  <h1 class="se-can-edit">Editable title</h1>
  <p class="se-can-edit">Editable paragraph</p>
</div>
```

### 3. Add `.se-can-copy` to allow copy.
```html
<div id="my-editor">
  <ul>
    <li class="se-can-copy">Item 1</li>
  </ul>
</div>
```

### 4. Add `.se-can-edit-with-style` to allow styled editing.
Current only provides `bold` and `italic`.
```html
<div id="my-editor">
  <p class="se-can-edit-with-style">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </p>
</div>
```

### 5. Or just set the rules before you go
Those elements selected by the selectors you provide would automatically become editable or extendable.
```js
$('#my-editor').simpleEditor({
  saveURL: '/api',
  editableSelectors: ['.these-will-become-editable', 'and-these-do-too'],
  extendableSelectors: ['.some-other-extendable-box']
})
```
