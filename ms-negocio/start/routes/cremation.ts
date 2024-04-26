import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/cremations', 'CremationsController.store');
    Route.get('/cremations', 'CremationsController.find');
    Route.get('/cremations/:id', 'CremationsController.find');
    Route.put('/cremations/:id', 'CremationsController.update');
    Route.delete('/cremations/:id', 'CremationsController.delete');
})