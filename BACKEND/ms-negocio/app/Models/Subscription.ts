import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Plan from './Plan'
import Customer from './Customer'

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

  @belongsTo(() => Plan, {
    foreignKey: 'plan_id'
  })
  public plan: BelongsTo<typeof Plan>

  @belongsTo(() => Customer, {
    foreignKey: 'customer_id'
  })
  public customer: BelongsTo<typeof Customer>
}
