import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/burials', 'BurialsController.store');
    Route.get('/burials', 'BurialsController.find');
    Route.get('/burials/:id', 'BurialsController.find');
    Route.put('/burials/:id', 'BurialsController.update');
    Route.delete('/burials/:id', 'BurialsController.delete');
})