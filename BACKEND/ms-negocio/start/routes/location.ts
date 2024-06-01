import Route from '@ioc:Adonis/Core/Route'

Route.get('/departments', 'LocationsController.getDepartments')
Route.get('/departments/:id/cities', 'LocationsController.getCitiesByDepartment')
