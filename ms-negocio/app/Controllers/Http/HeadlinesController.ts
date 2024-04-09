import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Headline from 'App/Models/Headline'

export default class HeadlinesController {

    //Create
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theHeadline: Headline = await Headline.create(body);
        return theHeadline;
    }


    //Read
    public async find({ request, params }: HttpContextContract) {

        if (params.id) {
            return await Headline.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Headline.query().paginate(page, perPage)
            } else {
                return await Headline.query()
            }

        }

    }

    //Update
    public async update({ params, request }: HttpContextContract) {

        const theHeadline: Headline = await Headline.findOrFail(params.id);
        const body = request.body();
        theHeadline.address = body.address;


        return await theHeadline.save();
    }

    //Delete
    public async delete({ params, response }: HttpContextContract) {

        const theHeadline: Headline = await Headline.findOrFail(params.id);
        response.status(204);

        return await theHeadline.delete();
    }

}
