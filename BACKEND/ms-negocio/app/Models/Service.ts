import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ServicePlan from './ServicePlan'
import Cremation from './Cremation'
import Notification from './Notification'
import Transfer from './Transfer'
import Burial from './Burial'
import ExecutionService from './ExecutionService'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: string

  @column.dateTime()
  public start_date: DateTime

  @column.dateTime()
  public end_date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Cremation, {
    foreignKey: 'service_id',
  })
  public cremation: HasMany<typeof Cremation>

  @hasMany(() => Notification, {
    foreignKey: 'service_id',
  })
  public notifications: HasMany<typeof Notification>

  @hasMany(() => Transfer, {
    foreignKey: 'service_id',
  })
  public transfer: HasMany<typeof Transfer>

  @hasMany(() => ServicePlan, {
    foreignKey: 'service_id',
  })
  public servicesplan: HasMany<typeof ServicePlan>

  @hasMany(() => Burial, {
    foreignKey: 'service_id',
  })
  public burials: HasMany<typeof Burial>

  @hasMany(() => ExecutionService, {
    foreignKey: 'service_id',
  })
  public execution_services: HasMany<typeof ExecutionService>
}
