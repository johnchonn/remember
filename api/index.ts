class API {
   static root = `/`
   static getWorkspaces = `/workspaces`
   static getBookmarks = `/bookmarks`
   static addWorkspace = (workspace:string) => `/workspaces/add/${workspace}`
   static deleteWorkspace = (workspace:string) => `/workspaces/delete/${workspace}`
   static addBookmark = (username:string, repository:string, workspace?:string) => 
      `/bookmarks/add/${username}/${repository}/${workspace ?? ""}`
   static deleteBookmark = (username:string, repository:string) =>
      `/bookmarks/delete/${username}/${repository}`
   static updateBookmark = (username:string, repository:string, workspace:string) =>
      `/bookmarks/update/${username}/${repository}/${workspace}`
}

export default API