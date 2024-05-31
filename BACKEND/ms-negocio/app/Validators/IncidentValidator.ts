import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IncidentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    date_decease: schema.date({ format: 'yyyy-MM-dd HH:mm:ss' }),
    place_decease: schema.string([rules.required()]),
    cause_decease: schema.string([rules.required()]),
  })

  public messages: CustomMessages = {
    'date_decease.required': 'La fecha del fallecimiento es obligatoria',
    'place_decease.required': 'El lugar del fallecimiento es obligatorio',
    'cause_decease.required': 'La causa del fallecimiento es obligatoria',
  }
}
