import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Site from 'App/Models/Site'
import SiteValidator from 'App/Validators/SiteValidator';

export default class SitesController {
  // Create
  public async store({ request }: HttpContextContract) {
    const body = await request.validate(SiteValidator);
    const theSite: Site = await Site.create(body);
    return theSite;
  }

  //Read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theSite: Site = await Site.findOrFail(params.id)
      await theSite.load('wakeRoom')
      return theSite
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Site.query().paginate(page, perPage)
      } else {
        return await Site.query()
      }
    }
  }

  //Update
  public async update({ params, request }: HttpContextContract) {
    const theSite: Site = await Site.findOrFail(params.id)
    const body = request.body()
    theSite.name = body.name
    theSite.location = body.location
    theSite.email = body.email
    theSite.city_id = body.city_id
    return await theSite.save()
  }

  //Delete
  public async delete({ params, response }: HttpContextContract) {
    const theSite: Site = await Site.findOrFail(params.id)

    if (theSite.wakeRoom) {
      response.status(400)
      return { error: 'No se puede eliminar ya que tiene una sala asociada' }
    } else {
      response.status(204)
    }

    response.status(204)
    return await theSite.delete()
  }
}
