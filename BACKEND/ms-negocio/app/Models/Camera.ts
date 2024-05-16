import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Transmission from './Transmission';

export default class Camera extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public high: number;

  @column()
  public width: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Transmission, {
    foreignKey: 'camera_id',
  })
  public transmissions: HasMany<typeof Transmission>
}
