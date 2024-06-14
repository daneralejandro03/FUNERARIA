import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NotificationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    message: schema.string([rules.required()]),
    date_shipped: schema.date({format: 'yyyy-MM-dd'}),
    service_id: schema.number([rules.exists({ table: 'services', column: 'id'})]),
  })

  public messages: CustomMessages = {
  }
}