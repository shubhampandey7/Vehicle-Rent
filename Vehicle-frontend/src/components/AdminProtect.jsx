import { Outlet, useNavigate } from "react-router-dom";
import { isTokenValid } from "./JwtToken";

const AdminProtect = () => {
  const rd = useNavigate();
  const token = sessionStorage.getItem("token");
  return sessionStorage.getItem("role") === "Admin" &&
    !isTokenValid(token) &&
    sessionStorage.getItem("token") != null ? (
    <Outlet />
  ) : (
    rd("/login", { replace: true })
  );
};
export default AdminProtect;
