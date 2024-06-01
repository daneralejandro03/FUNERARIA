import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServicePlanValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    status_hiring: schema.boolean(),
    date_hiring: schema.date({format: 'yyyy-MM-dd'}),
    date_expiration: schema.date({format: 'yyyy-MM-dd'}),
    service_id: schema.number([rules.exists({ table: 'services', column: 'id'})]),
    plan_id: schema.number([rules.exists({ table: 'plans', column: 'id'})])
    
  })

  public messages: CustomMessages = {
    'statusHiring.required': 'El estado de contratación es requerido',
    'dateHiring.required': 'La fecha de contratación es requerida',
    'dateExpiration.required': 'La fecha de vencimiento es requerida',
    'service_id.required': 'El ID del servicio es requerido',
    'plan_id.required': 'El ID del plan es requerido',
  }
}
