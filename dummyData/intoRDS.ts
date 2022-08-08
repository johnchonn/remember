import { readLines } from "https://deno.land/std/io/mod.ts";
import { Client } from "https://deno.land/x/postgres/mod.ts";

// —————————————————————————————————————————————————————————————————————————————
// Parameters

const hostname = Deno.env.get("psql_host") ?? "localhost"
const port = 5432

const client = new Client({
  hostname,
  port,
  user: "postgres",
  password: "postgres",
  database: "postgres",
});

const bookmarks = readLines(await Deno.open("bookmarks.tsv"))
const workspaces = readLines(await Deno.open("workspaces.tsv"))

// —————————————————————————————————————————————————————————————————————————————
// Execute Query

await client.connect()

for await (const workspace of workspaces) {
   client.queryObject(`
      INSERT INTO remember.workspaces (name)
         VALUES ('${workspace}')
      ;
   `)
}

// for await (const line of bookmarks) {
//    client.queryObject(`
//       INSERT INTO remember.bookmarks (
//          workspace,
//          name,
//          userName,
//          repo,
//          stars,
//          forks,
//          issuesOpen,
//          issuesClosed,
//          created,
//          updated,
//          url
//       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`, 
//       ...line.split("\t")
//    )
// }

client.end()