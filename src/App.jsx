import './App.css'
import AddModal from './components/AddModal'
import TopMenu from './components/TopMenu'
import SearchTable from './components/SearchTable'

function App() {
  return (
    <div id="App">
      <div id="TopFlexContainer">
        <h1 id="logo">REMEMBER</h1>
        <TopMenu />
        <AddModal />
      </div>
      <SearchTable />
    </div>
  )
}

export default App
