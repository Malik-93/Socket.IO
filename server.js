const http = require('http');
const socketIO = require( 'socket.io');
const app = require ('./app')
const PORT = process.env.PORT || 8000;
const server = http.createServer( app )
const cors = require('cors')

app.use( cors () )

const io = socketIO( server );

io.on('connection', ( socket ) => {
  console.log( 'Successfully Connected with Socket', socket.id )

  socket.on('chat', (data) => {
      io.sockets.emit( 'chat', data )
  })

  socket.on('typing', (data) => {
      socket.broadcast.emit('typing', data )
  })

  socket.on('stream', ( image ) => {
  socket.broadcast.emit('stream', image )
  })

  socket.on('signal', (signal) => {
    io.sockets.emit( 'signal', signal )
  })

  socket.on('check', (video) => {
    socket.broadcast.emit ( 'check', video )
  })
})

// setInterval(() => {
    
//     io.on('camera', (data) => {
//         io.sockets.emit( 'camera', data )
//     })
//  }, 1000); 



server.listen(PORT, () => console.log(`Server is running on PORT ${ PORT }`))