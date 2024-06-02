import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SiteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.required()]),
    location: schema.string([rules.required()]),
    email: schema.string([rules.required()]),
    city_id: schema.number([rules.required()]),
    department_id: schema.number([rules.required()]),
    department_name: schema.string.optional(),
    city_name: schema.string.optional(),
  })

  public messages: CustomMessages = {}
}
