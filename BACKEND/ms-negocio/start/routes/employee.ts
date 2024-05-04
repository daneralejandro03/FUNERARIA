import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/employees', 'EmployeesController.store');
    Route.get('/employees', 'EmployeesController.find');
    Route.get('/employees/:id', 'EmployeesController.find');
    Route.put('/employees/:id', 'EmployeesController.update');
    Route.delete('/employees/:id', 'EmployeesController.delete');
}).middleware(["security"])