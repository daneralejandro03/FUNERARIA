import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiColombiaService from 'App/service/ApiColombiaService'

export default class LocationsController {
  public async getDepartments({ response }: HttpContextContract) {
    try {
      const departments = await ApiColombiaService.getDepartments()
      return response.status(200).json(departments)
    } catch (error) {
      return response.status(500).json({
        message: 'Error fetching departments',
        error: error.message,
      })
    }
  }

  public async getCitiesByDepartment({ params, response }: HttpContextContract) {
    const { id } = params
    try {
      const cities = await ApiColombiaService.getCitiesByDepartment(id)
      return response.status(200).json(cities)
    } catch (error) {
      return response.status(500).json({
        message: `Error fetching cities for department ${id}`,
        error: error.message,
      })
    }
  }
}
