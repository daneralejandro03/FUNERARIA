import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany, BelongsTo, belongsTo} from '@ioc:Adonis/Lucid/Orm'
import Site from './Site'
import Cremation from './Cremation'
import Burial from './Burial'

export default class WakeRoom extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public capacity: number

  @column()
  public availability: boolean

  @column()
  public sites_id: number

  @column()
  public cremation_id: number

  @column()
  public burial_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Site, {
    foreignKey: 'site_id',
  })
  public site: BelongsTo<typeof Site>

  @hasMany(() => Burial, {
    foreignKey: 'wakeRoom_id',
  })
  public burial: HasMany<typeof Burial>

  @hasMany(() => Cremation, {
    foreignKey: 'wakeRoom_id',
  })
  public cremation: HasMany<typeof Cremation>
}
