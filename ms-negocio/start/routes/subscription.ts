import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/subscriptions', 'SubscriptionsController.store');
    Route.get('/subscriptions', 'SubscriptionsController.find');
    Route.get('/subscriptions/:id', 'SubscriptionsController.find');
    Route.put('/subscriptions/:id', 'SubscriptionsController.update');
    Route.delete('/subscriptions/:id', 'SubscriptionsController.delete');
})