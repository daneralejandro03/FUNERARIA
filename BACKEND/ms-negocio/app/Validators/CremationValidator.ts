import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CremationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    urnType: schema.string([rules.minLength(5)]),
    destinyAshes: schema.string([rules.minLength(5)]),
    hall_id: schema.number([rules.minLength(2)]),
    service_id: schema.number([rules.minLength(2)]),
  })

  public messages: CustomMessages = {
    'urnType.required': 'El tipo de urna es requerido',
    'destinyAshes.required': 'El destino de las cenizas es requerido',
    'hall_id.required': 'El ID del salón es requerido',
    'service_id.required': 'El ID del servicio es requerido',
  }
}