import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OwnerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    contract_status: schema.string([rules.required(), rules.minLength(5)]),
    customer_id: schema.number([rules.exists({ table: 'customers', column: 'id'})]),
  })

  public messages: CustomMessages = {
    'contract_status.required': 'El estado del contrato es requerido',
    'customer_id.required': 'El ID del cliente es requerido',
  }
}