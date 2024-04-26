import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/transfers', 'TransfersController.store');
    Route.get('/transfers', 'TransfersController.find');
    Route.get('/transfers/:id', 'TransfersController.find');
    Route.put('/transfers/:id', 'TransfersController.update');
    Route.delete('/transfers/:id', 'TransfersController.delete');
})