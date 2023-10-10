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
import Success from "./Views/PaymentGateway/Success";
import Cancel from "./Views/PaymentGateway/Cancel";
import Category from "./Views/Category/Category";
import SearchResults from "./Views/SearchResults/SearchResults";
import Login from "./components/Login/Login";
import Logout from "./components/Login/Logout";
import Profile from "./Views/Profile/Profile";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop"; //Para poder ir al inicio (arriba) de la pagina al cambiar de vista
import PurchaseOrder from "./Views/PurchaseOrder/PurchaseOrder";
import Admin from "./Views/Admin/Admin";
import CartColumn from "./Views/CartColumn/CartColumn";
import { cartStore } from "./zustand/cartStore/cartStore";


import CartProvider from "./Views/PaymentGateway/CartContext";

function App() {
  const{cart}=cartStore() //traemos el estado de zustand  
  return (

      <CartProvider>
    <div className={`${cart.length > 0 ? 'col-md-11 ': 'col-md-12' } vh-100 d-flex flex-column`}>
      {location.pathname.startsWith('/admin') ? undefined : <NavBar />}
      <ScrollToTop/>       
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:nameCategory" element={<Category />} />
          <Route path="/thematic/:nameThematic" element={<ThemeView />} />

        
          <Route path="/payment" element={< PaymentGateway/>} />
          <Route path="/success" element={< Success/>} />
          <Route path="/cancel" element={< Cancel/>} /> 
       

          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/PurchaseOrder" element={<PurchaseOrder />} />;
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
      {
        cart.length>0 && <CartColumn/> //solo renderiza si tenemos articulos en el cart
      }
     {location.pathname.startsWith('/admin') ? undefined :  <Footer />}
    </div>
    </CartProvider>
  );
}

export default App;
