import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OwnerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    contract_status: schema.string([rules.minLength(4)]),
    customer_id: schema.number([rules.range(1,20)]),
  })

  public messages: CustomMessages = {}
}