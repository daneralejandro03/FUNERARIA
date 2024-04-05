import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Departament from 'App/Models/Department';

export default class DepartamentsController {

    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theDepartament: Departament = await Departament.create(body);
        return theDepartament;
    }

    //Read
    public async find({ request, params }: HttpContextContract) {

        if (params.id) {
            return await Departament.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Departament.query().paginate(page, perPage)
            } else {
                return await Departament.query()
            }

        }

    }

    //Update
    public async update({ params, request }: HttpContextContract) {

        const theDepartament: Departament = await Departament.findOrFail(params.id);
        const body = request.body();
        theDepartament.name = body.name
        theDepartament.numberCities = body.numberCities
        theDepartament.numberVenues = body.numberVenues;

        return await theDepartament.save();
    }

    //Delete
    public async delete({ params, response }: HttpContextContract) {

        const theDepartament: Departament = await Departament.findOrFail(params.id);
        response.status(204);

        return await theDepartament.delete();
    }
}
