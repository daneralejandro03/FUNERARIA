import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/plans', 'PlansController.store');
    Route.get('/plans', 'PlansController.find');
    Route.get('/plans/:id', 'PlansController.find');
    Route.put('/plans/:id', 'PlansController.update');
    Route.delete('/plans/:id', 'PlansController.delete');
})