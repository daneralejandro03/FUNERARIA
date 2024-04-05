import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/departaments', 'DepartamentsController.store');
    Route.get('/departaments', 'DepartamentsController.find');
    Route.get('/departaments/:id', 'DepartamentsController.find');
    Route.put('/departaments/:id', 'DepartamentsController.update');
    Route.delete('/departaments/:id', 'DepartamentsController.delete');
})