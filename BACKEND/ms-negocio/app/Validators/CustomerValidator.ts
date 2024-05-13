import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CustomerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    address: schema.string([rules.minLength(5)]),
    phone_number: schema.string([rules.minLength(5)]),
    user_id: schema.string([rules.minLength(5)]),
  })

  public messages: CustomMessages = {}
}