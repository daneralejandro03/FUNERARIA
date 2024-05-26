import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from 'App/Models/Employee';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env'
import EmployeeValidator from 'App/Validators/EmployeeValidator';

export default class EmployeesController {
      

    //Create
    public async store({ request }: HttpContextContract) {
        const body = await request.validate(EmployeeValidator);
        const theEmployee: Employee = await Employee.create(body);
        return theEmployee;
    }


    //Read
    public async find({ request, params }: HttpContextContract) {

        const theRequest = request.toJSON()
        const token = theRequest.headers.authorization.replace("Bearer ", "")
        let theData = {}
          
        if (params.id) {
            
            let theEmployee:Employee = await Employee.findOrFail(params.id);
            let id = theEmployee["user_id"];
        
            theData = {
                case: 1,
                token: token, 
                id: id,
                theEmployee: theEmployee
            }

            let employeeInfo = this.mergeEmployeeData(theData);

            return employeeInfo;
            
        } else {
            
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Employee.query().paginate(page, perPage)
                
            } else {

                theData = {
                    case: 2,
                    token: token
                };

                let employeesInfo = this.mergeEmployeeData(theData);

                return employeesInfo;
            }
        }

    }

    public async mergeEmployeeData(theData: {}){
        let theUsers = [];
        let theUser = {};
        let employeesInfo: EmployeeInfo[] = [];

        interface EmployeeInfo {
            id: number;
            name: string;
            email: string;
            identificationCard: string;
            position: string;
            salary: number;
            user_id: string;
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
                
            const employeeInfo: EmployeeInfo = {
                id: theData["theEmployee"]["id"],
                name: theUser["name"],
                email: theUser["email"],
                identificationCard: theUser["identificationCard"],
                position: theData["theEmployee"]["position"],
                salary: theData["theEmployee"]["salary"],
                user_id: theUser["_id"]
            }
            return employeeInfo;

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

            let theEmployees:Employee[] = [];

            theEmployees = await Employee.query();

            for(let userActual of theUsers){

                for(let employeActual of theEmployees){

                    if(employeActual["user_id"] === userActual["_id"]){
                            
                        const employeeInfo: EmployeeInfo  = {
                            id: employeActual["id"],
                            name: userActual["name"],
                            email: userActual["email"],
                            identificationCard: userActual["identificationCard"],
                            position: employeActual["position"],
                            salary: employeActual["salary"],
                            user_id: employeActual["user_id"]
                        };

                        employeesInfo.push(employeeInfo);       
                    }
                }
            }   
            return employeesInfo;
        }
    }

    //Update
    public async update({ params, request }: HttpContextContract) {

        const theEmployee: Employee = await Employee.findOrFail(params.id);
        const body = request.body();
        theEmployee.position = body.position
        theEmployee.salary = body.salary;
        theEmployee.user_id = body.user_id;

        return await theEmployee.save();
    }

    //Delete
    public async delete({ params, response }: HttpContextContract) {

        const theEmployee: Employee = await Employee.findOrFail(params.id);
        response.status(204);

        return await theEmployee.delete();
    }
}
