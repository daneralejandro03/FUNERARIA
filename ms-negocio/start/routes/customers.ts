import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/customers', 'CustomersController.store');
    Route.get('/customers', 'CustomersController.find');
    Route.get('/customers/:id', 'CustomersController.find');
    Route.put('/customers/:id', 'CustomersController.update');
    Route.delete('/customers/:id', 'CustomersController.delete');
})