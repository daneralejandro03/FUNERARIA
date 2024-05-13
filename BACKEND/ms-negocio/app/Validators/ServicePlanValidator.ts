import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServicePlanValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    statusHiring: schema.boolean(),
    dateHiring: schema.date(),
    dateExpiration: schema.date(),
    service_id: schema.number([rules.range(1,20)]),
    plan_id: schema.number([rules.range(1,20)]),
  })

  public messages: CustomMessages = {}
}
