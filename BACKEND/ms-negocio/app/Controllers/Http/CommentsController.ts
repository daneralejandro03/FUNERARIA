import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'

export default class CommentsController {
  //Create
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const theComment: Comment = await Comment.create(body)
    return theComment
  }

  //Read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Comment.findOrFail(params.id)
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

    return await theComment.save()
  }

  //Delete
  public async delete({ params, response }: HttpContextContract) {
    const theComment: Comment = await Comment.findOrFail(params.id)
    response.status(204)

    return await theComment.delete()
  }
}
