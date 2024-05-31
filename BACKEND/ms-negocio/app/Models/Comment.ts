import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Incident from './Incident'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public message: String

  @column.dateTime()
  public send_date: DateTime

  @column()
  public incident_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Incident, {
    foreignKey: 'incident_id'
  })

  public incident: BelongsTo<typeof Incident>
}
