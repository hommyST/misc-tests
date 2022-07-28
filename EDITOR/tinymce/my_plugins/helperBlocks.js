function randomize(count = 10) {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < count; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

tinymce.PluginManager.add('helper_blocks', function (editor) {
  const openDialog = () => editor.windowManager.open({
    title: 'Добавление блока информации',
    body: {
      type: 'panel',
      items: [
        { type: 'input', name: 'title', label: 'Заголовок' },

        { type: 'input', name: 'text', label: 'Текст' },

        {
          type: 'listbox',
          name: 'color',
          text: 'Жёлтый',
          label: 'Цвет',
          items: [
            { text: 'Жёлтый', value: 'yellow' },
            { text: 'Зелёный', value: 'green' },
            { text: 'Красный', value: 'red' },
          ]
        },

        {
          type: 'listbox',
          name: 'hideshow',
          text: 'Не скрывать',
          label: 'Показывать ли блок',
          items: [
            { text: 'Не скрывать', value: 'show' },
            { text: 'Скрыть', value: 'hide' },
          ]
        }
      ],
    },
    buttons: [
      {
        type: 'cancel',
        text: 'Close'
      },
      {
        type: 'submit',
        text: 'Save',
        buttonType: 'primary'
      }
    ],


    onSubmit(api) {
      const data = api.getData();

      if (data.title) {
        switch (data.hideshow) {
          case 'show':
            let textShow = `<div class="tiny-block-body clr-${data.color}"><h4>${data.title}</h4>`;
            textShow += `<p>${data.text}</p></div><br><br>`;

            editor.insertContent(textShow);
            api.close();
            break
          case 'hide':
            let divid = randomize(32);
            let textHide = `<div class="tiny-block-hide"><a class="tiny-block-hide--btn x clr-${data.color}" data-show="${divid}">`;
            textHide += `${data.title}</a><div id="${divid}" class="tiny-block-body tiny-block-body--hide clr-${data.color} HelperInfoHidden">`;
            textHide += `<h3>${data.title}</h3><p>${data.text}</p><br><br></div></div><br><br>`;
            

            editor.insertContent(textHide);
            api.close();
            break
          default:

            break
        }
      } else {
        alert('Название должно быть заполнено!');
      }
    }
  });

  editor.ui.registry.addIcon('block', '<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"> <rect style="fill:#ffccaa;stroke:#000000;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none" width="17" height="17" x="0.5" y="0.5" /> <path style="fill:none;stroke:#000000;stroke-width:1;stroke-linecap:butt;stroke-linejoin:bevel;stroke-dasharray:none" d="M 0.50299024,6.2890629 H 17" /> </svg>');
  editor.ui.registry.addButton('helper_blocks', {
    // text: 'Блок',
    icon: 'block',
    tooltip: 'Блок',
    onAction: () => {
      openDialog();
    }
  });
});