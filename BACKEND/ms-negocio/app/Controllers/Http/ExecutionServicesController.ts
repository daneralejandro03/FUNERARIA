import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ExecutionService from 'App/Models/ExecutionService'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class ExecutionServicesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theExecutionServices: ExecutionService = await ExecutionService.findOrFail(params.id)
      return theExecutionServices
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await ExecutionService.query().paginate(page, perPage)
      } else {
        return await ExecutionService.query()
      }
    }
  }
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const theExecutionServices: ExecutionService = await ExecutionService.create(body)
    return theExecutionServices
  }

  public async update({ params, request }: HttpContextContract) {
    const theExecutionServices: ExecutionService = await ExecutionService.findOrFail(params.id)
    const body = request.body()
    theExecutionServices.cost = body.cost
    theExecutionServices.duration = body.duration
    theExecutionServices.state = body.state
    theExecutionServices.customer_id = body.customer_id
    theExecutionServices.service_id = body.service_id

    return await theExecutionServices.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const theExecutionServices: ExecutionService = await ExecutionService.findOrFail(params.id)
    response.status(204)
    return await theExecutionServices.delete()
  }
}
