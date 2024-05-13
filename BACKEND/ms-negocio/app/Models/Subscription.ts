import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Plan from './Plan'
import Customer from './Customer'
import Pay from './Pay'

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

  @column()
  public plan_id: number

  @column()
  public customer_id: number

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

  @hasMany(() => Pay, {
    foreignKey : 'pay_id'
  })

  public pays: HasMany<typeof Pay>
}
