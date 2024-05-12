import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    type: schema.string([rules.minLength(10)]),
    start_date: schema.date(),
    end_date: schema.date(),
  })

  public messages: CustomMessages = {
    'type.required': 'El tipo de servicio es requerido',
    'start_date.required': 'La fecha de inicio es requerida',
    'end_date.required': 'La fecha de fin es requerida',
  }
}