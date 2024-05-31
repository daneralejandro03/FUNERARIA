import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ReportValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    reporting_date: schema.date({format: 'yyyy-MM-dd HH:mm:ss'}),
    description: schema.string([rules.required()]),
    state: schema.boolean([rules.required()]),
    customer_id: schema.number([rules.exists({table: 'customers', column: 'id'})]),
    incident_id: schema.number([rules.exists({table: 'incidents', column: 'id'})])
  })

  public messages: CustomMessages = {}
}
