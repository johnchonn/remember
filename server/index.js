// —————————————————————————————————————————————————————————————————————————————
// Imports

import fastify from 'fastify'
import * as plugin from "@fastify/static"
import path, { dirname } from "path"
import { fileURLToPath } from "url"

import {
  addWorkspace,
  getAllWorkspaces,
  updateWorkspace,
  removeWorkspace,
  getAllBookmarks,
  addBookmark,
  removeBookmark,
  updateBookmark,
  getWorkspace,
} from "./handler.js"

// —————————————————————————————————————————————————————————————————————————————
// Fastify Configuration

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const host = "0.0.0.0"
const port = 8080
const app = fastify({
  logger: true,
})

const root = path.join(__dirname, "..", "dist")
app.register(plugin, { root, })

// —————————————————————————————————————————————————————————————————————————————
// Workspace API

app.get("/", (__, reply) => reply.sendFile("index.html"))
app.get("/workspaces", getAllWorkspaces)
app.get("/workspaces/update/:from/:to", updateWorkspace)
app.get("/workspaces/delete/:workspace", removeWorkspace)
app.get("/workspaces/add/:workspace", addWorkspace)
app.get("/workspaces/get/:id", getWorkspace)

// —————————————————————————————————————————————————————————————————————————————
// Bookmarks API

app.get("/bookmarks", getAllBookmarks)
app.get("/bookmarks/add/:user/:repo/:workspace?", addBookmark)
app.get("/bookmarks/delete/:user/:repo", removeBookmark)
app.get("/bookmarks/update/:user/:repo/:workspace", updateBookmark)

// —————————————————————————————————————————————————————————————————————————————
// Serve

const start = async () => {
  try {
    await app.listen({
      host,
      port,
    })
  }
  catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()