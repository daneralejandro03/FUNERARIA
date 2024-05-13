import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class WakeRoomValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.minLength(10)]),
    capacity: schema.number([rules.range(1,100)]),
    availability: schema.boolean(),
    site_id: schema.number([rules.range(1,20)]),
  })

  public messages: CustomMessages = {}
}