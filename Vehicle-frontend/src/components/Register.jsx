import { useState, useEffect } from "react";
import styl from "../style/login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";

const Register = () => {
  const rd = useNavigate();
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

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const setInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const register = (e) => {
    e.preventDefault();
    const er = validate(user);
    setError(er);
    if (Object.keys(er).length != 0) {
      alert("All Field required!!!");
      return;
    }

    axios
      .post("http://localhost:8090/vehicle/user/create", user)
      .then((rst) => {
        if (rst.data) {
          alert("user Created Successfully");
          setUser({
            name: "",
            email: "",
            password: "",
            mobile: "",
          });
        } else {
          alert("User with gmail id" + user.email + " already exits!!!");
        }
      })
      .catch((error) => alert("Server down please try later!!"));
  };

  //for validating from
  const [error, setError] = useState({});
  const validate = (user) => {
    const error = {};
    if (user.name.trim().length < 3)
      error.name = "Name should be at least 3 character!!";
    if (!user.email.trim()) error.email = "Please enter valid email id";
    if (user.password.trim().length < 7)
      error.password = "Password should be at least 8 character";
    if (user.mobile.trim().length != 10)
      error.mobile = "Please enter Valid phone number";
    return error;
  };
  const redirect = (e) => {
    e.preventDefault();
    rd("/login");
  };
  return (
    <>
      <HomeNavbar />
      <form className={styl.lgn}>
        <h1>Register</h1>
        <label>Name</label>
        <br></br>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={(e) => setInput(e)}
          placeholder="Enter full name"
        ></input>
        <br></br>
        {error.name && <span className={styl.text}>{error.name}</span>}
        <br></br>

        <label>Email</label>
        <br></br>
        <input
          type="email"
          name="email"
          value={user.email}
          placeholder="Enter email id"
          onChange={(e) => setInput(e)}
        ></input>
        <br></br>
        {error.email && <span className={styl.text}>{error.email}</span>}
        <br></br>

        <label>Password</label>
        <br></br>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => setInput(e)}
          placeholder="Enter password"
        ></input>
        <br></br>
        {error.password && <span className={styl.text}>{error.password}</span>}
        <br></br>
        <label>Mobile</label>
        <br></br>
        <input
          type="text"
          name="mobile"
          value={user.mobile}
          onChange={(e) => setInput(e)}
          placeholder="Enter mobile number"
        ></input>
        <br></br>
        {error.mobile && <span className={styl.text}>{error.mobile}</span>}
        <br></br>
        <button onClick={(e) => register(e)}>Signup</button>
        <br></br>
        <br></br>
        <button onClick={(e) => redirect(e)}>
          <h4>Already have an account?</h4>
        </button>
      </form>
    </>
  );
};
export default Register;
