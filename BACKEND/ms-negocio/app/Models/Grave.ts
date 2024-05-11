import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Hall from './Hall'
import Service from './Service'

export default class Grave extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public typeGrave: string

  @column()
  public cementery: string

  @column()
  public hall_id: number

  @column()
  public service_id: number

  @belongsTo(() => Hall, {
    foreignKey: 'hall_id',
  })
  public hall: BelongsTo<typeof Hall>

  @belongsTo(() => Service, {
    foreignKey: 'service_id',
  })
  public service: BelongsTo<typeof Service>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
