import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/cameras', 'CamerasController.store')
  Route.get('/cameras', 'CamerasController.find')
  Route.get('/cameras/:id', 'CamerasController.find')
  Route.put('/cameras/:id', 'CamerasController.update')
  Route.delete('/cameras/:id', 'CamerasController.delete')
})