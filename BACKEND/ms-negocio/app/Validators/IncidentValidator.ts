import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IncidentValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    date_decease: schema.date({format: 'yyyy-MM-dd HH:mm:ss'}),
    place_decease: schema.string([rules.required()]),
    cause_decease: schema.string([rules.required()])
  })

  
  public messages: CustomMessages = {}
}
