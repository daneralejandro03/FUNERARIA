import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SiteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.required()]),
    location: schema.string([rules.required()]),
    email: schema.string([rules.required()]),
    city_id: schema.number([rules.exists({ table: 'cities', column: 'id'})]),
  })

  public messages: CustomMessages = {
    'name.required': 'El nombre del sitio es requerido',
    'location.required': 'La ubicación del sitio es requerida',
    'email.required': 'El correo electrónico del sitio es requerido',
  }
}