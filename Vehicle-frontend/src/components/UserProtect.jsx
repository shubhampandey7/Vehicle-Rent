import { Outlet, useNavigate } from "react-router-dom";
import { isTokenValid } from "./JwtToken";

const UserProtect = () => {
  const rd = useNavigate();
  const token = sessionStorage.getItem("token");
  return sessionStorage.getItem("role") != null &&
    sessionStorage.getItem("token") != null &&
    !isTokenValid(token) ? (
    <Outlet />
  ) : (
    rd("/login", { replace: true })
  );
};
export default UserProtect;
