import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/wakerooms', 'WakeroomsController.store');
    Route.get('/wakerooms', 'WakeroomsController.find');
    Route.get('/wakerooms/:id', 'WakeroomsController.find');
    Route.put('/wakerooms/:id', 'WakeroomsController.update');
    Route.delete('/wakerooms/:id', 'WakeroomsController.delete');
})