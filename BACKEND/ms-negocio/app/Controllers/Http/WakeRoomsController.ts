import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import WakeRoom from 'App/Models/WakeRoom';

export default class WakeRoomsController {
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theWakeRoom: WakeRoom = await WakeRoom.create(body);
        return theWakeRoom;
    }

    //Read
    public async find({ request, params }: HttpContextContract) {

        if (params.id) {
            return await WakeRoom.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await WakeRoom.query().paginate(page, perPage)
            } else {
                return await WakeRoom.query()
            }

        }

    }

    //Update
    public async update({ params, request }: HttpContextContract) {

        const theWakeRoom: WakeRoom = await WakeRoom.findOrFail(params.id);
        const body = request.body();
        theWakeRoom.name = body.name
        theWakeRoom.capacity = body.capacity
        theWakeRoom.availability = body.availability
        theWakeRoom.sites_id = body.sites_id
        theWakeRoom.burial_id = body.burial_id;
        theWakeRoom.cremation_id = body.cremation_id

        return await theWakeRoom.save();
    }

    //Delete
    public async delete({ params, response }: HttpContextContract) {

        const theWakeRoom: WakeRoom = await WakeRoom.findOrFail(params.id);
        response.status(204);

        return await theWakeRoom.delete();
    }
}
