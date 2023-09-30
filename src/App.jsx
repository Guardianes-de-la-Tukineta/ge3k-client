import { Route, Routes } from 'react-router'
import './App.css'
import Category from './Views/Category/Category'
import ThemeView from './Views/ThemeView/ThemeView'
import Home from './Views/Home/Home.jsx'
import ProductDetails from './Views/ProductDetails/ProductDetails'

function App() { 
 
  return (
    <>         
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/category/:nameCategory' element={<Category/>}/>
        <Route path='/thematic/:nameThematic' element={<ThemeView/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
      </Routes>       
    </>
  )
}

export default App
