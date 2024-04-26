import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/servicesplans', 'ServicesPlansController.store');
    Route.get('/servicesplans', 'ServicesPlansController.find');
    Route.get('/servicesplans/:id', 'ServicesPlansController.find');
    Route.put('/servicesplans/:id', 'ServicesPlansController.update');
    Route.delete('/servicesplans/:id', 'ServicesPlansController.delete');
})