import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chat from 'App/Models/Chat'
import ChatValidator from 'App/Validators/ChatValidator'

export default class ChatsController {
  //Create
  public async store({ request }: HttpContextContract) {
    const body = await request.validate(ChatValidator);
    const theChat: Chat = await Chat.create(body);
    return theChat;
  }

  //Read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const theChat = await Chat.findOrFail(params.id);
      await theChat.load('messages');
      await theChat.load('executionService');
      return theChat
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Chat.query().paginate(page, perPage)
      } else {
        return await Chat.query()
      }
    }
  }

  //Update
  public async update({ params, request }: HttpContextContract) {
    const theChat: Chat = await Chat.findOrFail(params.id)
    const body = request.body()
    theChat.start_date = body.start_date
    theChat.state = body.state
    theChat.executionService_id = body.executionService_id

    return await theChat.save()
  }

  //Delete
  public async delete({ params, response }: HttpContextContract) {
    const theChat: Chat = await Chat.findOrFail(params.id)
    response.status(204)

    return await theChat.delete()
  }
}
