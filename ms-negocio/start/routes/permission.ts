import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/permissions', '.store');
    Route.get('/permissions', 'PermissionsController.find');
    Route.get('/permissions/:id', 'PermissionsController.find');
    Route.put('/permissions/:id', 'PermissionsController.update');
    Route.delete('/permissions/:id', 'PermissionsController.delete');
})