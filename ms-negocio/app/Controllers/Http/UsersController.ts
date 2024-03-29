import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class UsersController {

    //Create
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theUser: User = await User.create(body);
        return theUser;
    }


    //Read
    public async find({ request, params }: HttpContextContract) {

        if (params.id) {
            return await User.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await User.query().paginate(page, perPage)
            } else {
                return await User.query()
            }

        }

    }

    //Update
    public async update({ params, request }: HttpContextContract) {

            const theUser: User = await User.findOrFail(params.id);
            const body = request.body();
            theUser.name = body.name
            theUser.lastname = body.lastname;
            theUser.email = body.email;
            theUser.password = body.password;

            return await theUser.save();
        }

        //Delete
        public async delete({ params, response }: HttpContextContract) {

            const theUser: User = await User.findOrFail(params.id);
            response.status(204);

            return await theUser.delete();
        }
}
