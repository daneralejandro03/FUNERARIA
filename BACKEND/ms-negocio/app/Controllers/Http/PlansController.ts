import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Plan from 'App/Models/Plan'
import PlanValidator from 'App/Validators/PlanValidator'

export default class PlansController {
  //Create
  public async store({ request }: HttpContextContract) {
    const body = await request.validate(PlanValidator);
    const thePlan: Plan = await Plan.create(body);
    return thePlan;
  }

  //Read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let thePlan: Plan = await Plan.findOrFail(params.id)
      await thePlan.load('servicesplan')
      return thePlan
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Plan.query().paginate(page, perPage)
      } else {
        return await Plan.query()
      }
    }
  }

  //Update
  public async update({ params, request }: HttpContextContract) {
    const thePlan: Plan = await Plan.findOrFail(params.id)
    const body = request.body()
    thePlan.description = body.description
    thePlan.price = body.price
    thePlan.duration = body.duration

    return await thePlan.save()
  }

  //Delete
  public async delete({ params, response }: HttpContextContract) {
    const thePlan: Plan = await Plan.findOrFail(params.id)

    if (thePlan.servicesplan) {
      response.status(400)
      return { error: 'No se puede eliminar ya que tiene un plan de servicio asociado' }
    } else {
      response.status(204)
    }

    response.status(204)
    return await thePlan.delete()
  }
}
