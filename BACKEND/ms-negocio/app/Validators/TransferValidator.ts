import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TransferValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    placeOrigin: schema.string([rules.minLength(10)]),
    destination: schema.string([rules.minLength(10)]),
    distance: schema.number([rules.range(1,200)]),
    typeVehicle: schema.string([rules.minLength(10)]),
    service_id: schema.number([rules.range(1,20)]),
  })

  public messages: CustomMessages = {}
}