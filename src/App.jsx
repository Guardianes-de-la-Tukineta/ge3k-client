import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./Views/Home/Home";
import ProductDetails from "./Views/ProductDetails/ProductDetails";
import Legal from "./Views/Legal/Legal";
import Error404 from "./Views/Error404/Error404";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import ThemeView from "./Views/ThemeView/ThemeView";
import PaymentGateway from "./Views/PaymentGateway/PaymentGateway";
import Cancel from "../src/Views/PaymentGateway/Cancel";
import Success from "../src/Views/PaymentGateway/Success";
import Bill from "./Views/PaymentGateway/Bill";
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
import ContactForm from "./Views/Admin/Components/ContactForm/ContactForm";
import Favorite from "./Views/Favorite/Favorite";
import WhatsAppButton from "./components/whatsAppButton/whatsAppButton";

function App() {
  const { cart, visibility } = cartStore(); //traemos el estado de zustand

  return (
    <CartProvider>
      <div
        style={{
          width:
            cart.length > 0 &&
            visibility &&
            !location.pathname.startsWith("/admin")
              ? "87vw"
              : "100vw",
        }}
        className={`vh-100 d-flex flex-column`}
      >
        {location.pathname.startsWith("/admin") ? undefined : <NavBar />}
        <ScrollToTop />
        {!(cart.length > 0 && visibility) &&
          !location.pathname.startsWith("/admin") && <WhatsAppButton />}
        <div className="flex-grow-1 d-flex justify-content-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:nameCategory" element={<Category />} />
            <Route path="/thematic/:nameThematic" element={<ThemeView />} />
            <Route path="/payment" element={<PaymentGateway />} />
            <Route path="/success" element={<Success />} />
            <Route path="/bill" element={<Bill />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/PurchaseOrder" element={<PurchaseOrder />} />;
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/send-email" element={<ContactForm />} />
            <Route path="/favorites" element={<Favorite/>}/>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
        {
          cart.length > 0 && !location.pathname.startsWith("/admin") && (
            <CartColumn />
          ) //solo renderiza si tenemos articulos en el cart
        }
        {location.pathname.startsWith("/admin") ? undefined : <Footer />}

      </div>
    </CartProvider>
  );
}

export default App;
