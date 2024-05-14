import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany} from '@ioc:Adonis/Lucid/Orm'
import Message from './Message'
import ExecutionService from './ExecutionService'
export default class Chat extends BaseModel {
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public start_date: DateTime

  @column()
  public state: boolean

  @column()
  public execution_service_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Message, {
    foreignKey : 'chat_id'
  })
  public messages: HasMany<typeof Message>

  @belongsTo(() => ExecutionService, {
    foreignKey: 'execution_service_id'
  })

  public execution_service: BelongsTo<typeof ExecutionService>
}
