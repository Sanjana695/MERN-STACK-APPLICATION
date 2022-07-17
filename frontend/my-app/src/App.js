import Home from "./Components/Home";
import TopNavbar from "./layout/TopNavbar";
import AddProduct from "./Components/AddProduct";
import Product from "./Components/Product";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";

function App() {
  return (
    <>
      <TopNavbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/addproduct" element={<AddProduct />} />

        <Route path="/product" element={<Product />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Register />} />

        <Route path="/logout" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
