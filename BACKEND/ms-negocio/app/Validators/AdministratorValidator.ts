import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdministratorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    privileges: schema.string([rules.minLength(2)]),
    responsabilities: schema.string([rules.minLength(10)]),
    user_id: schema.number([rules.minLength(2)])
  })

  public messages: CustomMessages = {
    'privileges.required': 'Los privilegios son obligatorios.',
    'responsabilities.required': 'Las responsabilidades son obligatorias.',
    'user_id.required': 'El ID de usuario es obligatorio.',
    'user_id.number': 'El ID de usuario debe ser un número.'
  }
}