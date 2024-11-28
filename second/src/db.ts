import dotenv from "dotenv"
import pg from "pg"

dotenv.config()

const port = parseInt(process.env.DATABASE_PORT ?? '5432');

const pool = new pg.Pool({
    host: process.env.DATABASE_HOST,
    port: port,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
});

export default pool