import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Incident from 'App/Models/Incident'
import IncidentValidator from 'App/Validators/IncidentValidator'

export default class IncidentsController {
  public async store({ request }: HttpContextContract) {
    const body = await request.validate(IncidentValidator)
    //const body = await request.body()
    const theIncident: Incident = await Incident.create(body)
    return theIncident
  }

  //Read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theIncident: Incident = await Incident.findOrFail(params.id)

      return theIncident
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Incident.query().paginate(page, perPage)
      } else {
        return await Incident.query()
      }
    }
  }

  //Update
  public async update({ params, request }: HttpContextContract) {
    const theIncident: Incident = await Incident.findOrFail(params.id)
    const body = request.body()
    theIncident.date_decease = body.date_decease
    theIncident.place_decease = body.place_decease
    theIncident.cause_decease = body.cause_decease

    return await theIncident.save()
  }

  //Delete
  public async delete({ params, response }: HttpContextContract) {
    const theIncident: Incident = await Incident.findOrFail(params.id)

    if (theIncident.chat || theIncident.execution_services || theIncident.comments) {
      response.status(400)
      return {
        error:
          'No se puede eliminar ya que tiene un chat asociada, ejecucion de servicio, o comentario asociado',
      }
    } else {
      response.status(204)
    }

    response.status(204)
    return await theIncident.delete()
  }
}
