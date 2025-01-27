import { NavLink, Outlet } from "react-router-dom";
import stl from "../style/navbar.module.css";

const AdminNavbar = () => {
  return (
    <>
      <nav>
        <ul className={stl.item}>
          <NavLink to="/admin">
            <h3>Shubham Vehicle-Lease</h3>
          </NavLink>
          <NavLink
            to="carregister"
            style={({ isActive }) => {
              return {
                background: isActive ? "white" : "",
              };
            }}
          >
            <h3>Car Register</h3>
          </NavLink>
          <NavLink
            to="bikeregister"
            style={({ isActive }) => {
              return {
                background: isActive ? "white" : "",
              };
            }}
          >
            <h3>Bike Register</h3>
          </NavLink>
          <NavLink
            to="cars"
            style={({ isActive }) => {
              return {
                background: isActive ? "white" : "",
              };
            }}
          >
            <h3>Cars</h3>
          </NavLink>
          <NavLink
            to="bikes"
            style={({ isActive }) => {
              return {
                background: isActive ? "white" : "",
              };
            }}
          >
            <h3>Bikes</h3>
          </NavLink>
          <NavLink
            to="users"
            style={({ isActive }) => {
              return {
                background: isActive ? "white" : "",
              };
            }}
          >
            <h3>Users</h3>
          </NavLink>
          <NavLink
            to="bookedvehicle"
            style={({ isActive }) => {
              return {
                background: isActive ? "white" : "",
              };
            }}
          >
            <h3>Booked Vehicle</h3>
          </NavLink>

          <NavLink
            to="/user/carbook"
            style={({ isActive }) => {
              return {
                background: isActive ? "white" : "",
              };
            }}
          >
            <h3>As-Customer</h3>
          </NavLink>

          <NavLink
            to="logout"
            style={({ isActive }) => {
              return {
                background: isActive ? "white" : "",
              };
            }}
          >
            <h3>Logout</h3>
          </NavLink>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default AdminNavbar;
