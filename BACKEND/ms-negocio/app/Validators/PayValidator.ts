import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PayValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    amount: schema.number([rules.range(1000,10000), rules.required()]),
    subscription_id: schema.number([rules.exists({ table: 'subscriptions', column: 'id'})]),
  })

  public messages: CustomMessages = {
    'pay_day.required': 'El día de pago es requerido',
    'amount.required': 'El monto es requerido',
    'subscription_id.required': 'El ID de la suscripción es requerido',
  }
}