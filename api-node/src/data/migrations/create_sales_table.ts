import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary();

    table.integer('cd_produto').notNullable();
    table.string('tp_valor', 1).notNullable();
    table.integer('cd_empresa').notNullable();
    table.decimal('round', 10, 2).notNullable();
    table.string('nr_dctoorigem').notNullable();
    table.integer('nr_sequencia').notNullable();
    table.integer('cd_valor').notNullable();
    table.integer('cd_historico').notNullable();
    table.string('in_estorno', 1).notNullable();
    table.timestamp('dt_movimento').notNullable();
    table.timestamp('dt_cadastro').notNullable();

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('transactions');
}
