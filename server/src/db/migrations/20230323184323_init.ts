import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('firstname',255).notNullable();
        table.string('surname',255).notNullable();
        table.string('patronymic',255);
        table.string('login',50).notNullable().unique();
        table.text('password').notNullable();
        table.bigInteger('lead_id').notNullable();
        table.foreign('lead_id').references('users.id').withKeyName('fk_fkey_users');
        table.timestamps(true, true);
    })
    .createTable('prorities', table => {
        table.increments('id').primary();
        table.string('priority_name',40).notNullable();
        table.timestamps(true, true);
    })
    .createTable('statuses', table => {
        table.increments('id').primary();
        table.string('status_name',40).notNullable();
        table.timestamps(true, true);
    })
    .createTable('tasks', table => {
        table.increments('id').primary();
        table.text('header').notNullable();
        table.text('description').notNullable();
        table.timestamp('date_end').notNullable();
        table.timestamps(true, true);
        table.bigInteger('creator_id').notNullable();
        table.bigInteger('responsible_id').notNullable();
        table.bigInteger('priority_id').notNullable();
        table.bigInteger('status_id').notNullable();
        table.foreign('creator_id').references('users.id').withKeyName('fk_fkey_creator');
        table.foreign('responsible_id').references('users.id').withKeyName('fk_fkey_responsible');
        table.foreign('priority_id').references('priorities.id').withKeyName('fk_fkey_priority');
        table.foreign('status_id').references('statuses.id').withKeyName('fk_fkey_status');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTable('users')
    .dropTable('tasks')
    .dropTable('priorities')
    .dropTable('statuses');
}

