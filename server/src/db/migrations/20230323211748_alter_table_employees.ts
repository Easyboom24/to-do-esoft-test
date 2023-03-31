import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('users', table => {
        table.setNullable('lead_id');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('users', table => {
        table.dropNullable('lead_id');
    });
}

