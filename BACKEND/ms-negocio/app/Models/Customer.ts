import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Owner from './Owner'
import Beneficiary from './Beneficiary'
import Subscription from './Subscription'
import Report from './Report'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public address: string

  @column()
  public phone_number: string

  @column()
  public user_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Owner,{
    foreignKey: 'customer_id'
  })

  public owners: HasMany<typeof Owner>

  @hasMany(() => Beneficiary,{
    foreignKey: 'customer_id'
  })

  public beneficiaries: HasMany<typeof Beneficiary>

  @hasMany(() => Subscription,{
    foreignKey: 'customer_id'
  })

  public subscriptions: HasMany<typeof Subscription>

  @hasMany(() => Report, {
    foreignKey: 'customer_id',
  })
  public reports: HasMany<typeof Report>
}
