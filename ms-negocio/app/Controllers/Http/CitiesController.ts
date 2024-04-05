import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import City from 'App/Models/City';

export default class CitiesController {
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theCity: City = await City.create(body);
        return theCity;
    }

    //Read
    public async find({ request, params }: HttpContextContract) {

        if (params.id) {
            return await City.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await City.query().paginate(page, perPage)
            } else {
                return await City.query()
            }

        }

    }

    //Update
    public async update({ params, request }: HttpContextContract) {

        const theCity: City = await City.findOrFail(params.id);
        const body = request.body();
        theCity.name = body.name
        theCity.zipCode = body.zipCode
        theCity.departaments_id = body.departaments_id;

        return await theCity.save();
    }

    //Delete
    public async delete({ params, response }: HttpContextContract) {

        const theCity: City = await City.findOrFail(params.id);
        response.status(204);

        return await theCity.delete();
    }
}
