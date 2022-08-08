import database from '../database/pool.js'
import queryRepo from '../api/github.js'

// —————————————————————————————————————————————————————————————————————————————
// Workspace API

function queryDB(sql, response) {
  return database
    .query(sql)
    .then(result => response.send(JSON.stringify(result.rows)))
    .catch(error => response.send(JSON.stringify(error.stack)))
}

export function getWorkspace(request, reply) {
  const { id } = request.params
  const sql = `SELECT * FROM workspaces WHERE id=${id}`
  database
    .query(sql)
    .then(results => reply.send(JSON.stringify(results.rows)))
    .catch(err => reply.send(JSON.stringify(err.stack)))
}

export function addWorkspace(request, reply) {
  const { workspace } = request.params
  const sql = `
    INSERT INTO workspaces (name)
      VALUES ('${workspace}')
      ON CONFLICT (name) DO NOTHING
      RETURNING *
    ;`
  database
    .query(sql)
    .then(results => reply.send(JSON.stringify(results.rows)))
    .catch(err => reply.send(JSON.stringify(err.stack)))
}

export function getAllWorkspaces(__, reply) {
  database
    .query(`SELECT * FROM workspaces`)
    .then(results => reply.send(JSON.stringify(results.rows)))
    .catch(err => reply.send(JSON.stringify(err.stack)))
}

export function updateWorkspace(request, reply) {
  const { from, to } = request.params
  const sql = `UPDATE workspaces SET name='${to}' WHERE name='${from}';`
  database
    .query(sql, params)
    .then(results => reply.send(JSON.stringify(results.rows)))
    .catch(err => reply.send(JSON.stringify(err.stack)))
}

export function removeWorkspace(request, reply) {
  const { workspace } = request.params;
  const sql = `DELETE FROM workspaces WHERE name='${workspace}' RETURNING *;`
  database
    .query(sql)
    .then(results => reply.send(JSON.stringify(results.rows)))
    .catch(err => reply.send(JSON.stringify(err.stack)))
}

// —————————————————————————————————————————————————————————————————————————————
// Bookmarks API

export function getAllBookmarks(__, reply) {
  const sql = `SELECT * FROM bookmarks`;
  database
    .query(sql)
    .then(results => reply.send(JSON.stringify(results.rows)))
    .catch(err => reply.send(JSON.stringify(err.stack)))
}

export async function addBookmark(request, reply) {
  const { user, repo, workspace } = request.params
  console.log(user, repo)
  const raw = await queryRepo(user, repo)
    .catch(err => (reply.send(`Github fetch failure: ${err}`), false))
  if (raw === false) return

  const D = raw.data.repository
  const sql = workspace
  ? `
    INSERT INTO bookmarks (workspace, userName, repo, stars, forks, issuesOpen, issuesClosed, created, updated, url)
      VALUES ('${workspace}', '${user}', '${repo}', ${D.stars}, ${D.forks}, ${D.open.totalCount}, ${D.closed.totalCount}, '${D.created}', '${D.updated}', '${D.url}')
    ;`
  : `
    INSERT INTO bookmarks (userName, repo, stars, forks, issuesOpen, issuesClosed, created, updated, url)
      VALUES ('${user}', '${repo}', ${D.stars}, ${D.forks}, ${D.open.totalCount}, ${D.closed.totalCount}, '${D.created}', '${D.updated}', '${D.url}')
      ON CONFLICT (userName, repo) DO NOTHING
      RETURNING *
    ;`
  database
    .query(sql)
    .then(result => reply.send(JSON.stringify(result.rows)))
    .catch(err => reply.send(JSON.stringify(err.stack)))
}

export function removeBookmark(request, reply) {
  const { user, repo } = request.params;
  const sql = `
    DELETE FROM bookmarks
      WHERE userName='${user}' AND repo='${repo}'
      RETURNING (userName, repo)
    ;
  `
  database
    .query(sql)
    .then(result => reply.send(JSON.stringify(result.rows)))
    .catch(err => reply.send(JSON.stringify(err.stack)))
}

export function updateBookmark(request, reply) {
  const { user, repo, workspace } = request.params
  const sql = `
    WITH workspace_id AS (SELECT id FROM workspaces WHERE name='${workspace}')
    UPDATE bookmarks SET workspace=workspace_id
      WHERE userName='${user}' AND repo='${repo}'
    ;
  `
  database
    .query(sql)
    .then(result => reply.send(JSON.stringify(result.rows)))
    .catch(err => reply.send(JSON.stringify(err.stack)))
}
