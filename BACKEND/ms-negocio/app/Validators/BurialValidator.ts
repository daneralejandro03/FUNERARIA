import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BurialValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    location: schema.string([rules.minLength(2)]),
    burial_type: schema.string([rules.minLength(5)]),
    cementery: schema.string.optional(),
    wakeRoom_id: schema.number([rules.range(1,20)]),
    service_id: schema.number([rules.range(1,20)]),
  })

  public messages: CustomMessages = {}
}
