import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Transfer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public location: string

  @column()
  public state: string

  @column()
  public departure_time: DateTime

  @column()
  public arrival_time: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
