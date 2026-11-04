
import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import ForgotPassword from "./ForgotPassword.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import CommandCenter from "./CommandCenter.jsx";

function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/portal" element={<CommandCenter />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;
