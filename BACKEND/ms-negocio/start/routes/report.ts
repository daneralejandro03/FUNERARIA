import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/reports', 'ReportsController.store');
    Route.get('/reports', 'ReportsController.find');
    Route.get('/reports/:id', 'ReportsController.find');
    Route.put('/reports/:id', 'ReportsController.update');
    Route.delete('/reports/:id', 'ReportsController.delete');
})