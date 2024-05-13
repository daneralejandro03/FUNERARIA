import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PlanValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    description: schema.string([rules.minLength(10)]),
    price: schema.number([rules.range(1,10)]),
    duration: schema.number([rules.range(1,500)]),
  })

  public messages: CustomMessages = {}
}