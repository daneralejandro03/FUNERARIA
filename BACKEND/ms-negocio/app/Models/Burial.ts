import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import WakeRoom from './WakeRoom'
import Service from './Service'

export default class Burial extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public location: string

  @column()
  public cementery: string

  @column()
  public burial_type: string

  @column()
  public wake_room_id: number

  @column()
  public service_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => WakeRoom, {
    foreignKey: 'wake_room_id',
  })
  public wakeRoom: BelongsTo<typeof WakeRoom>

  @belongsTo(() => Service, {
    foreignKey: 'service_id',
  })
  public service: BelongsTo<typeof Service>
}
