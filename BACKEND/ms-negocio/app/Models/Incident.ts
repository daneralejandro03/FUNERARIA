import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Comment from './Comment'
import Chat from './Chat'
import ExecutionService from './ExecutionService'
import Report from './Report'

export default class Incident extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public date_decease: DateTime

  @column()
  public place_decease: string

  @column()
  public cause_decease: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Comment, {
    foreignKey: 'incident_id'
  })

  public comments: HasMany<typeof Comment>

  @hasOne(() => Chat, {
    foreignKey: 'incident_id'
  })

  public chat: HasOne<typeof Chat>

  @hasMany(() => ExecutionService, {
    foreignKey: 'incident_id'
  })

  public execution_services: HasMany<typeof ExecutionService>

  @hasMany(() => Report, {
    foreignKey: 'incident_id'
  })

  public reports: HasMany<typeof Report>
}
