import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/notifications', 'NotificationsController.store');
    Route.get('/notifications', 'NotificationsController.find');
    Route.get('/notifications/:id', 'NotificationsController.find');
    Route.put('/notifications/:id', 'NotificationsController.update');
    Route.delete('/notifications/:id', 'NotificationsController.delete');
})