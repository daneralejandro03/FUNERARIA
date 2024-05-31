import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'
import Incident from './Incident'

export default class Report extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public reporting_date: DateTime

  @column()
  public description: string

  @column()
  public state: boolean

  @column()
  public customer_id: number

  @column()
  public incident_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Customer, { foreignKey: 'customer_id' })

  public customer: BelongsTo<typeof Customer>

  @belongsTo(() => Incident, { foreignKey: 'incident_id' })
  
  public incident: BelongsTo<typeof Incident>
}
