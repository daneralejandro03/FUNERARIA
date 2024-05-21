import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CremationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    urn_type: schema.string([rules.required()]),
    destiny_ashes: schema.string([rules.required()]),
    wake_room_id: schema.number([rules.exists({ table: 'wakeRooms', column: 'id'})]),
    service_id: schema.number([rules.exists({ table: 'services', column: 'id'})]),
  })

  public messages: CustomMessages = {
    'urn_type.required': 'El tipo de urna es requerido',
    'destiny_ashes.required': 'El destino de las cenizas es requerido',
    'wake_room_id.required': 'El ID del salón es requerido',
    'service_id.required': 'El ID del servicio es requerido',
  }
}