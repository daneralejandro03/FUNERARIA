import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Camera from './Camera'
import ExecutionService from './ExecutionService'

export default class Transmission extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public start_date: DateTime

  @column()
  public end_date: DateTime

  @column()
  public camera_id: number

  @column()
  public execution_service_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Camera, { foreignKey: 'camera_id' })
  public camera: BelongsTo<typeof Camera>

  @belongsTo(() => ExecutionService, { foreignKey: 'execution_service_id' })
  public execution_service: BelongsTo<typeof ExecutionService>
}
