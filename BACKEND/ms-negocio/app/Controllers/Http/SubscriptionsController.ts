import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subscription from 'App/Models/Subscription'
import SubscriptionValidator from 'App/Validators/SubscriptionValidator';

export default class SubscriptionsController {

    //Create
    public async store({ request }: HttpContextContract) {
        const body = await request.validate(SubscriptionValidator);
        //const body = request.body();
        const theSubscription: Subscription = await Subscription.create(body);
        return theSubscription;
    }


    //Read
    public async find({ request, params }: HttpContextContract) {

        if (params.id) {
            let theSubscription: Subscription = await Subscription.findOrFail(params.id)
            await theSubscription.load('pays')
            return theSubscription
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
        theSubscription.start_date = body.start_date;
        theSubscription.end_date = body.end_date;
        theSubscription.state = body.state;
        theSubscription.customer_id = body.customer_id
        theSubscription.plan_id = body.plan_id

        return await theSubscription.save();
    }

    //Delete
    public async delete({ params, response }: HttpContextContract) {

        const theSubscription: Subscription = await Subscription.findOrFail(params.id);
        response.status(204);

        return await theSubscription.delete();
    }

}
