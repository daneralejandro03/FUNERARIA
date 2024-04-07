import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Owner from 'App/Models/Owner';

export default class OwnersController {
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theOwner: Owner = await Owner.create(body);
        return theOwner;
    }

    //Read
    public async find({ request, params }: HttpContextContract) {

        if (params.id) {
            return await Owner.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Owner.query().paginate(page, perPage)
            } else {
                return await Owner.query()
            }

        }

    }

    //Update
    public async update({ params, request }: HttpContextContract) {

        const theOwner: Owner = await Owner.findOrFail(params.id);
        const body = request.body();
        theOwner.name = body.name
        theOwner.address = body.address
        theOwner.customers_id = body.customers_id;
        
        return await theOwner.save();
    }

    //Delete
    public async delete({ params, response }: HttpContextContract) {

        const theOwner: Owner = await Owner.findOrFail(params.id);
        response.status(204);

        return await theOwner.delete();
    }
}
