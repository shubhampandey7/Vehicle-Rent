import { NavLink } from "react-router-dom";
import styl from "../style/navbar.module.css";

const HomeNavbar = () => {
  return (
    <>
      <nav>
        <ul className={styl.item}>
          <NavLink to="/">
            <h2>Shubham Vehicle-Lease</h2>
          </NavLink>

          <NavLink
            to="/car"
            style={({ isActive }) => {
              return {
                background: isActive ? "white" : "",
              };
            }}
          >
            Vehicle
          </NavLink>

          <NavLink
            to="/bike"
            style={({ isActive }) => {
              return {
                background: isActive ? "white" : "",
              };
            }}
          >
            Two-Wheeler
          </NavLink>

          <NavLink
            to="/register"
            style={({ isActive }) => {
              return {
                background: isActive ? "white" : "",
              };
            }}
          >
            Register
          </NavLink>
          <NavLink
            to="/login"
            style={({ isActive }) => {
              return {
                background: isActive ? "white" : "",
              };
            }}
          >
            Login
          </NavLink>
        </ul>
      </nav>
    </>
  );
};
export default HomeNavbar;
