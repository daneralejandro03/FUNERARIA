import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class WakeRoomValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.minLength(1), rules.required()]),
    capacity: schema.number([rules.unsigned(), rules.required()]),
    availability: schema.boolean(),
    site_id: schema.number([rules.exists({ table: 'sites', column: 'id'})]),
  })

  public messages: CustomMessages = {
    'name.required': 'El nombre de la sala de velación es requerido',
    'capacity.required': 'La capacidad de la sala de velación es requerida',
    'availability.required': 'La disponibilidad de la sala de velación es requerida',
    'site_id.required': 'El ID del sitio es requerido',
  }
}