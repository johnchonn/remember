type Bookmark = {
   name: string
   user: string
   repo: string
   stars: number
   forks: number
   issues: {
      open: number
      closed: number
   }
   created: string
   updated: string
   url: string
   workspace: string
}

interface State {
   workspaces: string[]
   view: string
   bookmarks: Bookmark[]
}