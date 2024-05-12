import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NotificationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    message: schema.string([rules.minLength(12)]),
    date_shipped: schema.date(),
    service_id: schema.number([rules.minLength(2)]),
  })

  public messages: CustomMessages = {
    'message.required': 'El mensaje es requerido',
    'date_shipped.required': 'La fecha de envío es requerida',
    'service_id.required': 'El ID del servicio es requerido',
  }
}