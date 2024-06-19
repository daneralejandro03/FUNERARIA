import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Incident from 'App/Models/Incident'
import Message from 'App/Models/Message'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import MessageValidator from 'App/Validators/MessageValidator'

export default class MessagesController {
  //Create
  public async store({ request }: HttpContextContract) {
    //const body = await request.body()
    const body = await request.validate(MessageValidator)
    const theMessage: Message = await Message.create(body)
    return theMessage
  }

  //Read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theMessage: Message = await Message.findOrFail(params.id);
      await theMessage.load('chat');
      return theMessage;
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
    theMessage.chat = body.chat_id
    theMessage.user_id = body.user_id

    return await theMessage.save()
  }

  //Delete
  public async delete({ params, response }: HttpContextContract) {
    const theMessage: Message = await Message.findOrFail(params.id)
    response.status(204)

    return await theMessage.delete()
  }
}
