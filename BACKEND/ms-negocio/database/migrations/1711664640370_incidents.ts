import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'incidents'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('date_decease')
      table.string('place_decease')
      table.string('cause_decease')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
