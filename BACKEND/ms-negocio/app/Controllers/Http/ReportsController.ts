import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Report from 'App/Models/Report';
import ReportValidator from 'App/Validators/ReportValidator';

export default class ReportsController {
    public async store({ request }: HttpContextContract) {
        const body = await request.validate(ReportValidator);
        const theReport: Report = await Report.create(body);
        return theReport;
      }
    
      //Read
      public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          let theReport: Report = await Report.findOrFail(params.id);

          return theReport;
        } else {
          const data = request.all()
          if ('page' in data && 'per_page' in data) {
            const page = request.input('page', 1)
            const perPage = request.input('per_page', 20)
            return await Report.query().paginate(page, perPage)
          } else {
            return await Report.query()
          }
        }
      }
    
      //Update
      public async update({ params, request }: HttpContextContract) {
        const theReport: Report = await Report.findOrFail(params.id)
        const body = request.body()
        theReport.reporting_date = body.reporting_date
        theReport.description = body.description
        theReport.state = body.state
        theReport.customer_id = body.customer_id
        theReport.incident_id = body.incident_id
    
        return await theReport.save()
      }
    
      //Delete
      public async delete({ params, response }: HttpContextContract) {
        const theReport: Report = await Report.findOrFail(params.id)
    
        response.status(204)
        return await theReport.delete()
      }
}
