import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'investimentos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('tipo')
      table.decimal('valor', 12, 2)

      table
        .integer('conta_id')
        .unsigned()
        .references('id')
        .inTable('contas')
        .onDelete('CASCADE')

      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}