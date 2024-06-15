import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TransferValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    place_origin: schema.string([rules.minLength(10), rules.required()]),
    destination: schema.string([rules.minLength(10), rules.required()]),
    distance: schema.number([rules.unsigned(), rules.required()]),
    type_vehicle: schema.string([rules.minLength(5), rules.required()]),
    service_id: schema.number([rules.exists({ table: 'services', column: 'id'})]),
  })

  public messages: CustomMessages = {

  }
}