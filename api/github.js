const api = "https://api.github.com/graphql"
const token = "YOUR_GITHUB_TOKEN"

const gql_repo = (user, repo) => `{
  repository(owner:"${user}", name:"${repo}") {
    url
    created: createdAt
    updated: updatedAt
    stars: stargazerCount
    forks: forkCount
    open: issues(states:OPEN) { totalCount }
    closed: issues(states:CLOSED) { totalCount }
  }
}`

function queryRepo(user, repo) {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "authorization": "bearer " + token,
    },
    body: JSON.stringify({ query: gql_repo(user, repo) }),
  }

  return fetch(api, options)
    .then(r => r.json())
}

export default queryRepo