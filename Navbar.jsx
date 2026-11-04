import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="nav-menu">

      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "nav-btn active-nav" : "nav-btn"
        }
      >
        🏠 Dashboard
      </NavLink>

      <NavLink
        to="/vision"
        className={({ isActive }) =>
          isActive ? "nav-btn active-nav" : "nav-btn"
        }
      >
        🎯 Vision
      </NavLink>

      <NavLink
        to="/mission"
        className={({ isActive }) =>
          isActive ? "nav-btn active-nav" : "nav-btn"
        }
      >
        🚀 Mission
      </NavLink>

      <NavLink
        to="/reports"
        className={({ isActive }) =>
          isActive ? "nav-btn active-nav" : "nav-btn"
        }
      >
        📋 Reports
      </NavLink>

      <NavLink
        to="/events"
        className={({ isActive }) =>
          isActive ? "nav-btn active-nav" : "nav-btn"
        }
      >
        📅 Events
      </NavLink>

    </div>
  );
}

export default Navbar;