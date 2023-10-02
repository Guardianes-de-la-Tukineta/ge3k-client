import { Route, Routes } from "react-router";
import "./App.css";

import NavBar from "./components/NavBar/NavBar";
import CardContainer from "./components/CardContainer/CardContainer";
import Home from "./Views/Home/Home";
// import Legal from "./Views/Legal/Legal";
import ProductDetail from "./Views/ProductDetails/ProductDetails";

import ProductDetails from "./Views/ProductDetails/ProductDetails";
import Legal from "./Views/Legal/Legal";
import Error404 from "./Views/Error404/Error404";

// import NavBar from "./components/NavBar/NavBar"
import Footer from "./components/Footer/Footer"
import ThemeView from './Views/ThemeView/ThemeView'
import Category from './Views/Category/Category'
import SearchResults from "./Views/SearchResults/SearchResults";


function App() {
  return (
    <div className="vh-100 d-flex flex-column">
      <NavBar />
      <div className="flex-grow-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:nameCategory" element={<Category />} />
        <Route path="/thematic/:nameThematic" element={<ThemeView />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="*" element={<Error404 />} />
      </Routes>

      </div>
      <Footer />
    </div>
  );
}

export default App;
