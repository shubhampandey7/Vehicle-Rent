import { useState, useEffect } from "react";
import sty from "../style/login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";
const Login = () => {
  useEffect(() => {
    if (
      sessionStorage.getItem("role") != null ||
      sessionStorage.getItem("token") != null ||
      sessionStorage.getItem("email") != null
    ) {
      sessionStorage.clear("role");
      sessionStorage.clear("email");
      sessionStorage.clear("token");
      rd("/login", { replace: true });
    }
  });
  const [user, setUser] = useState({ email: "", password: "" });
  const rd = useNavigate();

  const setInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const signIn = async () => {
    try {
      const ans = await axios.post(
        "http://localhost:8090/vehicle/user/login",
        user
      );

      if (ans.data.role != "") {
        sessionStorage.setItem("email", user.email);
        sessionStorage.setItem("role", ans.data.role);
        sessionStorage.setItem("token", ans.data.token);
        if (ans.data.role == "User") {
          rd("/user/carbook", { replace: true });
        } else if (ans.data.role == "Admin") {
          rd("/admin", { replace: true });
        }
      }
    } catch (error) {
      alert("Invalid user!!");
    }
  };

  return (
    <>
      <HomeNavbar />
      <div className={sty.lgn}>
        <h1>Shubam Vehicle Lease</h1>
        <br></br>
        <br></br>
        <label>Name</label>
        <br></br>
        <input
          name="email"
          type="text"
          value={user.email}
          placeholder="Enter email id"
          onChange={(e) => setInput(e)}
        ></input>
        <br></br>
        <br></br>
        <label>Password</label>
        <br></br>
        <input
          name="password"
          type="password"
          value={user.password}
          placeholder="Enter password"
          onChange={(e) => setInput(e)}
        ></input>
        <br></br>
        <br></br>
        <button onClick={signIn}>Log in</button>
      </div>
    </>
  );
};
export default Login;
