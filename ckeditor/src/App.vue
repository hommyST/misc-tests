<template>
  <div id="app">
    <h1>CKeditor</h1>
    <div class="ckeditor">
      <ckeditor
        :editor="editor"
        v-model="editorData"
        :config="editorConfig"
        @ready="editorReady"
      ></ckeditor>
    </div>
    <button class="btn btn-success" @click="test">Test</button>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';
import "@ckeditor/ckeditor5-build-classic/build/translations/ru.js";


export default {
  name: "App",

  data() {
    return {
      editor: ClassicEditor,
      editorData: `<p>Тут контент.</p>   <figure class="image">
        <img src="https://via.placeholder.com/1000x300/02c7cd/fff?text=Placeholder%20image" alt="CKEditor 5 rocks!">
    </figure>`,
      editorConfig: {
        // The configuration of the editor.

        language: "ru",
        ckfinder: {
          // uploadUrl: 'server/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',
          uploadUrl: 'http://localhost:3000/server/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',
          options: {
            resourceType: "Images",
          },
        },
        plugins: [SourceEditing],
        // removePlugins: [ 'list' ],
        toolbar: [ 'bulletedList', 'numberedList', 'sourceEditing', ]
      },
    };
  },

  methods: {
    test() {
      let res = ClassicEditor.builtinPlugins.map((plugin) => {
        return {
          name: plugin.pluginName,
          dependancies: plugin?.requires?.map(el => el.pluginName)
        }
      });
      // let res2 =  ClassicEditor.builtinPlugins.map((plugin) =>  plugin.pluginName)
      // let res3 = []
      // ClassicEditor.builtinPlugins.forEach(el => {
      //   el?.requires?.forEach(el => {
      //     res3.push(el.pluginName);
      //   })
      // });
      console.log( this.editor );
      console.log( res );
    },

    editorReady(e) {
      // console.log(e);
      // CKEditorInspector.attach( ClassicEditor );
    }
  },
};



        // plugins: [
        //   "Essentials",
        //   "CKFinderUploadAdapter",
        //   "Autoformat",
        //   "Bold",
        //   "Italic",
        //   "BlockQuote",
        //   "CKFinder",
        //   "CloudServices",
        //   "EasyImage",
        //   "Heading",
        //   "Image",
        //   "ImageCaption",
        //   "ImageStyle",
        //   "ImageToolbar",
        //   "ImageUpload",
        //   "Indent",
        //   "Link",
        //   "List",
        //   "MediaEmbed",
        //   "Paragraph",
        //   "PasteFromOffice",
        //   "Table",
        //   "TableToolbar",
        //   "TextTransformation",
        //   "Clipboard",
        //   "Enter",
        //   "SelectAll",
        //   "ShiftEnter",
        //   "Typing",
        //   "Undo",
        //   "FileRepository",
        //   "Delete",
        //   "BoldEditing",
        //   "BoldUI",
        //   "ItalicEditing",
        //   "ItalicUI",
        //   "BlockQuoteEditing",
        //   "BlockQuoteUI",
        //   "CKFinderEditing",
        //   "CKFinderUI",
        //   "CloudServicesCore",
        //   "CloudServicesUploadAdapter",
        //   "HeadingEditing",
        //   "HeadingUI",
        //   "ImageBlock",
        //   "ImageInline",
        //   "ImageCaptionEditing",
        //   "ImageCaptionUI",
        //   "ImageStyleEditing",
        //   "ImageStyleUI",
        //   "WidgetToolbarRepository",
        //   "ImageUtils",
        //   "ImageUploadEditing",
        //   "ImageUploadUI",
        //   "ImageUploadProgress",
        //   "IndentEditing",
        //   "IndentUI",
        //   "LinkEditing",
        //   "LinkUI",
        //   "AutoLink",
        //   "ListEditing",
        //   "ListUI",
        //   "MediaEmbedEditing",
        //   "MediaEmbedUI",
        //   "AutoMediaEmbed",
        //   "Widget",
        //   "ClipboardPipeline",
        //   "TableEditing",
        //   "TableUI",
        //   "TableSelection",
        //   "TableMouse",
        //   "TableKeyboard",
        //   "TableClipboard",
        //   "Widget",
        //   "WidgetToolbarRepository",
        // ],


</script>



<style lang="scss" scoped>
$red: red;

h1 {
  color: $red;
}
.ckeditor {
  margin-bottom: 5rem;
}

.btn {
  padding: 1em 2em;
  outline: none;
  border: none;
  text-transform: uppercase;
  border-radius: 5px;
  font-weight: 900;
  cursor: pointer;
}

.btn-success {
  background-color: #7fba00;
  color: #200855;
}
</style>
