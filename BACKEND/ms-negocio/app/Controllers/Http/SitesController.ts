import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Site from 'App/Models/Site'
import SiteValidator from 'App/Validators/SiteValidator'
import ApiColombiaService from 'App/service/ApiColombiaService'

export default class SitesController {
  // Create
  public async store({ request, response }: HttpContextContract) {
    try {
      const body = await request.validate(SiteValidator)

      // Verificar que la ciudad exista en el departamento especificado
      const cityId = body.city_id
      const departmentId = body.department_id
      const city = await ApiColombiaService.getCityById(cityId, departmentId)
      if (!city) {
        return response
          .status(400)
          .json({ error: 'City does not exist in the specified department' })
      }

      const theSite: Site = await Site.create(body)
      return theSite
    } catch (error) {
      return response.status(500).json({ error: 'Error creating site', message: error.message })
    }
  }

  //Read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theSite: Site = await Site.findOrFail(params.id)
      await theSite.load('wakeRoom')
      return theSite
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Site.query().paginate(page, perPage)
      } else {
        return await Site.query()
      }
    }
  }

  //Update
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const theSite: Site = await Site.findOrFail(params.id)
      const body = request.body()

      // Verificar que la ciudad exista en el departamento especificado
      const cityId = body.city_id
      const departmentId = body.department_id
      const city = await ApiColombiaService.getCityById(cityId, departmentId)
      if (!city) {
        return response
          .status(400)
          .json({ error: 'City does not exist in the specified department' })
      }

      // Actualizar el sitio con los datos proporcionados
      theSite.merge({
        name: body.name,
        location: body.location,
        email: body.email,
        department_id: body.department_id,
        city_id: body.city_id,
      })
      await theSite.save()

      return theSite
    } catch (error) {
      return response.status(500).json({ error: 'Error updating site', message: error.message })
    }
  }

  //Delete
  public async delete({ params, response }: HttpContextContract) {
    const theSite: Site = await Site.findOrFail(params.id)

    if (theSite.wakeRoom) {
      response.status(400)
      return { error: 'No se puede eliminar ya que tiene una sala asociada' }
    } else {
      response.status(204)
    }

    response.status(204)
    return await theSite.delete()
  }
}
