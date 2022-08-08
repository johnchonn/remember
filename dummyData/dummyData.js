import * as fs from "fs"

// -----------------------------------------------------------------------------
// Environment

const line = "\n"
const tab = "\t"
const tsv_data = fs.readFileSync("../data/data.tsv", "utf-8")

// UTILITY FUNCTIONS -----------------------------------------------------------

function randomNum(num) {
  return Math.floor(1 + Math.random() * num);
}

function randomString(length) {
  let result = '';
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let charsLength = chars.length;

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  return result;
}

// MAIN FUNCTIONS --------------------------------------------------------------

function generateWorkSpaces() {
  let workspaces = [];

  for (let i = 0; i < 49; i++) {
    workspaces.push(randomString(randomNum(51)));
  }

  let noDuplicates = new Set(workspaces);
  let result = Array.from(noDuplicates);

  return result;
}

function generateBookmark(username, repository) {
  return [
    randomNum(50),                 // workspace
    randomString(randomNum(50)),   // name
    username,                      // username
    repository,                    // repo
    randomNum(32767),              // stars
    randomNum(32767),              // forks
    randomNum(32767),              // issuesOpen
    randomNum(32767),              // issuesClosed
    randomString(randomNum(50)),   // created
    randomString(randomNum(50)),   // updated
    randomString(randomNum(50)),   // url
  ]
};

// WRITE FILES -----------------------------------------------------------------

const lines = tsv_data.split(line)

let bookmarks = lines
  .slice(0, 200_000)
  .map(line => {
    const [repo_id, repo_name, user_id, user_name] = line.split(tab)
    return generateBookmark(user_name, repo_name).join(tab)
  })
  .join(line)

fs.writeFile(
  "workspaces.tsv",
  generateWorkSpaces().map(workspace => workspace + line).join(""),
  console.log
);

fs.writeFile(
  "bookmarks.tsv",
  bookmarks,
  console.log
)