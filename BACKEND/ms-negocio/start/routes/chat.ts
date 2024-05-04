import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/chats', 'ChatsController.store')
  Route.get('/chats', 'ChatsController.find')
  Route.get('/chats/:id', 'ChatsController.find')
  Route.put('/chats/:id', 'ChatsController.update')
  Route.delete('/chats/:id', 'ChatsController.delete')
})
