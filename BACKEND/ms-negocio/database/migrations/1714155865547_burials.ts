import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'burials'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('location')
      table.string('burial_type')
      table.dateTime('burial_date')
      table.integer('wakeRoom_id').unsigned().references('wakeRoom.id')
      table.integer('service_id').unsigned().references('services.id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
