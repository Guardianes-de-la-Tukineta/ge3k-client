import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./Views/Home/Home";
import ProductDetails from "./Views/ProductDetails/ProductDetails";
import Legal from "./Views/Legal/Legal";
import Error404 from "./Views/Error404/Error404";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import ThemeView from "./Views/ThemeView/ThemeView";
import PaymentGateway from "./Views/PaymentGateway/PaymentGateway"
import Category from "./Views/Category/Category";
import SearchResults from "./Views/SearchResults/SearchResults";
import Login from "./components/Login/Login";
import Logout from "./components/Login/Logout";
import Profile from "./components/Profile/Profile";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop"; //Para poder ir al inicio (arriba) de la pagina al cambiar de vista
import Admin from "./Views/Admin/Admin";

function App() {
  return (
    <div className="vh-100 d-flex flex-column">
      {location.pathname.startsWith('/admin') ? undefined : <NavBar />}
      <ScrollToTop/> 
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:nameCategory" element={<Category />} />
          <Route path="/thematic/:nameThematic" element={<ThemeView />} />
          <Route path="/payment" element={< PaymentGateway/>} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
      {location.pathname.startsWith('/admin') ? undefined :  <Footer />}
    </div>
  );
}

export default App;
