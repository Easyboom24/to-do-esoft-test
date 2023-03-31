import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config({ path: `${__dirname}/../../.env` });
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {

  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      charset: 'utf8',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};

export default config;
