import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Administrator from 'App/Models/Administrator';

export default class AdministratorsController {
    //Create
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theAdministrator: Administrator = await Administrator.create(body);
        return theAdministrator;
    }


    //Read
    public async find({ request, params }: HttpContextContract) {

        if (params.id) {
            return await Administrator.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Administrator.query().paginate(page, perPage)
            } else {
                return await Administrator.query()
            }

        }

    }

    //Update
    public async update({ params, request }: HttpContextContract) {

            const theAdministrator: Administrator = await Administrator.findOrFail(params.id);
            const body = request.body();
            theAdministrator.privileges = body.privileges
            theAdministrator.responsabilities = body.responsibilities;
            theAdministrator.users_id = body.users_id;

            return await theAdministrator.save();
        }

        //Delete
        public async delete({ params, response }: HttpContextContract) {

            const theAdministrator: Administrator = await Administrator.findOrFail(params.id);
            response.status(204);

            return await theAdministrator.delete();
        }
}
