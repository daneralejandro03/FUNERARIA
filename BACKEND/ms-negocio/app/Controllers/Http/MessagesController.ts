import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Incident from 'App/Models/Incident'
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
    const token = theRequest.headers.authorization?.replace('Bearer ', '') || '';
    let theData = {}

    if (params.id) {
      let theIncident: Incident = await Incident.findOrFail(params.id)
      await theIncident.load('chat')
      let id = theIncident['user_id']

      theData = {
        case: 1,
        token: token,
        id: id,
        theIncident: theIncident,
      }

      let incidentInfo = this.mergeIncidentData(theData)

      return incidentInfo
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Incident.query().paginate(page, perPage)
      } else {
        theData = {
          case: 2,
          token: token,
        }

        let incidentInfo = this.mergeIncidentData(theData)

        return incidentInfo
      }
    }
  }

  public async mergeIncidentData(theData: {}) {
    let theUsers = []
    let theUser = {}
    let incidentInfo: IncidentInfo[] = []

    interface IncidentInfo {
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

      const incidentInfo: IncidentInfo = {
        name: theUser['name'],
        email: theUser['email'],
        identificationCard: theUser['identificationCard'],
        privileges: theData['theIncident']['privileges'],
        responsabilities: theData['theIncident']['responsabilities'],
      }
      return incidentInfo
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

      let theIncidents: Incident[] = []

      theIncidents = await Incident.query()

      for (let userActual of theUsers) {
        for (let incidentActual of theIncidents) {
          if (incidentActual['user_id'] === userActual['_id']) {
            const administrorInfo: IncidentInfo = {
              name: userActual['name'],
              email: userActual['email'],
              identificationCard: userActual['identificationCard'],
              privileges: incidentActual['privileges'],
              responsabilities: incidentActual['responsabilities'],
            }

            incidentInfo.push(administrorInfo)
          }
        }
      }
      return incidentInfo
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
