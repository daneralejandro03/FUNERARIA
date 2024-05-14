import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TransferValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    placeOrigin: schema.string([rules.minLength(10)]),
    destination: schema.string([rules.minLength(10)]),
    distance: schema.number([rules.minLength(3)]),
    typeVehicle: schema.string([rules.minLength(10)]),
    service_id: schema.number([rules.minLength(2)]),
  })

  public messages: CustomMessages = {
    'placeOrigin.required': 'El lugar de origen es requerido',
    'destination.required': 'El destino es requerido',
    'distance.required': 'La distancia es requerida',
    'typeVehicle.required': 'El tipo de vehículo es requerido',
    'service_id.required': 'El ID del servicio es requerido',
  }
}