import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/cities', 'CitiesController.store');
    Route.get('/cities', 'CitiesController.find');
    Route.get('/cities/:id', 'CitiesController.find');
    Route.put('/cities/:id', 'CitiesController.update');
    Route.delete('/cities/:id', 'CitiesController.delete');
})