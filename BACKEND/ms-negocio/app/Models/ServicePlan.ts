import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'
import Plan from './Plan'

export default class ServicePlan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public statusHiring: boolean

  @column()
  public dateHiring: DateTime

  @column()
  public dateExpiration: DateTime

  @column()
  public service_id: number

  @column()
  public plan_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Service, { foreignKey: 'service_id' })
  public service: BelongsTo<typeof Service>

  @belongsTo(() => Plan, { foreignKey: 'plan_id' })
  public plan: BelongsTo<typeof Plan>
}
