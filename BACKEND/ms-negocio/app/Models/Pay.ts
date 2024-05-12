import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Subscription from './Subscription'

export default class Pay extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public pay_day: DateTime

  @column()
  public amount: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Subscription, {
    foreignKey: 'subscription_id'
  })

  public subscription: BelongsTo<typeof Subscription>
}
