import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Notification from 'App/Models/Notification'
import NotificationValidator from 'App/Validators/NotificationValidator'

export default class NotificationsController {
  //Create
  public async store({ request }: HttpContextContract) {
    const body = await request.validate(NotificationValidator)
    //const body = request.body()
    const theNotification: Notification = await Notification.create(body)
    return theNotification
  }

  //Read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Notification.findOrFail(params.id)
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Notification.query().paginate(page, perPage)
      } else {
        return await Notification.query()
      }
    }
  }

  //Update
  public async update({ params, request }: HttpContextContract) {
    const theNotification: Notification = await Notification.findOrFail(params.id)
    const body = request.body()
    theNotification.message = body.message
    theNotification.date_shipped = body.date_shipped
    theNotification.service_id = body.service_id

    return await theNotification.save()
  }

  //Delete
  public async delete({ params, response }: HttpContextContract) {
    const theNotification: Notification = await Notification.findOrFail(params.id)
    response.status(204)

    return await theNotification.delete()
  }
}
