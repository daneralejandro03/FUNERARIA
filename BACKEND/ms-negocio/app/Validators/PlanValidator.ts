import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PlanValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    description: schema.string([rules.minLength(10)]),
    price: schema.number([rules.minLength(4)]),
    duration: schema.number([rules.minLength(5)]),
  })

  public messages: CustomMessages = {
    'description.required': 'La descripción es requerida',
    'price.required': 'El precio es requerido',
    'duration.required': 'La duración es requerida',
  }
}