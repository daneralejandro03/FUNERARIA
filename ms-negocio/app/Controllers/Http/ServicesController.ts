import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from 'App/Models/Service';

export default class ServicesController {

    //Create
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theService: Service = await Service.create(body);
        return theService;
    }


    //Read
    public async find({ request, params }: HttpContextContract) {

        if (params.id) {
            return await Service.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Service.query().paginate(page, perPage)
            } else {
                return await Service.query()
            }

        }

    }

    //Update
    public async update({ params, request }: HttpContextContract) {

        const theService: Service = await Service.findOrFail(params.id);
        const body = request.body();
        theService.type = body.type;
        theService.start_date = body.start_date;
        theService.end_date = body.end_date;

        return await theService.save();
    }

    //Delete
    public async delete({ params, response }: HttpContextContract) {

        const theService: Service = await Service.findOrFail(params.id);
        response.status(204);

        return await theService.delete();
    }

}
