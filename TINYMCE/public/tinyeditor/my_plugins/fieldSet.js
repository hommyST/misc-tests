tinymce.PluginManager.add('fieldset', function (editor) {
  const openDialog = () => editor.windowManager.open({
    title: 'Добавление блока информации (филдсет)',
    body: {
      type: 'panel',
      items: [
        { type: 'input', name: 'title', label: 'Заголовок' },
        { type: 'input', name: 'text', label: 'Текст' },
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
        let field = `<fieldset><legend>${data.title}</legend>`;
        field += `<p>${data.text}</p></fieldset><br><br>`;
        
        editor.insertContent(field);
        api.close();
      } else {
        alert('Название должно быть заполнено!');
      }
    }
  });

  editor.ui.registry.addIcon('my_fieldset', '<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"> <rect style="fill:#ffccaa;stroke:#000000;stroke-width:0.999978;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none" width="17" height="16" x="0.5" y="2" /> <rect style="fill:#ffccaa;stroke:#000000;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none" width="11.111794" height="3.482801" x="2.2" y="0.5" /> <path style="fill:#ffccaa;stroke:#000000;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none" d="M 2.7976078,13.265233 4.3731606,9.823894 8.1876569,14.592015 11.048529,8.5385751 13.826477,14.384705" /> <path style="fill:#ffccaa;stroke:#000000;stroke-width:0.499999;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none" d="M 4.3416068,2.7045417 4.8806077,1.5957101 5.8342246,2.5365373 7.2024574,1.7973158 7.8243815,2.8725466 8.4877671,1.662912 10.602309,2.63734" /> </svg> ');
  editor.ui.registry.addButton('fieldset', {
    // text: 'Филд',
    icon: 'my_fieldset',
    tooltip: 'Филдсет',
    onAction: () => {
      openDialog();
    }
  });
});