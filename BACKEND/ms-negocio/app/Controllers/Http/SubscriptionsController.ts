import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subscription from 'App/Models/Subscription'

export default class SubscriptionsController {

    //Create
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theSubscription: Subscription = await Subscription.create(body);
        return theSubscription;
    }


    //Read
    public async find({ request, params }: HttpContextContract) {

        if (params.id) {
            return await Subscription.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Subscription.query().paginate(page, perPage)
            } else {
                return await Subscription.query()
            }
        }
    }

    //Update
    public async update({ params, request }: HttpContextContract) {

        const theSubscription: Subscription = await Subscription.findOrFail(params.id);
        const body = request.body();
        theSubscription.subscription_type = body.subscription_type;
        theSubscription.startDate = body.startDate;
        theSubscription.endDate = body.endDate;
        theSubscription.state = body.state;
        theSubscription.customer = body.customer_id
        theSubscription.plan = body.plan_id

        return await theSubscription.save();
    }

    //Delete
    public async delete({ params, response }: HttpContextContract) {

        const theSubscription: Subscription = await Subscription.findOrFail(params.id);
        response.status(204);

        return await theSubscription.delete();
    }

}
