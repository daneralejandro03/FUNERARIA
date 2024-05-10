import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'
import Beneficiary from './Beneficiary'

export default class Owner extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public contract_status: string

  @column()
  public customer_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Customer, { foreignKey: 'customer_id' })

  public customer: BelongsTo<typeof Customer>

  @hasMany(() => Beneficiary,{
    foreignKey: 'owner_id'
  })

  public beneficiaries: HasMany<typeof Beneficiary>
}
