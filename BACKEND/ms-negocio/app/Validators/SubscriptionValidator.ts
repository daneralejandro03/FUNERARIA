import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SubscriptionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    subscription_type: schema.string([rules.minLength(10)]),
    startDate: schema.date(),
    endDate: schema.date(),
    state: schema.boolean(),
    plan_id: schema.number([rules.minLength(2)]),
    customer_id: schema.number([rules.minLength(2)]),
  })

  public messages: CustomMessages = {
    'subscription_type.required': 'El tipo de suscripción es requerido',
    'startDate.required': 'La fecha de inicio de la suscripción es requerida',
    'endDate.required': 'La fecha de fin de la suscripción es requerida',
    'state.required': 'El estado de la suscripción es requerido',
    'plan_id.required': 'El ID del plan es requerido',
    'customer_id.required': 'El ID del cliente es requerido',
  }
}