import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/administrators', 'AdministratorsController.store');
    Route.get('/administrators', 'AdministratorsController.find');
    Route.get('/administrators/:id', 'AdministratorsController.find');
    Route.put('/administrators/:id', 'AdministratorsController.update');
    Route.delete('/administrators/:id', 'AdministratorsController.delete');
})