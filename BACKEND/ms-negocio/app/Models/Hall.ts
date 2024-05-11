import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Site from './Site'
import Grave from './Grave'
import Cremation from './Cremation'

export default class Hall extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public capacity: number

  @column()
  public availability: boolean

  @column()
  public site_id: number

  @belongsTo(() => Site, {
    foreignKey: 'site_id',
  })
  public site: BelongsTo<typeof Site>

  @hasMany(() => Grave, {
    foreignKey: 'hall_id',
  })
  public grave: HasMany<typeof Grave>

  @hasMany(() => Cremation, {
    foreignKey: 'hall_id',
  })
  public cremation: HasMany<typeof Cremation>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
