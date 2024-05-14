import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import ExecutionService from './ExecutionService'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public message: String

  @column()
  public send_date: DateTime

  @column()
  public execution_service_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => ExecutionService, {
    foreignKey: 'execution_service_id'
  })

  public execution_service: BelongsTo<typeof ExecutionService>
}
