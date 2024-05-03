import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/comments', 'CommentsController.store')
  Route.get('/comments', 'CommentsController.find')
  Route.get('/comments/:id', 'CommentsController.find')
  Route.put('/comments/:id', 'CommentsController.update')
  Route.delete('/comments/:id', 'CommentsController.delete')
})
