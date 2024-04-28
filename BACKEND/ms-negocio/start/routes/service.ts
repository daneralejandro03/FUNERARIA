import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/services', 'ServicesController.store');
    Route.get('/services', 'ServicesController.find');
    Route.get('/services/:id', 'ServicesController.find');
    Route.put('/services/:id', 'ServicesController.update');
    Route.delete('/services/:id', 'ServicesController.delete');
})