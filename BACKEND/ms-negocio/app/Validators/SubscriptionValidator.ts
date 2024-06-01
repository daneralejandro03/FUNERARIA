import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SubscriptionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    subscription_type: schema.string([rules.minLength(10)]),
    start_date: schema.date({format: 'yyyy-MM-dd'}),
    end_date: schema.date({format: 'yyyy-MM-dd'}),
    state: schema.boolean([rules.required()]),
    plan_id: schema.number([rules.exists({ table: 'plans', column: 'id'})]),
    customer_id: schema.number([rules.exists({ table: 'customers', column: 'id'})]),
  })

  public messages: CustomMessages = {
    'subscription_type.required': 'El tipo de suscripción es requerido',
    'start_date.required': 'La fecha de inicio de la suscripción es requerida',
    'end_date.required': 'La fecha de fin de la suscripción es requerida',
    'state.required': 'El estado de la suscripción es requerido',
    'plan_id.required': 'El ID del plan es requerido',
    'customer_id.required': 'El ID del cliente es requerido',
  }
}