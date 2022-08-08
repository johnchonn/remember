import { DB } from "https://deno.land/x/sqlite/mod.ts"

const db = new DB("./Store.db")
const schema = await Deno.readTextFile("./schema.sql")

db.query(schema)
