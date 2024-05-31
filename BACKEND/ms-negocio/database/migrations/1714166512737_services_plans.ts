import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'service_plans'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('status_hiring')
      table.timestamp('date_hiring')
      table.timestamp('date_expiration')
      table.integer('service_id').unsigned().references('services.id')
      table.integer('plan_id').unsigned().references('plans.id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
