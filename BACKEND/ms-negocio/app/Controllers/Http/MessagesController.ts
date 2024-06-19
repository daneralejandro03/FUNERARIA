// app/Controllers/Http/MessagesController.ts

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message'
import Ws from 'App/Services/Ws'

export default class MessagesController {
  // Create
  public async store({ request }: HttpContextContract) {
    console.log("LLEGOOOOOOO");
    
    try {
      const { information, user_id, chat_id } = request.only(['information', 'user_id', 'chat_id'])

      const theMessage: Message = await Message.create({
        information,
        user_id,
        chat_id,
      })

      // Emitir un evento de WebSocket para el nuevo mensaje al chat correspondiente
      Ws.io.to(`chat_${theMessage.chat_id}`).emit('new_message', theMessage)
      
      console.log('Mensaje creado:', theMessage)

      return theMessage
    } catch (error) {
      console.error('Error al crear el mensaje:', error)
      throw new Error('No se pudo crear el mensaje')
    }
  }

  // Read
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

  // Update
  public async update({ params, request }: HttpContextContract) {
    try {
      const theMessage: Message = await Message.findOrFail(params.id)
      const { information, user_id, chat_id } = request.only(['information', 'user_id', 'chat_id'])

      theMessage.information = information
      theMessage.chat_id = chat_id
      theMessage.user_id = user_id

      await theMessage.save()

      // Emitir un evento de WebSocket para el mensaje actualizado al chat correspondiente
      Ws.io.to(`chat_${theMessage.chat_id}`).emit('update_message', theMessage)

      return theMessage
    } catch (error) {
      console.error('Error al actualizar el mensaje:', error)
      throw new Error('No se pudo actualizar el mensaje')
    }
  }

  // Delete
  public async delete({ params, response }: HttpContextContract) {
    try {
      const theMessage: Message = await Message.findOrFail(params.id)
      await theMessage.delete()

      response.status(204)

      // Emitir un evento de WebSocket para el mensaje eliminado al chat correspondiente
      Ws.io.to(`chat_${theMessage.chat_id}`).emit('delete_message', { id: params.id })

      return response
    } catch (error) {
      console.error('Error al eliminar el mensaje:', error)
      throw new Error('No se pudo eliminar el mensaje')
    }
  }
}
