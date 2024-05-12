import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OwnerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    contract_status: schema.string([rules.minLength(4)]),
    customer_id: schema.number([rules.minLength(2)]),
  })

  public messages: CustomMessages = {
    'contract_status.required': 'El estado del contrato es requerido',
    'customer_id.required': 'El ID del cliente es requerido',
  }
}