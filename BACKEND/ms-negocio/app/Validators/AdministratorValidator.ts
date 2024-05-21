import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdministratorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    privileges: schema.string([rules.required()]),
    responsabilities: schema.string([rules.required()]),
    user_id: schema.number([rules.exists({ table: 'users', column: 'id'})]),
    
  })

  public messages: CustomMessages = {
    
  }
}