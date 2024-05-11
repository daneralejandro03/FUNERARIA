import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ServicePlan from './ServicePlan'
import Grave from './Grave'
import Cremation from './Cremation'
import Notification from './Notification'
import Transfer from './Transfer'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: string

  @column()
  public start_date: DateTime

  @column()
  public end_date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Grave, {
    foreignKey: 'service_id',
  })
  public grave: HasMany<typeof Grave>

  @hasMany(() => Cremation, {
    foreignKey: 'service_id',
  })
  public cremation: HasMany<typeof Cremation>

  @hasMany(() => Notification, {
    foreignKey: 'service_id',
  })
  public notification: HasMany<typeof Notification>

  @hasMany(() => Transfer, {
    foreignKey: 'service_id',
  })
  public transfer: HasMany<typeof Transfer>

  @hasMany(() => ServicePlan, {
    foreignKey: 'service_id',
  })
  public servicesplan: HasMany<typeof ServicePlan>
}
