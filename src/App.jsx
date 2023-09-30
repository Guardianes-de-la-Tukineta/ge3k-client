import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./Views/Home/Home.jsx";
import Legal from "./Views/Legal/Legal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/legal/" element={<Legal />} />
      </Routes>
    </>
  );
}

export default App;
