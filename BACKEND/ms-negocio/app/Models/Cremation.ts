import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import WakeRoom from './WakeRoom'
import Service from './Service'

export default class Cremation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public urnType: string

  @column()
  public destinyAshes: string

  @column()
  public hall_id: number

  @column()
  public service_id: number

  @belongsTo(() => WakeRoom, {
    foreignKey: 'wakeRoom_id',
  })
  public WakeRoom: BelongsTo<typeof WakeRoom>

  @belongsTo(() => Service, {
    foreignKey: 'service_id',
  })
  public service: BelongsTo<typeof Service>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
