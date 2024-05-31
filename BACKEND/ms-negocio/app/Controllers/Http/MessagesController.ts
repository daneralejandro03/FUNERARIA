import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ExecutionService from 'App/Models/ExecutionService'
import Message from 'App/Models/Message'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import MessageValidator from 'App/Validators/MessageValidator'

export default class MessagesController {
  //Create
  public async store({ request }: HttpContextContract) {
    //const body = await request.body()
    const body = await request.validate(MessageValidator)
    const theMessage: Message = await Message.create(body)
    return theMessage
  }

  //Read
  public async find({ request, params }: HttpContextContract) {
    const theRequest = request.toJSON()
    const token = theRequest.headers.authorization.replace('Bearer ', '')
    let theData = {}

    if (params.id) {
      let theExecutionService: ExecutionService = await ExecutionService.findOrFail(params.id)
      await theExecutionService.load('chat')
      let id = theExecutionService['user_id']

      theData = {
        case: 1,
        token: token,
        id: id,
        theExecutionService: theExecutionService,
      }

      let executionServiceInfo = this.mergeExecutionServiceData(theData)

      return executionServiceInfo
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await ExecutionService.query().paginate(page, perPage)
      } else {
        theData = {
          case: 2,
          token: token,
        }

        let executionServicesInfo = this.mergeExecutionServiceData(theData)

        return executionServicesInfo
      }
    }
  }

  public async mergeExecutionServiceData(theData: {}) {
    let theUsers = []
    let theUser = {}
    let executionServicesInfo: ExecutionServiceInfo[] = []

    interface ExecutionServiceInfo {
      name: string
      email: string
      identificationCard: string
      privileges: string
      responsabilities: string
    }

    if (theData['case'] == 1) {
      try {
        const response = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${theData['id']}`, {
          headers: {
            Authorization: `Bearer ${theData['token']}`,
          },
        })

        theUser = response.data
      } catch (error) {
        console.error('Error al realizar la solicitud GET:', error)
      }

      const executionServiceInfo: ExecutionServiceInfo = {
        name: theUser['name'],
        email: theUser['email'],
        identificationCard: theUser['identificationCard'],
        privileges: theData['theExecutionService']['privileges'],
        responsabilities: theData['theExecutionService']['responsabilities'],
      }
      return executionServiceInfo
    } else if (theData['case'] == 2) {
      try {
        const response = await axios.get(`${Env.get('MS_SECURITY')}/api/users`, {
          headers: {
            Authorization: `Bearer ${theData['token']}`,
          },
        })

        theUsers = response.data
      } catch (error) {
        console.error('Error al realizar la solicitud GET:', error)
      }

      let theExecutionServices: ExecutionService[] = []

      theExecutionServices = await ExecutionService.query()

      for (let userActual of theUsers) {
        for (let executionServiceActual of theExecutionServices) {
          if (executionServiceActual['user_id'] === userActual['_id']) {
            const administrorInfo: ExecutionServiceInfo = {
              name: userActual['name'],
              email: userActual['email'],
              identificationCard: userActual['identificationCard'],
              privileges: executionServiceActual['privileges'],
              responsabilities: executionServiceActual['responsabilities'],
            }

            executionServicesInfo.push(administrorInfo)
          }
        }
      }
      return executionServicesInfo
    }
  }

  //Update
  public async update({ params, request }: HttpContextContract) {
    const theMessage: Message = await Message.findOrFail(params.id)
    const body = request.body()
    theMessage.information = body.information
    theMessage.chat = body.chat_id
    theMessage.user_id = body.user_id

    return await theMessage.save()
  }

  //Delete
  public async delete({ params, response }: HttpContextContract) {
    const theMessage: Message = await Message.findOrFail(params.id)
    response.status(204)

    return await theMessage.delete()
  }
}
