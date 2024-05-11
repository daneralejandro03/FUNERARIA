import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hall from 'App/Models/Hall'

export default class HallsController {
  //Create
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const theHall: Hall = await Hall.create(body)
    return theHall
  }

  //Read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theHall: Hall = await Hall.findOrFail(params.id)
      await theHall.load('grave')
      await theHall.load('cremation')
      return theHall
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Hall.query().paginate(page, perPage)
      } else {
        return await Hall.query()
      }
    }
  }

  //Update
  public async update({ params, request }: HttpContextContract) {
    const theHall: Hall = await Hall.findOrFail(params.id)
    const body = request.body()
    theHall.name = body.name
    theHall.capacity = body.capacity
    theHall.availability = body.availability
    theHall.site_id = body.site_id

    return await theHall.save()
  }

  //Delete
  public async delete({ params, response }: HttpContextContract) {
    const theHall: Hall = await Hall.findOrFail(params.id)

    if (theHall.grave || theHall.cremation) {
      response.status(400)
      return { error: 'No se puede eliminar ya que tiene una sepultura o cremación asociada' }
    } else {
      response.status(204)
    }

    response.status(204)
    return await theHall.delete()
  }
}
