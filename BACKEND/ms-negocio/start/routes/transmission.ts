import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/transmissions', 'TransmissionsController.store')
  Route.get('/transmissions', 'TransmissionsController.find')
  Route.get('/transmissions/:id', 'TransmissionsController.find')
  Route.put('/transmissions/:id', 'TransmissionsController.update')
  Route.delete('/transmissions/:id', 'TransmissionsController.delete')
})