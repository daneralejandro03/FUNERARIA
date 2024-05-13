import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExecutionServiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cost: schema.number([rules.range(1,10)]),
    duration: schema.date(),
    state: schema.boolean(),
    customer_id: schema.number([rules.range(1,20)]),
    service_id: schema.number([rules.range(1,20)]),
  })

  public messages: CustomMessages = {}
}