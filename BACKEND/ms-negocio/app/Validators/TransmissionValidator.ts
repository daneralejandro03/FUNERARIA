import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TransmissionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    start_date: schema.date({format: 'yyyy-MM-dd HH:mm:ss'}),
    end_date: schema.date({format: 'yyyy-MM-dd HH:mm:ss'}),
    camera_id: schema.number([rules.exists({table: 'cameras', column: 'id'})]),
    execution_service_id: schema.number([rules.exists({table: 'executionServices', column: 'id'})])
  })

  public messages: CustomMessages = {}
}
