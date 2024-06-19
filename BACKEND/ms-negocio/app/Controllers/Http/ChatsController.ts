import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chat from 'App/Models/Chat'
import ChatValidator from 'App/Validators/ChatValidator'
import Ws from 'App/Services/Ws'

export default class ChatsController {
  // Create
  public async store({ request }: HttpContextContract) {
    const body = await request.validate(ChatValidator)
    const theChat = await Chat.create(body)

    // Emitir un evento de WebSocket para el nuevo chat
    Ws.io.emit('new_chat', theChat)

    return theChat
  }

  // Read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const theChat = await Chat.findOrFail(params.id)
      await theChat.load('messages')
      await theChat.load('incident')
      return theChat
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Chat.query().paginate(page, perPage)
      } else {
        return await Chat.all()
      }
    }
  }

  // Update
  public async update({ params, request }: HttpContextContract) {
    const theChat = await Chat.findOrFail(params.id)
    const body = request.only(['start_date', 'state', 'incident_id'])

    theChat.merge(body)
    await theChat.save()

    // Emitir un evento de WebSocket para el chat actualizado
    Ws.io.emit('update_chat', theChat)

    return theChat
  }

  // Delete
  public async delete({ params, response }: HttpContextContract) {
    const theChat = await Chat.findOrFail(params.id)
    await theChat.delete()

    response.status(204)

    // Emitir un evento de WebSocket para el chat eliminado
    Ws.io.emit('delete_chat', { id: params.id })

    return
  }
}
