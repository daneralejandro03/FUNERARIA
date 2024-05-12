import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'subscriptions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('subscription_type')
      table.dateTime('start_date')
      table.dateTime('end_date')
      table.boolean('state')
      table.integer('plan_id').unsigned().references('plan.id')
      table.integer('customer_id').unsigned().references('customer.id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
