import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SubscriptionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    subscription_type: schema.string([rules.minLength(10)]),
    startDate: schema.date(),
    endDate: schema.date(),
    state: schema.boolean(),
    plan_id: schema.number([rules.range(1,20)]),
    customer_id: schema.number([rules.range(1,20)]),
  })

  public messages: CustomMessages = {}
}