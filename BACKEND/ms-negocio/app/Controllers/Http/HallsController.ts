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
      return await Hall.findOrFail(params.id)
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

    return await theHall.save()
  }

  //Delete
  public async delete({ params, response }: HttpContextContract) {
    const theHall: Hall = await Hall.findOrFail(params.id)
    response.status(204)

    return await theHall.delete()
  }
}
