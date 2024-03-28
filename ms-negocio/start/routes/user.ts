import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/users', 'UsersController.store');
    Route.get('/users', 'UsersController.find');
    Route.get('/users/:id', 'UsersController.find');
    Route.put('/users/:id', 'UsersController.update');
    Route.delete('/users/:id', 'UsersController.delete');
})