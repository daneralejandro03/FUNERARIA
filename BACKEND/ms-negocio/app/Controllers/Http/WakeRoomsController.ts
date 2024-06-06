import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import WakeRoom from 'App/Models/WakeRoom'
import WakeRoomValidator from 'App/Validators/WakeRoomValidator'

export default class WakeRoomsController {
  public async store({ request }: HttpContextContract) {
    const body = await request.validate(WakeRoomValidator)
    const theWakeRoom: WakeRoom = await WakeRoom.create(body)
    return theWakeRoom
  }

  //Read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theWakeRoom: WakeRoom = await WakeRoom.findOrFail(params.id)
      await theWakeRoom.load('cremations')
      await theWakeRoom.load('burials')
      return theWakeRoom
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await WakeRoom.query().paginate(page, perPage)
      } else {
        return await WakeRoom.query()
      }
    }
  }

  //Update
  public async update({ params, request }: HttpContextContract) {
    const theWakeRoom: WakeRoom = await WakeRoom.findOrFail(params.id)
    const body = request.body()
    theWakeRoom.name = body.name
    theWakeRoom.capacity = body.capacity
    theWakeRoom.availability = body.availability
    theWakeRoom.site_id = body.site_id

    return await theWakeRoom.save()
  }

  //Delete
  public async delete({ params, response }: HttpContextContract) {
    const theWakeRoom: WakeRoom = await WakeRoom.findOrFail(params.id)
    response.status(204)

    return await theWakeRoom.delete()
  }
}
