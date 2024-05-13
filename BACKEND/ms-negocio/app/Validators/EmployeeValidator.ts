import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmployeeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    position: schema.string([rules.minLength(5)]),
    salary: schema.number([rules.range(1,10)]),
    user_id: schema.string([rules.minLength(5)]),
  })

  public messages: CustomMessages = {}
}