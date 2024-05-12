import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SiteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.minLength(10)]),
    location: schema.string([rules.minLength(10)]),
    email: schema.string([rules.minLength(10)]),
  })

  public messages: CustomMessages = {
    'name.required': 'El nombre del sitio es requerido',
    'location.required': 'La ubicación del sitio es requerida',
    'email.required': 'El correo electrónico del sitio es requerido',
  }
}