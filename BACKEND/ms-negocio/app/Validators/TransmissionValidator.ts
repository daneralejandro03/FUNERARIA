import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TransmissionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    start_date: schema.date({format: 'yyyy-MM-dd'}),
    end_date: schema.date({format: 'yyyy-MM-dd'}),
    camera_id: schema.number([rules.exists({table: 'cameras', column: 'id'})]),
    execution_service_id: schema.number([rules.exists({table: 'execution_services', column: 'id'})])
  })

  public messages: CustomMessages = {}
}
