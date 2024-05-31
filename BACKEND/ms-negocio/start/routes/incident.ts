import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/incidents', 'IncidentsController.store');
    Route.get('/incidents', 'IncidentsController.find');
    Route.get('/incidents/:id', 'IncidentsController.find');
    Route.put('/incidents/:id', 'IncidentsController.update');
    Route.delete('/incidents/:id', 'IncidentsController.delete');
})