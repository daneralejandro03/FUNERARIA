import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Camera from 'App/Models/Camera';
import CameraValidator from 'App/Validators/CameraValidator';

export default class CamerasController {
     //Create
  public async store({ request }: HttpContextContract) {
    const body = await request.validate(CameraValidator);
    //const body = request.body();
    const theCamera: Camera = await Camera.create(body);
    return theCamera;
  }

  //Read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const theCamera = await Camera.findOrFail(params.id);
      return theCamera;
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Camera.query().paginate(page, perPage)
      } else {
        return await Camera.query()
      }
    }
  }
}
