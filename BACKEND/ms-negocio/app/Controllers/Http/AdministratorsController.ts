import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Administrator from 'App/Models/Administrator';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env'
import AdministratorValidator from 'App/Validators/AdministratorValidator';

export default class AdministratorsController {
    //Create
    public async store({ request }: HttpContextContract) {
        const body = await request.validate(AdministratorValidator);
        const theAdministrator: Administrator = await Administrator.create(body);
        return theAdministrator;
    }


    //Read
    public async find({ request, params }: HttpContextContract) {

        const theRequest = request.toJSON()
        const token = theRequest.headers.authorization.replace("Bearer ", "")
        let theData = {}

        if (params.id) {

            let theAdministrator:Administrator = await Administrator.findOrFail(params.id);
            let id = theAdministrator["user_id"];
        
            theData = {
                case: 1,
                token: token, 
                id: id,
                theAdministrator: theAdministrator
            }

            let administratorInfo = this.mergeAdministratorData(theData);

            return administratorInfo;

        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Administrator.query().paginate(page, perPage)
            } else {
                
                theData = {
                    case: 2,
                    token: token
                };

                let administratorsInfo = this.mergeAdministratorData(theData);

                return administratorsInfo;
            }

        }
    }

    public async mergeAdministratorData(theData: {}){
        let theUsers = [];
        let theUser = {};
        let administratorsInfo: AdministratorInfo[] = [];

        interface AdministratorInfo {
            name: string;
            email: string;
            identificationCard: string;
            privileges: string;
            responsabilities: string;
        }

        if(theData["case"] == 1){
            try {
                const response = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${theData["id"]}`, {
                    headers: {
                    Authorization: `Bearer ${theData["token"]}`
                    }
                });
            
                theUser = response.data;
                    
            } catch (error) {
                console.error('Error al realizar la solicitud GET:', error);
            }
                
            const administratorInfo: AdministratorInfo = {
                name: theUser["name"],
                email: theUser["email"],
                identificationCard: theUser["identificationCard"],
                privileges: theData["theAdministrator"]["privileges"],
                responsabilities: theData["theAdministrator"]["responsabilities"]
            }
            return administratorInfo;

        }else if(theData["case"] == 2){

            try {
                const response = await axios.get(`${Env.get('MS_SECURITY')}/api/users`, {
                  headers: {
                    Authorization: `Bearer ${theData["token"]}`
                  }
                });
    
                theUsers = response.data;
    
            } catch (error) {
                console.error('Error al realizar la solicitud GET:', error);
            }

            let theAdministrators:Administrator[] = [];

            theAdministrators = await Administrator.query();

            for(let userActual of theUsers){

                for(let administratorActual of theAdministrators){

                    if(administratorActual["user_id"] === userActual["_id"]){
                            
                        const administrorInfo: AdministratorInfo  = {
                            name: userActual["name"],
                            email: userActual["email"],
                            identificationCard: userActual["identificationCard"],
                            privileges: administratorActual["privileges"],
                            responsabilities: administratorActual["responsabilities"]
                        };

                        administratorsInfo.push(administrorInfo);       
                    }
                }
            }   
            return administratorsInfo;
        }
    }

    //Update
    public async update({ params, request }: HttpContextContract) {

            const theAdministrator: Administrator = await Administrator.findOrFail(params.id);
            const body = request.body();
            theAdministrator.privileges = body.privileges
            theAdministrator.responsabilities = body.responsibilities;
            theAdministrator.user_id = body.user_id;

            return await theAdministrator.save();
        }

        //Delete
        public async delete({ params, response }: HttpContextContract) {

            const theAdministrator: Administrator = await Administrator.findOrFail(params.id);
            response.status(204);

            return await theAdministrator.delete();
        }
}
