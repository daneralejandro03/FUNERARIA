import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BeneficiaryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    beneficiary_status: schema.string([rules.minLength(2)]),
    customer_id: schema.number([rules.range(1,20)]),
    owner_id: schema.number([rules.required(), rules.range(1,20)]),
  })

  public messages: CustomMessages = {}
}
