const saveBtn = document.querySelector('#save');
// console.log(tinymce);
// console.log(tinymce.init);
tinymce.init({
  selector: '#tinymce',
  language: 'ru',
  // plugins:'link lists table code wordcount preview quickbars visualblocks',
  plugins: [
    'link',
    'lists',
    'table',
    'code',
    'wordcount',
    'quickbars',
    'visualblocks'
  ],
  // Оба пути работают, относительный путь идёт от EDITOR/tinymce/js/tinymce/tinymce.js
  external_plugins: {
    // empty_string: '/EDITOR/my_plugins/emptyString.js',
    empty_string: 'my_plugins/emptyString.js',
    helper_blocks: 'my_plugins/helperBlocks.js',
    key_words: 'my_plugins/keyWords.js',
    fieldset: 'my_plugins/fieldset.js',
  },
  toolbar: [
    'undo redo | styleselect bold italic link hr | forecolor | bullist numlist |',
    'fontfamily fontsize blocks | table | helper_blocks fieldset key_words empty_string | code'
  ],
  quickbars_insert_toolbar: false,
  elementpath: true,
  branding: false,

  table_default_styles: {
    width: '50%',
  },

});
tinymce.get('tinymce').contentStyles = [
  '.tiny-block-body {padding: 1rem; border: 2px solid #000;border-radius: 5px;margin-block: 1rem;}',
  '.tiny-block-body.clr-green, .tiny-block-hide--btn.clr-green {border-color: hsl(133, 61%, 55%); background-color: hsl(133, 97%, 80%);}',
  '.tiny-block-body.clr-yellow, .tiny-block-hide--btn.clr-yellow {border-color: hsl(45, 100%, 55%); background-color: hsl(45, 100%, 80%);}',
  '.tiny-block-body.clr-red, .tiny-block-hide--btn.clr-red {border-color: hsl(354, 70%, 55%); background-color: hsl(354, 70%, 80%);}',
  '.tiny-block-hide--btn {display: block;padding: 0.5rem;margin: 0;border-radius: 5px 5px 0 0;cursor: pointer;text-align: center;border: 2px solid hsl(60, 100%, 20%);}',
  '.tiny-block-body--hide {margin-top: 0;border-radius: 0 0 5px 5px;}',
  '.tiny-fieldset {border: 1px solid #dfdfdf; border-radius: 5px;}',
];

tinymce.get('tinymce').on('change', (e) => {
  console.log(e.target.iframeElement);
  toggleShowHideBlock()
});

saveBtn.addEventListener('click', () => {
  let cont = tinymce.get('tinymce').getContent()
})


function toggleShowHideBlock() {
  console.group('IN FUNC');
  const btns = [...document.querySelectorAll('.tiny-block-hide--btn')];
  const blocks = [...document.querySelectorAll('.tiny-block-body--hide')];
  console.log(btns);
  btns.forEach(el => {
    let id = el.dataset.show;
    el.addEventListener('click', () => {toggleBlock(id)});
  })
  
  function toggleBlock(id) {
    console.log(id);
  }
  console.groupEnd('IN FUNC');
};

// toggleShowHideBlock();