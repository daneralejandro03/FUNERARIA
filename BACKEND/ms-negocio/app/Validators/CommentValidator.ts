import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CommentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    message: schema.string([rules.minLength(1)]),
    send_date: schema.date({ format: 'yyyy-MM-dd HH:mm:ss' }),
    incident_id: schema.number([rules.exists({ table: 'incidents', column: 'id' })]),
  })

  public messages: CustomMessages = {}
}
