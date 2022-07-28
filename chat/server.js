const { Server } = require("socket.io");

const io = new Server(3000)

console.log('server start on port 3000');

io.sockets.on('connection', socket => {
  console.log(`connected, ${socket.id}`);

  socket.on('greeting', data => {
    socket.broadcast.emit("enter", data);
    // console.log(data);
  })

  socket.on('message', data => {
    socket.broadcast.emit("message", data);
    // console.log(data);
  })
  
})
