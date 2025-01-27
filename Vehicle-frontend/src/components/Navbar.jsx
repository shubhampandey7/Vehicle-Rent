import { NavLink } from "react-router-dom";
import styl from "../style/navbar.module.css";

const Navbar = () => {
  return (
    <>
      <ul className={styl.item}>
        <NavLink>
          <h2>Shubham Vehicle-Lease</h2>
        </NavLink>

        <NavLink
          to="carbook"
          style={({ isActive }) => {
            return {
              background: isActive ? "white" : "",
            };
          }}
        >
          Car-Book
        </NavLink>
        <NavLink
          to="bikebook"
          style={({ isActive }) => {
            return {
              background: isActive ? "white" : "",
            };
          }}
        >
          Bike-Book
        </NavLink>

        <NavLink
          to="bookingdetails"
          style={({ isActive }) => {
            return {
              background: isActive ? "white" : "",
            };
          }}
        >
          Booking Details
        </NavLink>

        <NavLink
          to="logout"
          style={({ isActive }) => {
            return {
              background: isActive ? "white" : "",
            };
          }}
        >
          Logout
        </NavLink>
      </ul>
    </>
  );
};
export default Navbar;
