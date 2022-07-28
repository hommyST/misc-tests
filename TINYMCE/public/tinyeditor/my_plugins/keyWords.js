tinymce.PluginManager.add('key_words', (editor) => {
  editor.ui.registry.addMenuButton('key_words', {
    text: 'Кл. слова',
    fetch(callback) {
      const items = [
        {
          type: 'menuitem',
          text: 'Имя пользователя',
          onAction: () => editor.insertContent('[USER_NAME]')
        },
        {
          type: 'menuitem',
          text: 'Приветствие (зависит от тек. времени)',
          onAction: () => editor.insertContent('[GREETING]')
        },
        {
          type: 'menuitem',
          text: 'Телефон клиента',
          onAction: () => editor.insertContent('[CLIENT_PHONE]')
        },
        {
          type: 'menuitem',
          text: 'Очередь звонков',
          onAction: () => editor.insertContent('[QUEUE]')
        },
        {
          type: 'menuitem',
          text: 'Последние 5 новостей',
          onAction: () => editor.insertContent('[NEWS]')
        },
      ];

      callback(items);
    },
  })
});

