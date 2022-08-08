// —————————————————————————————————————————————————————————————————————————————
// Import

import { useState } from "react"
import store from "../state/store"

// —————————————————————————————————————————————————————————————————————————————
// Component

function Workspaces() {
  const [workspaces, setView] = store(state => [state.workspaces, state.setView])
  const [inputValue, setInputValue] = useState("")
  return (
    <>
      <input
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <button onClick={() => workspaces.push(inputValue)}>Add Workspace</button>
      <nav>
        {
          workspaces.map((w, i) => 
            <div key={i} onClick={() => setView(w)}>{w}</div>
          )
        }
      </nav>
    </>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default Workspaces