import { Route, Routes } from "react-router";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import CardContainer from "./components/CardContainer/CardContainer";
import Home from "./Views/Home.jsx";
import Legal from "./Views/Legal/Legal";
import ProductDetail from "./Views/ProductDetails/ProductDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<CardContainer />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="*" element={<Legal />} />
      </Routes>
    </>
  );
}

export default App;
