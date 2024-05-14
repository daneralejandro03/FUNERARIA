import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BeneficiaryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    beneficiary_status: schema.string([rules.required(), rules.minLength(2)]),
    customer_id: schema.number([rules.required(), rules.unsigned()]),
    owner_id: schema.number([rules.required(), rules.unsigned()]),
  })

  public messages: CustomMessages = {
    'beneficiary_status.required': 'El estado del beneficiario es requerido',
    'customer_id.required': 'El ID del cliente es requerido',
    'owner_id.required': 'El ID del propietario es requerido',
  }
}
