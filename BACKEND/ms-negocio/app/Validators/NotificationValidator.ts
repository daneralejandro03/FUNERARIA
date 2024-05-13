import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NotificationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    message: schema.string([rules.minLength(12)]),
    date_shipped: schema.date(),
    service_id: schema.number([rules.range(1,20)]),
  })

  public messages: CustomMessages = {}
}