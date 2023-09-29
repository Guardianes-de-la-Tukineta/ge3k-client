import { Route, Routes } from 'react-router'
import './App.css'
import Home from './components/Home/Home'
import NavBar from './components/NavBar/NavBar'
import CardContainer from './components/CardContainer/CardContainer'
function App() { 
 
  return (
    <> 
         
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:category' element={<CardContainer/>}/>
        <Route path='/product/:id' element={<ProductDetail/>}/>
      </Routes>       
    </>
  )
}

export default App
