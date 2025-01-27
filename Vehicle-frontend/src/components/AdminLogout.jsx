import { useNavigate } from "react-router-dom";
import styl from "../style/login.module.css";
const AdminLogout = () => {
  const rd = useNavigate();

  const logout = () => {
    alert("Do you want to logout!!!");
    sessionStorage.clear("email");
    sessionStorage.clear("role");
    sessionStorage.clear("token");
    rd("/");
  };

  return (
    <>
      <div className={styl.lgn}>
        <button onClick={logout}>
          <h1>Logout</h1>
        </button>
      </div>
    </>
  );
};
export default AdminLogout;
