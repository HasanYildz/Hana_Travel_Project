import { NavLink } from "react-router-dom"
import "../styles/navbar.css"

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="navbar-logo">Author Dashboard</h2>

      <div className="navbar-links">
        <NavLink to="/" end className="nav-link">
          Authors
        </NavLink>

        <NavLink to="/create" className="nav-link">
          Create Author
        </NavLink>
      </div>
    </nav>
  )
}