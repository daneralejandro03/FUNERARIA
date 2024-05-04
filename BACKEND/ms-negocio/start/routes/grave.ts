import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/graves', 'GravesController.store')
  Route.get('/graves', 'GravesController.find')
  Route.get('/graves/:id', 'GravesController.find')
  Route.put('/graves/:id', 'GravesController.update')
  Route.delete('/graves/:id', 'GravesController.delete')
})
