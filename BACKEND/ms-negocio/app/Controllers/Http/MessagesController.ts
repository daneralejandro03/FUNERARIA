import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message'

export default class MessagesController {
  //Create
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const theMessage: Message = await Message.create(body)
    return theMessage
  }

  //Read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Message.findOrFail(params.id)
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Message.query().paginate(page, perPage)
      } else {
        return await Message.query()
      }
    }
  }

  //Update
  public async update({ params, request }: HttpContextContract) {
    const theMessage: Message = await Message.findOrFail(params.id)
    const body = request.body()

    theMessage.information = body.information

    return await theMessage.save()
  }

  //Delete
  public async delete({ params, response }: HttpContextContract) {
    const theMessage: Message = await Message.findOrFail(params.id)
    response.status(204)

    return await theMessage.delete()
  }
}
