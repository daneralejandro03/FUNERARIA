import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExecutionServiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cost: schema.number([rules.minLength(6)]),
    duration: schema.date(),
    state: schema.boolean(),
    user_id: schema.number([rules.minLength(2)]),
    service_id: schema.number([rules.minLength(2)]),
  })

  public messages: CustomMessages = {
    'cost.required': 'El costo es requerido',
    'duration.required': 'La duración es requerida',
    'state.required': 'El estado es requerido',
    'user_id.required': 'El ID del user es requerido',
    'service_id.required': 'El ID del servicio es requerido',
  }
}