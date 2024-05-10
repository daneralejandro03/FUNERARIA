import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Grave from 'App/Models/Grave'

export default class GravesController {
  //Create
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const theGrave: Grave = await Grave.create(body)
    return theGrave
  }

  //Read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Grave.findOrFail(params.id)
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Grave.query().paginate(page, perPage)
      } else {
        return await Grave.query()
      }
    }
  }

  //Update
  public async update({ params, request }: HttpContextContract) {
    const theGrave: Grave = await Grave.findOrFail(params.id)
    const body = request.body()
    theGrave.typeGrave = body.typeGrave
    theGrave.cementery = body.cementery

    return await theGrave.save()
  }

  //Delete
  public async delete({ params, response }: HttpContextContract) {
    const theGrave: Grave = await Grave.findOrFail(params.id)
    response.status(204)

    return await theGrave.delete()
  }
}
