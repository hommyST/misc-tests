// import WebSocket, { WebSocketServer } from 'ws';
const {WebSocketServer} = require('ws')
const fs = require('fs')

const wss = new WebSocketServer({
  port:16969
})
const rooms = [];
let roomsId = 0;



wss.on('connection', (ws, req, client) => {
  const ip = req.socket.remoteAddress;
  // const ip2 = req.headers['x-forwarded-for']?.split(',')[0].trim();
  console.log('================================');
  console.log('Connected: ', ip);
  // writeLog({ip, roomsId})

  ws.on('message', data => {
    data = JSON.parse(data);

    switch (data.type) {
      //Пинг
      case 'greeting':
        // ws.send(JSON.stringify({type: 'greeting', data:'pong'}));
        if (wss.clients.size % 2 !== 0) {
          ws.clientId = randomString()
          ws.roomId = roomsId
          rooms.push({roomId: roomsId, clientId: ws.clientId, ws: ws})
          
          ws.send(JSON.stringify({type: 'message', data:'Ждём ещё одного игрока'}))
          console.log(`WS: ${ws.clientId} - ${ws.roomId}\n===========\nROOMS: ${rooms[rooms.length - 1].roomId} - ${rooms[rooms.length - 1].clientId}`);
        }
        
        if (wss.clients.size % 2 === 0) {
          ws.clientId = randomString()
          ws.roomId = roomsId
          rooms.push({roomId: roomsId, clientId: ws.clientId, ws: ws})
          ws.send(JSON.stringify({type: 'message', data:'Игра начата'}))
          let i = 0;

          rooms.forEach(el => {
            if (el.roomId !== roomsId) return
            i++
            el.ws.send(JSON.stringify({type: 'start', data: i}))
          })
          roomsId++;
        }
        fs.appendFileSync('./.log', `${formatDate()}\tclient: ${ws.clientId}\t / \troom: ${ws.roomId}\t / \tip: ${ip};\n`)

        break;
      
      //Игрок сходил
      case 'step':
        rooms.forEach(el => {
          if (el.roomId !== ws.roomId) return
          let message = JSON.stringify({type: 'step', data: data.data})
          el.ws.send(message)
        })
        break;

      case 'end':
        fs.appendFileSync('./.log', `${formatDate()}\tclient: ${ws.clientId}\t / \troom: ${ws.roomId}\t / \twin: ${data.data}\n`)
        break;
      default:
        break;
    }
  });

  ws.on('close', (e) => {
    rooms.forEach(el => {
      if (el.roomId === ws.roomId) el.ws.send(JSON.stringify({type: 'close', data: ''}))
    })
  })
});


function randomString(length = 10) {
  const simbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let out = ''
  for (let i = 0; i < length; i++) {
    out += simbols.split('')[Math.floor(Math.random() * simbols.length)]
  }
  return out
}

function formatDate(date = new Date) {
  let out = ''
  out += date.getFullYear() + '-'
  out += leadingZero(date.getMonth()) + '-'
  out += leadingZero(date.getDate()) + '-'
  out += `${leadingZero(date.getHours())}:${leadingZero(date.getMinutes())}:${leadingZero(date.getSeconds())}`

  return out

  function leadingZero(val) {
    if (val < 10) return `0${val}`
    return val
  }
}

// function writeLog(data) {
// }