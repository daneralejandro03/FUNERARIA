import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CommentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    message: schema.string([rules.minLength(1)]),

    execution_service_id: schema.number([rules.unsigned()]),
  })

  public messages: CustomMessages = {}
}
