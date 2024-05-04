import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from 'App/Models/Employee';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env'

export default class EmployeesController {
    
    //Create
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theEmployee: Employee = await Employee.create(body);
        return theEmployee;
    }


    //Read
    public async find({ request, params }: HttpContextContract) {

        let theRequest = request.toJSON()
        let token = theRequest.headers.authorization.replace("Bearer ", "")
        let theUsers = [];
        let theUser = {};

        interface EmployeeInfo {
            name: string;
            email: string;
            position: string;
            salary: number;
        }

        let respuesta: EmployeeInfo[] = [];

        try {
            const response = await axios.get(`${Env.get('MS_SECURITY')}/api/users`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });

            theUsers = response.data;

          } catch (error) {

            console.error('Error al realizar la solicitud GET:', error);
          }
          

        if (params.id) {
            

            let theEmployee:Employee = await Employee.findOrFail(params.id);
            let id = theEmployee["user_id"];

            try {
                const response = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${id}`, {
                    headers: {
                    Authorization: `Bearer ${token}`
                    }
                });
            
                theUser = response.data;
                    
                } catch (error) {
                    console.error('Error al realizar la solicitud GET:', error);
                }

                let res:EmployeeInfo = {
                    name: theUser["name"],
                    email: theUser["email"],
                    position: theEmployee["position"],
                    salary: theEmployee["salary"]
                }
            return res;
            
        } else {
            
            let theEmployees:Employee[] = [];

            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Employee.query().paginate(page, perPage)
            } else {

                theEmployees = await Employee.query();

                for(let userActual of theUsers){

                    for(let employeActual of theEmployees){

                        if(employeActual["user_id"] === userActual["_id"]){

                            let res: EmployeeInfo  = {
                                name: userActual["name"],
                                email: userActual["email"],
                                position: employeActual["position"],
                                salary: employeActual["salary"]
                            };

                            respuesta.push(res);       
                        }
                    }
                }
                
                return respuesta;
            }

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
