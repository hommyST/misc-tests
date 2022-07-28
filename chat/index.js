const USER = {};

const url = 'http://hommy.b96087jw.beget.tech:3000'; //beget
const urlL = 'http://localhost:3000'; //local

const socket = io(url, { transports: ["websocket"] });

socket.on('message', data => {
  // TODO: прислали сообщение
  drawMessage(data, 'other');
  // console.log(data);
})
socket.on('enter', data => {
  // TODO: новый пользак подключился
  // console.log(data);
})

document.querySelector('#send').addEventListener('click', (ev) => {
  ev.preventDefault();
  const messageInp = document.querySelector('#chatInput');
  // TODO: проверить сообщение
  // TODO: получить нормальную дату
  let date = new Date;
  let dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
  USER.message = messageInp.value;
  USER.sendDate = dateStr;
  messageInp.value = '';

  socket.emit('message', USER);

  drawMessage(USER);
});


document.querySelector('#enterBtn').addEventListener('click', () => {
  const modal = document.querySelector('div.modal')
  let name = document.querySelector('input.modal--name').value;
  //TODO: проверки имени в локал стораж
  USER.name = name;
  modal.classList.add('off');

  socket.emit('greeting', USER);
})


function drawMessage(data, from = 'me') {
  const out = document.querySelector('.chat_out');

  let name = null;

  if (from === 'other') {
    name = document.createElement('h4');
    name.classList.add('chat_out__message--name');
    name.textContent = data.name;
  }
  let wrap = document.createElement('div');
  let message = document.createElement('p');
  let time = document.createElement('div');

  from === 'me' ? wrap.classList.add('chat_out__message', 'my') 
                : wrap.classList.add('chat_out__message', 'other');
  message.classList.add('chat_out__message--paragraph');
  message.textContent = data.message;
  time.classList.add('chat_out__message--time');
  time.textContent = data.sendDate;

  if (name) wrap.append(name);
  wrap.append(message, time);

  out.append(wrap);
  out.scrollTop = out.scrollHeight;
}