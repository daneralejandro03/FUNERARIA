import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChatValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    start_date: schema.date(),
    state: schema.boolean(),
    executionService_id: schema.number([rules.range(1,20)]),
  })

  public messages: CustomMessages = {}
}