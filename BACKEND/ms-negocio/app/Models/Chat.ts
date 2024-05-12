import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany} from '@ioc:Adonis/Lucid/Orm'
import Message from './Message'
export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public start_date: DateTime

  @column()
  public state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Message, {
    foreignKey : 'chat_id'
  })
  public messages: HasMany<typeof Message>
}
