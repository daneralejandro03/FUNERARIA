import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from 'App/Models/Employee';

export default class EmployeesController {
    //Create
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theEmployee: Employee = await Employee.create(body);
        return theEmployee;
    }


    //Read
    public async find({ request, params }: HttpContextContract) {

        if (params.id) {
            return await Employee.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Employee.query().paginate(page, perPage)
            } else {
                return await Employee.query()
            }

        }

    }

    //Update
    public async update({ params, request }: HttpContextContract) {

        const theEmployee: Employee = await Employee.findOrFail(params.id);
        const body = request.body();
        theEmployee.position = body.position
        theEmployee.salary = body.salary;
        theEmployee.users_id = body.users_id;

        return await theEmployee.save();
    }

    //Delete
    public async delete({ params, response }: HttpContextContract) {

        const theEmployee: Employee = await Employee.findOrFail(params.id);
        response.status(204);

        return await theEmployee.delete();
    }
}
