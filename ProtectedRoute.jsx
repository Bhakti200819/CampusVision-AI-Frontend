
import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("campusvision_token");

      if (!token) {
        setStatus("unauthorized");
        return;
      }

      try {
        const response = await fetch(
          "https://campusvision-ai-backend.onrender.com/auth/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          localStorage.removeItem("campusvision_token");
          localStorage.removeItem("campusvision_user");
          setStatus("unauthorized");
          return;
        }

        setStatus("authorized");

      } catch (error) {
        setStatus("error");
      }
    };

    verifyToken();
  }, []);

  if (status === "checking") {
    return <div>Verifying secure access...</div>;
  }

  if (status === "unauthorized") {
    return <Navigate to="/login" replace />;
  }

  if (status === "error") {
    return <div>Unable to connect to security server. Please try again.</div>;
  }

  return <Outlet />;
}

export default ProtectedRoute;
