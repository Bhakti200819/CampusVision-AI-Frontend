import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";
import CommandCenter from "../CommandCenter.jsx";




function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<ProtectedRoute />}></Route>
        <Route path="/portal" element={<CommandCenter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;