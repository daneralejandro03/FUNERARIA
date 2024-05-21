import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class ExecutionServiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cost: schema.number([rules.unsigned()]),
    duration: schema.date({format: 'yyyy-MM-dd HH:mm:ss'}),
    state: schema.boolean(),
    customer_id: schema.number([rules.exists({ table: 'customers', column: 'id'})]),
    service_id: schema.number([rules.exists({ table: 'services', column: 'id'})]),
  })

  public messages: CustomMessages = {

  }

}