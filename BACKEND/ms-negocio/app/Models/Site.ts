import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import WakeRoom from './WakeRoom'

export default class Site extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public location: string

  @column()
  public email: string

  @column()
  public department_name: string

  @column()
  public city_name: string

  @column()
  public department_id: number

  @column()
  public city_id: number

  @hasMany(() => WakeRoom, {
    foreignKey: 'site_id',
  })
  public wakeRoom: HasMany<typeof WakeRoom>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
