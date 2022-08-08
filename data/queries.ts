import { DB } from "https://deno.land/x/sqlite/mod.ts"

const db = new DB("./Store.db")

db.query(`
   INSERT into Repositories (repo_id, repo_name, user_id, user_name)
   VALUES
`)