import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CustomerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    address: schema.string([rules.minLength(5)]),
    phone_number: schema.string([rules.minLength(5)]),
    user_id: schema.string([rules.required()])
  })

  public messages: CustomMessages = {
    'address.required': 'La dirección es requerida',
    'phone_number.required': 'El número de teléfono es requerido',
    'user_id.required': 'El ID de usuario es requerido',
  }
}