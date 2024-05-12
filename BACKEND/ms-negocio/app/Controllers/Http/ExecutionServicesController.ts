import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ExecutionService from 'App/Models/ExecutionService'

export default class ExecutionServicesController {
  //Create
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const theExecutionService: ExecutionService = await ExecutionService.create(body)
    return theExecutionService
  } 

  //Read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const theExecutionService = await ExecutionService.findOrFail(params.id);
      await theExecutionService.load('comments');
      await theExecutionService.load("chat")
      return theExecutionService
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

  //Update
  public async update({ params, request }: HttpContextContract) {
    const theExecutionService: ExecutionService = await ExecutionService.findOrFail(params.id)
    const body = request.body()
    theExecutionService.cost = body.cost
    theExecutionService.duration = body.duration
    theExecutionService.state = body.state
    theExecutionService.plan = body.plan_id;
    theExecutionService.service = body.service_id
    return await theExecutionService.save()
  }

  //Delete
  public async delete({ params, response }: HttpContextContract) {
    const theExecutionService: ExecutionService = await ExecutionService.findOrFail(params.id)
    response.status(204)

    return await theExecutionService.delete()
  }
}
