import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/roles', 'RolesController.store');
    Route.get('/roles', 'RolesController.find');
    Route.put('/roles/:id', 'RolesController.update');
    Route.get('/roles/:id', 'RolesController.find');
    Route.delete('/roles/:id', 'RolesController.delete');
})