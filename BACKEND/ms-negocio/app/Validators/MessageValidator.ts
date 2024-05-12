import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MessageValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    information: schema.string([rules.minLength(12)]),
    user_id: schema.string([rules.minLength(5)]),
    chat_id: schema.number([rules.minLength(2)]),
  })

  public messages: CustomMessages = {
    'information.required': 'La información del mensaje es requerida',
    'user_id.required': 'El ID del usuario es requerido',
    'chat_id.required': 'El ID del chat es requerido',
  }
}