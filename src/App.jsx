import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./Views/Home/Home.jsx";
import CardContainer from './components/CardContainer/CardContainer'
import ProductDetails from './Views/ProductDetails/ProductDetails'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/category/:nameCategory' element={<CardContainer/>}/>
        <Route path='/thematic/:nameThematic' element={<CardContainer/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
      </Routes>       
    </>
  );
}

export default App;
