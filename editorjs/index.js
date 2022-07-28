import EditorJS from '@editorjs/editorjs';
import SimpleImage from "./my_tool/simple_image";

const editor = new EditorJS({
  autofocus: true,
  tools: {
    image: {
      class: SimpleImage,
      inlineToolbar: true
    },
  },
  //FIXME:
  data: {
    "time": 1654157109996,
    "blocks": [
        {
            "id": "3P4vBOKkOq",
            "type": "image",
            "data": {
                "url": "https://www.fillmurray.com/640/360",
                "caption": "ssss"
            }
        }
    ],
    "version": "2.24.3"
  }
});


// async function getData() {
//   let res = await fetch('http://localhost:3000/editorjs/smallApi.php').then(resp => resp.json());
//   editor.blocks = res.blocks;
//   console.log(res);
//   return res
// }
// getData()

const saveBtn = document.querySelector('[data-save-btn]');
const outputBlock = document.querySelector('[data-output]');

saveBtn.addEventListener('click', () => {
  editor.save().then((outputData) => {
    console.log(outputData);
    outputBlock.innerHTML = JSON.stringify(outputData, null, 4);
  }).catch((error) => {
    console.log('Saving failed: ', error)
  });
});