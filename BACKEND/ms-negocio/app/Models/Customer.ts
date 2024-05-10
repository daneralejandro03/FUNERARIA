import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Owner from './Owner'
import Beneficiary from './Beneficiary'

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
}
