import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
//import CommentValidator from 'App/Validators/CommentValidator';

export default class CommentsController {
  //Create
  public async store({ request }: HttpContextContract) {
    //const body = await request.validate(CommentValidator);
    const body = request.body();
    const theComment: Comment = await Comment.create(body);
    return theComment;
  }

  //Read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theComment:Comment = await Comment.findOrFail(params.id);
      await theComment.load("execution_service")
      return theComment;
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Comment.query().paginate(page, perPage)
      } else {
        return await Comment.query()
      }
    }
  }

  //Update
  public async update({ params, request }: HttpContextContract) {
    const theComment: Comment = await Comment.findOrFail(params.id)
    const body = request.body()
    theComment.message = body.message
    theComment.send_date = body.send_date
    theComment.execution_service_id = body.execution_service_id
    return await theComment.save()
  }

  //Delete
  public async delete({ params, response }: HttpContextContract) {
    const theComment: Comment = await Comment.findOrFail(params.id)
    response.status(204)

    return await theComment.delete()
  }
}
