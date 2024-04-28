import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Subscription extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public subscription_type: string

  @column()
  public startDate: DateTime

  @column()
  public endDate: DateTime

  @column()
  public state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
