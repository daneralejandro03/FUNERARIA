import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/rolepermissions', 'RolePermissionsController.store');
    Route.get('/rolepermissions', 'RolePermissionsController.find');
    Route.get('/rolepermissions/:id', 'RolePermissionsController.find');
    Route.put('/rolepermissions/:id', 'RolePermissionsController.update');
    Route.delete('/rolepermissions/:id', 'RolePermissionsController.delete');
})