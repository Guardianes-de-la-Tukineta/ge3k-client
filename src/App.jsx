import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./Views/Home/Home.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
