import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    type: schema.string([rules.minLength(10), rules.required()]),
    start_date: schema.date({format: 'yyyy-MM-dd HH:mm:ss'}),
    end_date: schema.date({format: 'yyyy-MM-dd HH:mm:ss'})
  })

  public messages: CustomMessages = {
    
  }
}