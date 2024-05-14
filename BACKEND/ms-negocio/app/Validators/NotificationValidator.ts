import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NotificationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    message: schema.string([rules.minLength(1), rules.required()]),
    date_shipped: schema.date(),
    service_id: schema.number([rules.unsigned(), rules.required()]),
  })

  public messages: CustomMessages = {
  }
}