<template>
  <div id="app">
      <!-- api-key="no-api-key" -->
    <editor
      :init="editorSetting"
      v-model="dataEditor"
    />
      <!-- initial-value="Hey" -->
  </div>
</template>


 <script>
import Editor from "@tinymce/tinymce-vue";

export default {
  name: "TinyEditor",

  components: {
    editor: Editor,
  },

  data() {
    return {
      editorSetting: {
        language: 'ru',
        height: 500,
        plugins: [
          'link',
          'lists',
          'table',
          'code',
          'wordcount',
          'quickbars',
          'visualblocks'
        ],

        external_plugins: {
          // empty_string: '/EDITOR/my_plugins/emptyString.js',
          helper_blocks: '/tinyeditor/my_plugins/helperBlocks.js',
          fieldset: '/tinyeditor/my_plugins/fieldset.js',
          // my_empty_string: '/tinyeditor/my_plugins/emptyString.js',
          // key_words: '/tinyeditor/my_plugins/keyWords.js',
        },

        toolbar: [
          'undo redo | styleselect bold italic link hr | forecolor | bullist numlist |',
          'fontfamily fontsize blocks | table | helper_blocks fieldset empty_string key_words | code'
        ],
        quickbars_insert_toolbar: false,
        elementpath: true,
        branding: false,
        init_instance_callback() {
          document.querySelector('.tox .tox-notification--in').style.display = 'none';
        },

        setup(editor) {

          editor.ui.registry.addIcon('empty_stringico', '<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><rect style="fill:#ffccaa;stroke:#000000;stroke-width:0.5" width="16.322035" height="3.8135593" x="0.83898306" y="11.669492" /><path style="color:#000000;fill:#000000" d="M 8.3054152,0.97491488 V 9.0003055 l -1.6347656,-2.5546874 -0.421875,0.2695312 1.7714843,2.7675781 0.00781,0.013672 0.085937,0.1328125 0.2734375,0.4218752 H 8.7116652 L 9.0729933,9.5081181 9.0886183,9.4866337 10.862056,6.7151493 10.440181,6.4456181 8.8054152,9.0003055 V 0.97491488 Z" /></svg>');

          editor.ui.registry.addButton('empty_string', {
            // text: 'BTN',
            icon: 'empty_stringico',
            tooltip: '???????????????? ???????????? ????????????',
            onAction() {
              let p = document.createElement('p');
              let br = document.createElement('br');
              p.append(br)
              
              console.log(editor.selection);
              let curr = editor.selection.getNode();

              while (curr.parentNode.tagName !== 'BODY') curr = curr.parentNode;
              curr.after(p);
            }
          });

        }

      },

      dataEditor: `<p>hi</p>`,

      foo: 'SOME',
    };
  },
};
</script>