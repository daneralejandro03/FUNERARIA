import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transfer from 'App/Models/Transfer'
import TransferValidator from 'App/Validators/TransferValidator'

export default class TransfersController {
  //Create
  public async store({ request }: HttpContextContract) {
    const body = await request.validate(TransferValidator);
    const theTransfer: Transfer = await Transfer.create(body)
    return theTransfer
  }

  //Read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Transfer.findOrFail(params.id)
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Transfer.query().paginate(page, perPage)
      } else {
        return await Transfer.query()
      }
    }
  }

  //Update
  public async update({ params, request }: HttpContextContract) {
    const theTransfer: Transfer = await Transfer.findOrFail(params.id)
    const body = request.body()
    theTransfer.placeOrigin = body.placeOrigin
    theTransfer.destination = body.destination
    theTransfer.distance = body.distance
    theTransfer.typeVehicle = body.typeVehicle
    theTransfer.service_id = body.service_id

    return await theTransfer.save()
  }

  //Delete
  public async delete({ params, response }: HttpContextContract) {
    const theTransfer: Transfer = await Transfer.findOrFail(params.id)
    response.status(204)

    return await theTransfer.delete()
  }
}
