tinymce.PluginManager.add('empty_string', (editor) => {

  editor.ui.registry.addIcon('empty_string', '<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><rect style="fill:#ffccaa;stroke:#000000;stroke-width:0.5" width="16.322035" height="3.8135593" x="0.83898306" y="11.669492" /><path style="color:#000000;fill:#000000" d="M 8.3054152,0.97491488 V 9.0003055 l -1.6347656,-2.5546874 -0.421875,0.2695312 1.7714843,2.7675781 0.00781,0.013672 0.085937,0.1328125 0.2734375,0.4218752 H 8.7116652 L 9.0729933,9.5081181 9.0886183,9.4866337 10.862056,6.7151493 10.440181,6.4456181 8.8054152,9.0003055 V 0.97491488 Z" /></svg>');

  editor.ui.registry.addButton('empty_string', {
    // text: 'BTN',
    icon: 'empty_string',
    tooltip: 'Вставить пустую строку',
    onAction: () => {
      let p = document.createElement('p');
      let br = document.createElement('br');
      p.append(br)
      
      let foo = editor.selection;
      let curr = editor.selection.getNode();

      while (curr.parentNode.tagName !== 'BODY') curr = curr.parentNode;
      curr.after(p);
    }
  });
});