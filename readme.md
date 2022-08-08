# Remember
Remember is an application that allows users to fetch the most popular repos on GitHub. The intention behind this application is for users to to be able to be to be apart of and study mainstream conversations of tech/software. This application serves over 500,000+ users backed with an incredibly well designed PostgresSQL database + AWS/Terraform features.

# Requirements
- Node v18
- PostgreSQL v14

# Installation

1. Clone the project. Make sure your SSH key is also setup.

```
git clone git@github.com:shiba-sama/remember.git
```

2. Navigate to the folder.

```
cd remember
```

3. Install dependencies.

```
npm i
```

4. Install Git LFS (skip if already done)

```
brew install git-lfs
git lfs install
```

Then download larger files with:

```
git lfs pull
```

# Frontend Workflow

1. Navigate to the folder and start your VSC.

```
code .
```

2. Start frontend server.

```
npm run dev
```

# Backend Workflow

1. Start at project root.

2. Start PostgreSQL server.

3. Idempotently reset the database (skip if desired).

```
npm run reset
```
4. Start backend server.

```
npm run start
```
