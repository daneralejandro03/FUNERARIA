import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, HasOne, belongsTo, column, hasMany, hasOne
        } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'
import Comment from './Comment'
import Chat from './Chat'
import Customer from './Customer'

export default class ExecutionService extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public cost: number

  @column()
  public duration: DateTime

  @column()
  public state: boolean

  @column()
  public customer_id: number

  @column()
  public service_id: number

  @column()
  public chat_id: number

  @column()
  public comment_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Service, {
    foreignKey: 'service_id',
  })
  public service: BelongsTo<typeof Service>

  @belongsTo(() => Customer, {
    foreignKey: 'customer_id',
  })
  public customer: BelongsTo<typeof Customer>

  @hasMany(() => Comment, {
    foreignKey: 'executionService_id',
  })
  public comments: HasMany<typeof Comment>

  @hasOne(() => Chat, {
    foreignKey: 'executionService_id',
  })
  public chat: HasOne<typeof Chat>
}
