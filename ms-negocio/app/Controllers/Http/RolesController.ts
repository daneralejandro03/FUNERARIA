import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext' 
import Role from 'App/Models/Role';

export default class RolesController {
    
        //Create
        public async store({ request }: HttpContextContract) {
            const body = request.body();
            const theRole: Role = await Role.create(body);
            return theRole;
        }
    
    
        //Read
        public async find({ request, params }: HttpContextContract) {
    
            if (params.id) {
                return await Role.findOrFail(params.id);
            } else {
                const data = request.all()
                if ("page" in data && "per_page" in data) {
                    const page = request.input('page', 1);
                    const perPage = request.input("per_page", 20);
                    return await Role.query().paginate(page, perPage)
                } else {
                    return await Role.query()
                }
    
            }
    
        }
    
        //Update
        public async update({ params, request }: HttpContextContract) {
    
                const theRole: Role = await Role.findOrFail(params.id);
                const body = request.body();
                theRole.name = body.name;
    
                return await theRole.save();
            }
            
        //Delete
        public async delete({ params, response }: HttpContextContract) {

            const theEmployee: Role = await Role.findOrFail(params.id);
            response.status(204);

            return await theEmployee.delete();
        }

}
