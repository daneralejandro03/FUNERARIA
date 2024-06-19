import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Site from 'App/Models/Site'
import SiteValidator from 'App/Validators/SiteValidator'
import ApiColombiaService from 'App/Services/ApiColombiaService'
import Ws from 'App/Services/Ws'

export default class SitesController {
  // Create
  public async store({ request, response }: HttpContextContract) {
    try {
      const body = await request.validate(SiteValidator)

      const { city_id: cityId, department_id: departmentId } = body
      const city = await ApiColombiaService.getCityById(cityId, departmentId)
      if (!city) {
        return response
          .status(400)
          .json({ error: 'City does not exist in the specified department' })
      }

      const { departmentName, cityName } = await ApiColombiaService.getDepartmentAndCityNames(
        departmentId,
        cityId
      )

      const theSite: Site = await Site.create({
        ...body,
        department_name: departmentName,
        city_name: cityName,
      })

      return response.status(201).json(theSite)
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: 'Error creating site', message: error.message })
    }
  }

  // Read
  public async find({ request, params }: HttpContextContract) {
    Ws.io.emit('news', { hello: 'Listaron desde otro lugar a Sitios' })
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

  // Update
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const theSite: Site = await Site.findOrFail(params.id)
      const body = request.body()

      const { city_id: cityId, department_id: departmentId } = body
      const city = await ApiColombiaService.getCityById(cityId, departmentId)
      if (!city) {
        return response
          .status(400)
          .json({ error: 'City does not exist in the specified department' })
      }

      const { departmentName, cityName } = await ApiColombiaService.getDepartmentAndCityNames(
        departmentId,
        cityId
      )

      theSite.merge({
        ...body,
        department_name: departmentName,
        city_name: cityName,
      })
      await theSite.save()

      return response.status(200).json(theSite)
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: 'Error updating site', message: error.message })
    }
  }

  // Delete
  public async delete({ params, response }: HttpContextContract) {
    const theSite: Site = await Site.findOrFail(params.id)

    if (theSite.wakeRoom) {
      return response.status(400).json({ error: 'Cannot delete as it has an associated wake room' })
    }

    await theSite.delete()

    return response.status(204)
  }
}
