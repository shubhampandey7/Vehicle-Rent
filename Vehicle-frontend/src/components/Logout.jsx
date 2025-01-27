import { useNavigate } from "react-router-dom";
import styl from "../style/login.module.css";

const Logout = () => {
  const rd = useNavigate();

  const getOut = () => {
    alert("Do you want to sigout!!!");
    sessionStorage.clear("token");
    sessionStorage.clear("role");
    sessionStorage.clear("email");
    rd("/");
  };

  return (
    <>
      <div className={styl.lgn}>
        <h1>Drive safe Enjoy Ride with Shubham</h1>
        <button onClick={getOut}>
          <h1>Logout</h1>
        </button>
      </div>
    </>
  );
};
export default Logout;
