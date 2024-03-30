import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RolePermission from 'App/Models/RolePermission';

export default class RolePermissionsController {

            //Create
            public async store({ request }: HttpContextContract) {
                const body = request.body();
                const theRolePermission: RolePermission = await RolePermission.create(body);
                return theRolePermission;
            }
        
        
            //Read
            public async find({ request, params }: HttpContextContract) {
        
                if (params.id) {
                    return await RolePermission.findOrFail(params.id);
                } else {
                    const data = request.all()
                    if ("page" in data && "per_page" in data) {
                        const page = request.input('page', 1);
                        const perPage = request.input("per_page", 20);
                        return await RolePermission.query().paginate(page, perPage)
                    } else {
                        return await RolePermission.query()
                    }
        
                }
        
            }
        
            //Update
            public async update({ params, request }: HttpContextContract) {
        
                    const theRolePermission: RolePermission = await RolePermission.findOrFail(params.id);
                    const body = request.body();
        
                    return await theRolePermission.save();
                }
                
            //Delete
            public async delete({ params, response }: HttpContextContract) {
    
                const theRolePermission: RolePermission = await RolePermission.findOrFail(params.id);
                response.status(204);
    
                return await theRolePermission.delete();
            }
}
