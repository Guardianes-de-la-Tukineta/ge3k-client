import { Route, Routes } from 'react-router'
import './App.css'
import Category from './Views/Category/Category'
import ThemeView from './Views/ThemeView/ThemeView'
import Home from './Views/Home/Home.jsx'
import ProductDetails from './Views/ProductDetails/ProductDetails'
import NavBar from "./components/NavBar/NavBar"
import Footer from "./components/Footer/Footer"


function App() { 
 
  return (
    <div className='vh-100'>         
     <NavBar/>
            
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/category/:nameCategory' element={<Category/>}/>
        <Route path='/thematic/:nameThematic' element={<ThemeView/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
      </Routes>  

      <Footer/>     
    </div>
  )
}

export default App
