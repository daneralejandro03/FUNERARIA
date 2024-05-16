import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tranmission from 'App/Models/Transmission'
import TransmissionValidator from 'App/Validators/TransmissionValidator';
import ExecutionServicesController from './ExecutionServicesController';
import ExecutionService from 'App/Models/ExecutionService';
import CustomersController from './CustomersController';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env'

export default class TransmissionsController {

    private readonly executionServicesController: ExecutionServicesController;
    private readonly customerController: CustomersController;

    constructor() {
        this.executionServicesController = new ExecutionServicesController();
        this.customerController = new CustomersController();
    }

    //Create
    public async store({ request }: HttpContextContract) {
        const body = await request.validate(TransmissionValidator);
        //const body = request.body();
        //const theTransmission: Tranmission = await Tranmission.create(body);
        //console.log(body);
        
        const executionService = await this.executionServicesController.find2(body.execution_service_id);
        const customerId = executionService.$attributes.customer_id;
        //console.log(customerId);
        
        let token = "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjp7Il9pZCI6IjY1ZTA5NGE3OWQ5ZjM1MGJiY2E0OGFkOSIsIm5hbWUiOiJBZG1pbmlzdHJhZG9yIiwiZGVzY3JpcHRpb24iOiJFc3RhIGVzIHVuYSBkZXNjcmlwY2nDs24ifSwiaWRlbnRpZmljYXRpb25DYXJkIjoiMTA1Mzg2OTY0OSIsIm5hbWUiOiJKYWltZSBBbmRyw6lzIENhcmRvbmEiLCJfaWQiOiI2NWY3YTdjYmU3YmQ3YjViYTU4NTQxNzUiLCJlbWFpbCI6ImphY2Q5OUBob3RtYWlsLmNvbSIsInN1YiI6IkphaW1lIEFuZHLDqXMgQ2FyZG9uYSIsImlhdCI6MTcxNTg2OTkxMCwiZXhwIjoxNzE1ODczNTEwfQ.f7a8xwQVI8bxTntHdOxz8dAjR1BparEAbnn94vMFCWsjD14LkJL3S5KbcbHiFdY3thUbWwwjPWn5Fvucv1kUog"

        const user = await this.customerController.find2(customerId, token);
        
        let user_id = ""

        if(user != null){
            user_id = user['user_id']
            console.log(user_id);
            
        }

        const response = await axios.post(`${Env.get('MS_SECURITY')}/api/users/actualizarFidelidadUsuario/user_id${user_id}`, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        });

        


        //return theTransmission;
    }


    public async someMethod({ request, response, params }: HttpContextContract) {
        if (params.executionServiceId) { // Asegúrate de tener el parámetro correcto para el id del ExecutionService
            // Llama al método find del ExecutionServicesController
            const executionService = await this.executionServicesController.find({});
            return response.status(200).json(executionService);
        } else {
            // Otro manejo si no se proporciona el id
            return response.status(400).json({ error: 'ID de ExecutionService no proporcionado' });
        }
    }

    //Read
    public async find({ request, params }: HttpContextContract) {

        if (params.id) {
            let theTransmission: Tranmission = await Tranmission.findOrFail(params.id)
            return theTransmission
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Tranmission.query().paginate(page, perPage)
            } else {
                return await Tranmission.query()
            }
        }
    }
}
