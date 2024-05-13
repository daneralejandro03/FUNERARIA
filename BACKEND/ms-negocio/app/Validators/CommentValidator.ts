import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CommentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    message: schema.string([rules.minLength(15)]),
    send_date: schema.date(),
    executionService_id: schema.number([rules.range(1,20)]),
  })

  public messages: CustomMessages = {}
}