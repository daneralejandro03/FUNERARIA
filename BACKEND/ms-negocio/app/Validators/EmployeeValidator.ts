import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmployeeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    position: schema.string([rules.required(), rules.minLength(5)]),
    salary: schema.number([rules.required(), rules.range(10000,100000)]),
    user_id: schema.number([rules.exists({ table: 'users', column: 'id'})]),
  })

  public messages: CustomMessages = {
    'position.required': 'La posición es requerida',
    'salary.required': 'El salario es requerido',
    'salary.number': 'El salario debe ser un número',
    'user_id.required': 'El ID de usuario es requerido',
  }
}