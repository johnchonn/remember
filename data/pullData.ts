// —————————————————————————————————————————————————————————————————————————————
// Types

interface Repository {
   id: number,
   name: string,
   owner: {
      id: number,
      login: string,
   }
}

interface Data {
   repo_id: number,
   repo_name: string,
   user_id: number,
   user_name: string,
}

interface Github_Headers {
   "x-ratelimit-limit": number,
   "x-ratelimit-remaining": number,
   "x-ratelimit-reset": number,
   "x-ratelimit-used": number,
}

// —————————————————————————————————————————————————————————————————————————————
// Utility

const API = (id: number) => `https://api.github.com/repositories?since=${id}`

function processRepository(R:Repository): Data {
   return {
      repo_id: R.id,
      repo_name: R.name,
      user_id: R.owner.id,
      user_name: R.owner.login,
   }
}

// —————————————————————————————————————————————————————————————————————————————
// Fetch

const api = "https://api.github.com/graphql"
const token = "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"

const options = {
   method: "GET",
   headers: {
     "authorization": "bearer " + token,
   },
}

function fetchRepos(id: number) {
   return fetch(API(id), options)
}

async function * multiFetch(start=1_746_369) {
   let id = start
   let remaining = Infinity
   for (let i = 0; i < 10; i++) {
      const repos = await fetchRepos(id)
      const headers = Object.fromEntries(repos.headers)
      const json = (await repos.json() as Repository[])
         .filter(repo => repo?.owner ?? false)
         .map(processRepository)

      remaining = Number(headers["x-ratelimit-remaining"])
      id = (json.at(-1) as Data).repo_id
      console.log(`id: ${id}. remaining:${remaining}`)
      yield json
   }
}

async function * naturals(max=Infinity) {
   for (let i = 0; i < max; i++) yield i
}

// —————————————————————————————————————————————————————————————————————————————
// Execute

import { DB } from "https://deno.land/x/sqlite/mod.ts"
const db = new DB("./Store.db")

for await (const repos of multiFetch(100)) {
   for (const R of repos) {
      await Deno.writeTextFile(
         "log.tsv",
         `${R.repo_id}\t${R.repo_name}\t${R.user_id}\t${R.user_name}\n`,
         { append: true }
      )
   }
}

db.close()