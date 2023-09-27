import { Route, Routes } from 'react-router'
import './App.css'
import Card from './components/Card/Card/'

function App() { 
 
  return (
    <>      
      <Routes>
        <Route path='/' element={<Card/>}/>
      </Routes>       
    </>
  )
}

export default App
