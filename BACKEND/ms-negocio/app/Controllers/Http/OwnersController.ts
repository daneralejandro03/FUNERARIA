import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Owner from 'App/Models/Owner';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env'
import Customer from 'App/Models/Customer';
import Beneficiary from 'App/Models/Beneficiary';

export default class OwnersController {
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theOwner: Owner = await Owner.create(body);
        return theOwner;
    }

    //Read
    public async find({ request, params }: HttpContextContract) {
        
        const theRequest = request.toJSON()
        const token = theRequest.headers.authorization.replace("Bearer ", "")
        let theData = {}

        if (params.id) {

            let theOwner:Owner = await Owner.findOrFail(params.id);
            await theOwner.load('customer');
            await theOwner.load('beneficiaries');
            let user_id = theOwner.customer.user_id;
            let address = theOwner.customer.address;
            let phone_number = theOwner.customer.phone_number;

            theData = {
                case: 1,
                token: token,
                address: address,
                phone_number: phone_number,
                id: user_id,
                theOwner: theOwner
                
            }

            let ownerInfo = this.mergeOwnerOata(theData);

            return ownerInfo;

        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Owner.query().paginate(page, perPage)
            } else {

                theData = {
                    case: 2,
                    token: token
                };

                let ownersInfo = this.mergeOwnerOata(theData);

                return ownersInfo;
            }

        }

    }

    public async mergeOwnerOata(theData: {}){
        let theUsers = [];
        let theUser = {};
        let ownersInfo: OwnerInfo[] = [];

        interface OwnerInfo {
            id: number;
            identificationCard: string;
            contract_status: string;
            address: string;
            phone_number: string;
            name: string;
            email: string;
            customer?: Customer;
            beneficiaries?: Beneficiary[];
        }

        if(theData["case"] == 1){
            
            await theData["theOwner"].load('customer');
            await theData["theOwner"].load('beneficiaries');

            theUser = await this.getUserData(theData["token"], theData["id"]);
                
            const ownerInfo: OwnerInfo = {
                id: theData["theOwner"]["id"],
                identificationCard: theUser["identificationCard"],
                contract_status: theData["contract_status"],
                address: theData["address"],
                phone_number: theData["phone_number"],
                name: theUser["name"],
                email: theUser["email"],
                customer: theData["theOwner"].customer,
                beneficiaries: theData["theOwner"].beneficiaries
            }
            return ownerInfo;

        }else if(theData["case"] == 2){

            theUsers = await this.getUserData(theData["token"]);

            let theOwners:Owner[] = await Owner.query().preload('customer');

            for(let userActual of theUsers){

                for(let ownerActual of theOwners){
                    
                    await ownerActual.load('customer');

                    if(ownerActual.customer.user_id === userActual["_id"]){
                            
                        const ownerInfo: OwnerInfo  = {
                            id: ownerActual["id"],
                            identificationCard: userActual["identificationCard"],
                            contract_status: ownerActual["contract_status"],
                            address: ownerActual.customer.address,
                            phone_number: ownerActual.customer.phone_number,
                            name: userActual["name"],
                            email: userActual["email"]
                        };

                        ownersInfo.push(ownerInfo);       
                    }
                }
            }  
            return ownersInfo; 
        }
    }

    private async getUserData(token: string, id?: string) {
        let url = `${Env.get('MS_SECURITY')}/api/users`;
        if (id) {
            url += `/${id}`;
        }
    
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al realizar la solicitud GET:', error);
            return null;
        }
    }
    

    //Update
    public async update({ params, request }: HttpContextContract) {

        const theOwner: Owner = await Owner.findOrFail(params.id);
        const body = request.body();
        theOwner.contract_status = body.contract_status;
        theOwner.customer_id = body.customer_id;
        
        return await theOwner.save();
    }

    //Delete
    public async delete({ params, response }: HttpContextContract) {

        const theOwner: Owner = await Owner.findOrFail(params.id);
        response.status(204);

        return await theOwner.delete();
    }
}
