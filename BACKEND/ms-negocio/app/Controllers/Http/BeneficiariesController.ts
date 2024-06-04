import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Beneficiary from 'App/Models/Beneficiary';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env'
import Customer from 'App/Models/Customer';
import BeneficiaryValidator from 'App/Validators/BeneficiaryValidator';

export default class BeneficiariesController {

    public async store({ request }: HttpContextContract) {
        const body = await request.validate(BeneficiaryValidator);
        const theBeneficiary: Beneficiary = await Beneficiary.create(body);
        return theBeneficiary;
    }

    

    //Read
    public async find({ request, params }: HttpContextContract) {

        const theRequest = request.toJSON()
        const token = theRequest.headers.authorization.replace("Bearer ", "")
        let theData = {}

        if (params.id) {
            let theBeneficiary:Beneficiary = await Beneficiary.findOrFail(params.id);
            await theBeneficiary.load('customer');
            let user_id = theBeneficiary.customer.user_id;
            let address = theBeneficiary.customer.address;
            let phone_number = theBeneficiary.customer.phone_number;

            theData = {
                case: 1,
                token: token,
                address: address,
                phone_number: phone_number,
                id: user_id,
                theBeneficiary: theBeneficiary
                
            }

            let beneficiaryInfo = this.mergeBeneficiaryOata(theData);

            return beneficiaryInfo;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Beneficiary.query().paginate(page, perPage)
            } else {

                theData = {
                    case: 2,
                    token: token
                };

                let beneficiariesInfo = this.mergeBeneficiaryOata(theData);

                return beneficiariesInfo;
            }

        }

    }

    public async mergeBeneficiaryOata(theData: {}){
        let theUsers = [];
        let theUser = {};
        let beneficiariesInfo: BeneficiaryInfo[] = [];

        interface BeneficiaryInfo {
            id: number;
            identificationCard: string;
            beneficiary_status: string;
            address: string;
            phone_number: string;
            name: string;
            email: string;
            customer?: Customer;
        }

        if(theData["case"] == 1){
            
            await theData["theBeneficiary"].load('customer');

            theUser = await this.getUserData(theData["token"], theData["id"]);
                
            const beneficiaryInfo: BeneficiaryInfo = {
                id: theData["theBeneficiary"]["id"],
                identificationCard: theUser["identificationCard"],
                beneficiary_status: theData["theBeneficiary"]["beneficiary_status"],
                address: theData["address"],
                phone_number: theData["phone_number"],
                name: theUser["name"],
                email: theUser["email"],
                customer: theData["theBeneficiary"].customer
            }
            return beneficiaryInfo;

        }else if(theData["case"] == 2){

            theUsers = await this.getUserData(theData["token"]);

            let theBeneficiaries:Beneficiary[] = await Beneficiary.query().preload('customer');

            for(let userActual of theUsers){

                for(let beneficiaryActual of theBeneficiaries){

                    if(beneficiaryActual.customer.user_id === userActual["_id"]){
                            
                        const beneficiarieInfo: BeneficiaryInfo  = {
                            id: beneficiaryActual["id"],
                            identificationCard: userActual["identificationCard"],
                            beneficiary_status: beneficiaryActual["beneficiary_status"],
                            address: beneficiaryActual.customer.address,
                            phone_number: beneficiaryActual.customer.phone_number,
                            name: userActual["name"],
                            email: userActual["email"]
                        };

                        beneficiariesInfo.push(beneficiarieInfo);       
                    }
                }
            }  
            return beneficiariesInfo; 
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

        const theBeneficiary: Beneficiary = await Beneficiary.findOrFail(params.id);
        const body = request.body();
        theBeneficiary.beneficiary_status = body.beneficiary_status
        theBeneficiary.customer_id = body.customer_id;
        
        return await theBeneficiary.save();
    }

    //Delete
    public async delete({ params, response }: HttpContextContract) {

        const theBeneficiary: Beneficiary = await Beneficiary.findOrFail(params.id);
        response.status(204);

        return await theBeneficiary.delete();
    }
}