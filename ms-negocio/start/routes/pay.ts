import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/pays', 'PaysController.store');
    Route.get('/pays', 'PaysController.find');
    Route.get('/pays/:id', 'PaysController.find');
    Route.put('/pays/:id', 'PaysController.update');
    Route.delete('/pays/:id', 'PaysController.delete');
})