import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class ExecutionServiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cost: schema.number([rules.unsigned()]),
    duration: schema.date({format: 'yyyy-MM-dd'}),
    state: schema.boolean(),
    incident_id: schema.number([rules.exists({ table: 'incidents', column: 'id'})]),
    service_id: schema.number([rules.exists({ table: 'services', column: 'id'})]),
  })

  public messages: CustomMessages = {

  }

}