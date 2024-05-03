import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/beneficiaries', 'BeneficiariesController.store');
    Route.get('/beneficiaries', 'BeneficiariesController.find');
    Route.get('/beneficiaries/:id', 'BeneficiariesController.find');
    Route.put('/beneficiaries/:id', 'BeneficiariesController.update');
    Route.delete('/beneficiaries/:id', 'BeneficiariesController.delete');
})