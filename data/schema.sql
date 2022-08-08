CREATE TABLE IF NOT EXISTS [Repositories] (
   [repo_id]    INTEGER PRIMARY KEY,  -- repository id
   [repo_name]  VARCHAR(100),         -- repository name
   [user_id]    INTEGER,              -- user id
   [user_name]  VARCHAR(40)           -- username
);

CREATE INDEX IF NOT EXISTS idx_repo_user  ON [Repositories] (user_name, repo_name);
CREATE INDEX IF NOT EXISTS idx_repo_names ON [Repositories] (repo_name);
