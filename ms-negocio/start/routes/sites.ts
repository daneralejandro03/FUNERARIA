import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/sites', 'SitesController.store');
    Route.get('/sites', 'SitesController.find');
    Route.get('/sites/:id', 'SitesController.find');
    Route.put('/sites/:id', 'SitesController.update');
    Route.delete('/sites/:id', 'SitesController.delete');
})