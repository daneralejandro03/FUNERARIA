import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from 'App/Models/Service'
import ServiceValidator from 'App/Validators/ServiceValidator'

export default class ServicesController {
  //Create
  public async store({ request }: HttpContextContract) {
    const body = await request.validate(ServiceValidator)
    //const body = request.body();
    const theService: Service = await Service.create(body);
    return theService;
  }

  //Read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theService: Service = await Service.findOrFail(params.id)
      await theService.load('burial');
      await theService.load('cremation');
      await theService.load('notifications');
      await theService.load('transfer');
      await theService.load('servicesplan');
      await theService.load('execution_services');
      return theService
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Service.query().paginate(page, perPage)
      } else {
        return await Service.query()
      }
    }
  }

  //Update
  public async update({ params, request }: HttpContextContract) {
    const theService: Service = await Service.findOrFail(params.id)
    const body = request.body()
    theService.type = body.type
    theService.start_date = body.start_date
    theService.end_date = body.end_date

    return await theService.save()
  }

  //Delete
  public async delete({ params, response }: HttpContextContract) {
    const theService: Service = await Service.findOrFail(params.id)

    if (
      theService.burial ||
      theService.cremation ||
      theService.notifications ||
      theService.transfer ||
      theService.servicesplan
    ) {
      response.status(400)
      return {
        error:
          'No se puede eliminar ya que tiene una sepultura asociada, cremación, notificación, traslado o plan de servicio asociado',
      }
    } else {
      response.status(204)
    }

    response.status(204)
    return await theService.delete()
  }
}
