import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmployeeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    position: schema.string([rules.minLength(5)]),
    salary: schema.number([rules.minLength(3)]),
    user_id: schema.string([rules.minLength(5)]),
  })

  public messages: CustomMessages = {
    'position.required': 'La posición es requerida',
    'salary.required': 'El salario es requerido',
    'salary.number': 'El salario debe ser un número',
    'user_id.required': 'El ID de usuario es requerido',
  }
}