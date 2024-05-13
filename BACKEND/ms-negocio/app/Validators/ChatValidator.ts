import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChatValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    start_date: schema.date(),
    state: schema.boolean(),
    executionService_id: schema.number([rules.minLength(2)]),
  })

  public messages: CustomMessages = {
    'start_date.required': 'La fecha de inicio es requerida',
    'state.required': 'El estado del chat es requerido',
  }
}