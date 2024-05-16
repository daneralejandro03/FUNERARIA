import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CameraValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    high: schema.number([rules.required(), rules.range(0,100)]),
    width: schema.number([rules.required(), rules.range(0,100)])
  })

  
  public messages: CustomMessages = {}
}
