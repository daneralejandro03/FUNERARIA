import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MessageValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    information: schema.string([rules.required()]),
    user_id: schema.string([rules.required()]),
    chat_id: schema.number([rules.exists({ table: 'chats', column: 'id'})]),
  })

  public messages: CustomMessages = {
  }
}