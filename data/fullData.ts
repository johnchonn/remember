import { readLines } from 'https://deno.land/std/io/mod.ts'
import queryRepo from '../api/github.js'

const lines = await Deno.open("data.tsv")

for await (const line of readLines(lines)) {
   const [repo_id, repo_name, user_id, user_name] = line.split("\t")
   const response = queryRepo(user_name, repo_name)

   Deno.writeTextFile()
}
