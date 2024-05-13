import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CremationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    urnType: schema.string([rules.minLength(5)]),
    destinyAshes: schema.string([rules.minLength(5)]),
    wakeRoom_id: schema.number([rules.range(1,20)]),
    service_id: schema.number([rules.range(1,20)]),
  })

  public messages: CustomMessages = {}
}