import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany} from '@ioc:Adonis/Lucid/Orm'
import Message from './Message'
import Incident from './Incident'
export default class Chat extends BaseModel {
  
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public start_date: DateTime

  @column()
  public state: boolean

  @column()
  public incident_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Message, {
    foreignKey : 'chat_id'
  })
  public messages: HasMany<typeof Message>

  @belongsTo(() => Incident, {
    foreignKey: 'incident_id'
  })

  public incident: BelongsTo<typeof Incident>
}
