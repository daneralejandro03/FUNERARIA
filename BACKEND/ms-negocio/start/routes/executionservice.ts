import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/executionservices', 'ExecutionServicesController.store')
  Route.get('/executionservices', 'ExecutionServicesController.find')
  Route.get('/executionservices/:id', 'ExecutionServicesController.find')
  Route.put('/executionservices/:id', 'ExecutionServicesController.update')
  Route.delete('/executionservices/:id', 'ExecutionServicesController.delete')
})
