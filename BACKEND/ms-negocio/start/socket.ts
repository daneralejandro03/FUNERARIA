import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  console.log('User connected: ', socket.id)

  socket.on('join_chat', (chatId) => {
    socket.join(`chat_${chatId}`)
    console.log(`User ${socket.id} joined chat ${chatId}`)
  })

  socket.on('leave_chat', (chatId) => {
    socket.leave(`chat_${chatId}`)
    console.log(`User ${socket.id} left chat ${chatId}`)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id)
  })
})
