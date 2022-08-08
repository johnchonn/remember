import express from "express"
import morgan from "morgan"
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
} from "./controllers.js"

// —————————————————————————————————————————————————————————————————————————————
// Express Configuration

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PORT = 8080
const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "..", "dist")))

// —————————————————————————————————————————————————————————————————————————————
// Workspace API

app.get("/", (__, res) => res.send("Hi."))
app.get("/workspaces", getAllWorkspaces)
app.get("/workspaces/update/:from/:to", updateWorkspace)
app.get("/workspaces/delete/:workspace", removeWorkspace)
app.get("/workspaces/get/:id", getWorkspace)

// —————————————————————————————————————————————————————————————————————————————
// Bookmarks API

app.get("/bookmarks", getAllBookmarks)
app.get("/bookmarks/add/:username/:repository/:workspace?", addBookmark)
app.get("/bookmarks/delete/:username/:repository", removeBookmark)
app.get("/bookmarks/update/:username/:repository/:workspace", updateBookmark)

// —————————————————————————————————————————————————————————————————————————————
// Serve

app.listen(PORT, () => {
  console.log(`Server listening at port:${PORT}`)
  console.log(`psql_host: ${process.env.psql_host}`)
});
