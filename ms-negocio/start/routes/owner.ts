import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/owners', 'OwnersController.store');
    Route.get('/owners', 'OwnersController.find');
    Route.get('/owners/:id', 'OwnersController.find');
    Route.put('/owners/:id', 'OwnersController.update');
    Route.delete('/owners/:id', 'OwnersController.delete');
})