import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cremation from 'App/Models/Cremation'
import CremationValidator from 'App/Validators/CremationValidator'

export default class CremationsController {
  //Create
  public async store({ request }: HttpContextContract) {
    const body = await request.validate(CremationValidator);
    const theCremation: Cremation = await Cremation.create(body);
    return theCremation;
  }

  //Read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Cremation.findOrFail(params.id)
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Cremation.query().paginate(page, perPage)
      } else {
        return await Cremation.query()
      }
    }
  }

  //Update
  public async update({ params, request }: HttpContextContract) {
    const theCremation: Cremation = await Cremation.findOrFail(params.id)
    const body = request.body()
    theCremation.urnType = body.urnType
    theCremation.destinyAshes = body.destinyAshes
    theCremation.wakeRoom_id = body.hall_id
    theCremation.service_id = body.service_id

    return await theCremation.save()
  }

  //Delete
  public async delete({ params, response }: HttpContextContract) {
    const theCremation: Cremation = await Cremation.findOrFail(params.id)
    response.status(204)

    return await theCremation.delete()
  }
}
