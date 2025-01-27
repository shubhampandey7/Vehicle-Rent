import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
const LoggedIn = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
export default LoggedIn;
