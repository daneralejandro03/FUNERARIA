import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env'
import Subscription from 'App/Models/Subscription';
import CustomerValidator from 'App/Validators/CustomerValidator';

export default class CustomersController {
    //Create
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theCustomer: Customer = await Customer.create(body);
        return theCustomer;
    }

    //Read
    public async find({ request, params }: HttpContextContract) {

        const theRequest = request.toJSON()
        const token = theRequest.headers.authorization.replace("Bearer ", "")
        let theData = {}

        if (params.id) {
            let theCustomer:Customer = (await Customer.findOrFail(params.id));
            let id = theCustomer["user_id"];
        
            theData = {
                case: 1,
                token: token, 
                id: id,
                theCustomer: theCustomer
            }

            let customerInfo = this.mergeCustomerData(theData);

            return customerInfo;

        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Customer.query().paginate(page, perPage)
            } else {

                theData = {
                    case: 2,
                    token: token
                };

                let customersInfo = this.mergeCustomerData(theData);

                return customersInfo;
            }

        }

    }

    public async mergeCustomerData(theData: {}){
        let theUsers = [];
        let theUser = {};
        let customersInfo: CustomerInfo[] = [];

        interface CustomerInfo {
            id: number;
            name: string;
            email: string;
            identificationCard: string;
            address: string;
            phone_number: string;
            subscriptions?: Subscription[];
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

            console.log(theData["theCustomer"]);
            
                
            const customerInfo: CustomerInfo = {
                id: theData["theCustomer"]["id"],
                name: theUser["name"],
                email: theUser["email"],
                identificationCard: theUser["identificationCard"],
                address: theData["theCustomer"]["address"],
                phone_number: theData["theCustomer"]["phone_number"],
                subscriptions: theData["theCustomer"]["subscriptions"]
            }
            return customerInfo;

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

            let theCustomers:Customer[] = [];

            theCustomers = await Customer.query();

            for(let userActual of theUsers){

                for(let customerActual of theCustomers){

                    if(customerActual["user_id"] === userActual["_id"]){
                            
                        const customerInfo: CustomerInfo  = {
                            id: customerActual["id"],
                            name: userActual["name"],
                            email: userActual["email"],
                            identificationCard: userActual["identificationCard"],
                            address: customerActual["address"],
                            phone_number: customerActual["phone_number"]
                        };

                        customersInfo.push(customerInfo);       
                    }
                }
            }   
            return customersInfo;
        }
    }

    //Update
    public async update({ params, request }: HttpContextContract) {

            const theCustomer: Customer = await Customer.findOrFail(params.id);
            const body = request.body();
            theCustomer.address = body.address;
            theCustomer.phone_number = body.phone_number;
            theCustomer.user_id = body.users_id;

            return await theCustomer.save();
        }

        //Delete
        public async delete({ params, response }: HttpContextContract) {

            const theCustomer: Customer = await Customer.findOrFail(params.id);
            response.status(204);

            return await theCustomer.delete();
        }
}
