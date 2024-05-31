import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pay from 'App/Models/Pay'
import PayValidator from 'App/Validators/PayValidator';

export default class PaysController {

    //Create
    public async store({ request }: HttpContextContract) {
        const body = await request.validate(PayValidator);
        //const body = request.body();
        const thePay: Pay = await Pay.create(body);
        return thePay;
    }


    //Read
    public async find({ request, params }: HttpContextContract) {

        if (params.id) {
            let thePay:Pay = await Pay.findOrFail(params.id);
            await thePay.load("subscription")
            return thePay;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Pay.query().paginate(page, perPage)
            } else {
                return await Pay.query()
            }

        }

    }

    //Update
    public async update({ params, request }: HttpContextContract) {

        const thePay: Pay = await Pay.findOrFail(params.id);
        const body = request.body();
        thePay.pay_day = body.pay_day;
        thePay.amount = body.amount;
        thePay.subscription_id = body.subscription_id

        return await thePay.save();
    }

    //Delete
    public async delete({ params, response }: HttpContextContract) {

        const thePay: Pay = await Pay.findOrFail(params.id);
        response.status(204);

        return await thePay.delete();
    }

}
