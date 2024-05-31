import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany} from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'
import Transmission from './Transmission'
import Incident from './Incident'

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
  public incident_id: number

  @column()
  public service_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Service, {
    foreignKey: 'service_id',
  })
  public service: BelongsTo<typeof Service>

  @belongsTo(() => Incident, {
    foreignKey: 'incident_id',
  })
  public incident: BelongsTo<typeof Incident>

  @hasMany(() => Transmission, {
    foreignKey: 'execution_service_id',
  })
  public transmissions: HasMany<typeof Transmission>
}
