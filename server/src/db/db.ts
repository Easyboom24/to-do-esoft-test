import knex from "knex";
import knexfile from "./knexfile";
import dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/../../.env` });

export const db = knex(knexfile.development);

