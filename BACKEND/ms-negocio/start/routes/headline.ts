import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/headlines', 'HeadlinesController.store');
    Route.get('/headlines', 'HeadlinesController.find');
    Route.get('/headlines/:id', 'HeadlinesController.find');
    Route.put('/headlines/:id', 'HeadlinesController.update');
    Route.delete('/headlines/:id', 'HeadlinesController.delete');
})