import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CommentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    message: schema.string([rules.minLength(15)]),
    send_date: schema.date(),
    executionService_id: schema.number([rules.minLength(2)]),
  })

  public messages: CustomMessages = {
    'message.required': 'El mensaje es requerido',
    'send_date.required': 'La fecha de envío es requerida',
    'executionService_id.required': 'El ID del servicio de ejecución es requerido',
  }
}