import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PayValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    pay_day: schema.date(),
    amount: schema.number([rules.range(1,10)]),
    subscription_id: schema.number([rules.range(1,20)]),
  })

  public messages: CustomMessages = {}
}