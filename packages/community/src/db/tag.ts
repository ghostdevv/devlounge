import { Knex } from 'knex';

export interface TagTable {
    name: string;
    content: string;
    category: string;
}

export default (db: Knex) =>
    db.schema.createTable('tag', (table) => {
        table.string('name', 32).primary();
        table.text('content').notNullable();
        table.text('category').notNullable();
    });
