DROP SCHEMA IF EXISTS remember CASCADE;
CREATE SCHEMA remember;
SET search_path TO remember;

-- —————————————————————————————————————————————————————————————————————————————
-- Tables

CREATE TABLE workspaces (
  id    SERIAL       PRIMARY KEY,
  name  VARCHAR(50)  UNIQUE NOT NULL
);

CREATE TABLE bookmarks (
  id            SERIAL,
  workspace     INT DEFAULT 1,
  name          VARCHAR(50),
  userName      VARCHAR(40) NOT NULL,
  repo          VARCHAR(250) NOT NULL,
  stars         SMALLINT,
  forks         SMALLINT,
  issuesOpen    SMALLINT,
  issuesClosed  SMALLINT,
  tags          VARCHAR(50)[],
  created       VARCHAR(50),
  updated       VARCHAR(50),
  url           VARCHAR(2048),

  PRIMARY KEY (id),
  FOREIGN KEY (workspace) REFERENCES workspaces (id) ON DELETE SET DEFAULT,
  UNIQUE (userName, repo)
);

-- create the default value for workspace
INSERT into workspaces (name) VALUES ('inbox');

-- protect the default value for workspace
CREATE OR REPLACE FUNCTION boom() RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'can''t delete workspace with id 1';
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER protect_default_workspace
  BEFORE UPDATE OF name OR DELETE ON workspaces
  FOR EACH ROW
  WHEN (OLD.id = 1)
  EXECUTE FUNCTION boom()
;

-- —————————————————————————————————————————————————————————————————————————————
-- Indices

CREATE INDEX idx_bookmarks ON bookmarks (userName, repo);
CREATE INDEX idx_bookmarks_name ON bookmarks (name);
CREATE INDEX idx_bookmarks_stars ON bookmarks (stars);
CREATE INDEX idx_bookmarks_forks ON bookmarks (forks);
CREATE INDEX idx_bookmarks_issues_open ON bookmarks (issuesOpen);
CREATE INDEX idx_bookmarks_issues_closed ON bookmarks (issuesClosed);
