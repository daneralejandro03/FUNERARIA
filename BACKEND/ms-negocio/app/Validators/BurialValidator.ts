import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BurialValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    location: schema.string([rules.minLength(2)]),
    burial_type: schema.string([rules.minLength(5)]),
    burial_date: schema.date(),
    wakeRoom_id: schema.number([rules.minLength(2)]),
    service_id: schema.number([rules.minLength(2)]),
  })

  public messages: CustomMessages = {
    'location.required': 'La ubicación es requerida',
    'burial_type.required': 'El tipo de sepelio es requerido',
    'burial_date.required': 'La fecha de sepelio es requerida',
    'wakeRoom_id.required': 'El ID de la sala de velatorio es requerido',
    'service_id.required': 'El ID del servicio es requerido',
  }
}
