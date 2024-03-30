import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission';

export default class PermissionsController {

            //Create
            public async store({ request }: HttpContextContract) {
                const body = request.body();
                const thePermission: Permission = await Permission.create(body);
                return thePermission;
            }
        
        
            //Read
            public async find({ request, params }: HttpContextContract) {
        
                if (params.id) {
                    return await Permission.findOrFail(params.id);
                } else {
                    const data = request.all()
                    if ("page" in data && "per_page" in data) {
                        const page = request.input('page', 1);
                        const perPage = request.input("per_page", 20);
                        return await Permission.query().paginate(page, perPage)
                    } else {
                        return await Permission.query()
                    }
        
                }
        
            }
        
            //Update
            public async update({ params, request }: HttpContextContract) {
        
                    const thePermission: Permission = await Permission.findOrFail(params.id);
                    const body = request.body();
                    thePermission.name = body.name;
                    thePermission.description = body.description;
        
                    return await thePermission.save();
                }
                
            //Delete
            public async delete({ params, response }: HttpContextContract) {
    
                const thePermission: Permission = await Permission.findOrFail(params.id);
                response.status(204);
    
                return await thePermission.delete();
            }

}
