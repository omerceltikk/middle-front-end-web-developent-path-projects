import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Basket from "./pages/Basket";
import Error404 from "./pages/Error404";
import Admin from "./pages/Admin";
import AdminProtectedRoute from "./pages/AdminProtectedRoute";

function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <div id="content">
      <Routes>
          <Route index element={<Products />} />
          <Route path="/product/:product_id" element={<ProductDetail />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/basket" element={<Basket />} />
          <Route element={<ProtectedRoute/>}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/admin/*" element={<AdminProtectedRoute/>}/>
          <Route path="*" element={<Error404 />} />
      </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
