import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BurialValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    location: schema.string([rules.required()]),
    burial_type: schema.string([rules.required()]),
    cementery: schema.string([rules.required()]),
    wake_room_id: schema.number([rules.unsigned()]),
    service_id: schema.number([rules.unsigned()])
  })

  public messages: CustomMessages = {
    'location.required': 'La ubicación es requerida',
    'burial_type.required': 'El tipo de sepelio es requerido',
    'burial_date.required': 'La fecha de sepelio es requerida',
    'wakeRoom_id.required': 'El ID de la sala de velatorio es requerido',
    'service_id.required': 'El ID del servicio es requerido',
  }
}
