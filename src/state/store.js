import create from 'zustand'
import data from './data'

const store = create(set => ({
   workspaces: ["INBOX", "PROJECTS", "HOMEWORK"],
   view: "INBOX",
   bookmarks: data.bookmarks,

   addSpace: (workspace) => set(state => ({
      workspaces: [...state.workspaces, workspace],
      view: workspace,
   })),

   deleteSpace: (workspace) => set(state => ({
      workspaces: state.workspaces.filter(w => w !== workspace),
      view: "INBOX",
   })),

   setView: (view) => set(state => {
      if (!state.workspaces.includes(view)) throw Error(`${view} not a workspace`)
      return { view }
   }),

   addBookmark: (bookmark) => set(state => ({
      bookmarks: state.bookmarks.concat(bookmark),
   })),
}))

export default store