import axios from "axios";
import { useEffect, useState } from "react";
import styl from "../style/login.module.css";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "./JwtToken";
const User = () => {
  const rd = useNavigate();
  const token = sessionStorage.getItem("token");
  const loggedStatus = () => {
    if (isTokenValid(token)) {
      alert("Session Expire !!! Please Login Again");
      rd("/login", { replace: true });
    }
  };
  const [user, setUser] = useState([]);

  const getAllUser = async () => {
    if (!loggedStatus()) {
      axios
        .get("http://localhost:8090/vehicle/user/", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((rsp) => setUser(rsp.data))
        .catch((error) => alert("Server down"));
    }
  };

  useEffect(() => {
    getAllUser();
    const tm = setInterval(() => getAllUser(), 60000);
    return clearTimeout(tm);
  }, []);

  const [show, setShow] = useState(false);

  const createUser = () => {
    setShow(true);
  };
  const back = () => {
    setShow(false);
  };

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const setInput = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const register = (e) => {
    e.preventDefault();
    const er = validate(newUser);
    setError(er);
    if (Object.keys(er).length != 0) {
      alert("All Input Filed are required!!!");
      return;
    }
    if (!loggedStatus()) {
      axios
        .post("http://localhost:8090/vehicle/user/createAdmin", newUser, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((rst) => {
          rst.data == true
            ? alert("user Created Successfully")
            : alert(
                "User with gmail id " + newUser.email + " already exits!!!"
              );
        })
        .catch((error) => alert("Server down please try later!!"));
    }
    setShow(false);
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

  const deleteUser = (e, id) => {
    e.preventDefault();
    if (!loggedStatus()) {
      axios
        .delete(`http://localhost:8090/vehicle/user/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((rsp) =>
          alert("User Deleted Successfully!!!,Refresh to see update")
        )
        .catch((error) => alert("server down"));
    }
  };

  return (
    <>
      {show == false ? (
        <div className={styl.lgn}>
          <h1>User Details</h1>
          <table border={2} className={styl.tbl}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Role</th>
                <th>Delete</th>
              </tr>
            </thead>
            {user.map((itm, i) => (
              <tbody key={i}>
                <tr>
                  <td>{itm.id}</td>
                  <td>{itm.name}</td>
                  <td>{itm.email}</td>
                  <td>{itm.mobile}</td>
                  <td>{itm.role}</td>
                  <td>
                    <button onClick={(e) => deleteUser(e, itm.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <br></br>
          <br></br>
          <button onClick={createUser}>RegisterAdminUser</button>
        </div>
      ) : (
        ""
      )}

      {show == true ? (
        <form className={styl.lgn} onSubmit={(e) => register(e)}>
          <h1>Register</h1>
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={(e) => setInput(e)}
            placeholder="Enter full name"
          ></input>
          <br></br>
          {error.name && <span className={styl.text}>{error.name}</span>}
          <br></br>
          <br></br>
          <input
            type="email"
            name="email"
            value={newUser.email}
            placeholder="Enter email id"
            onChange={(e) => setInput(e)}
          ></input>
          <br></br>
          {error.email && <span className={styl.text}>{error.email}</span>}
          <br></br>
          <br></br>
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={(e) => setInput(e)}
            placeholder="Enter password"
          ></input>
          <br></br>
          {error.password && (
            <span className={styl.text}>{error.password}</span>
          )}
          <br></br>
          <br></br>
          <input
            type="text"
            name="mobile"
            value={newUser.mobile}
            onChange={(e) => setInput(e)}
            placeholder="Enter mobile number"
          ></input>
          <br></br>
          {error.mobile && <span className={styl.text}>{error.mobile}</span>}
          <br></br>
          <br></br>
          <button className={styl.btn}>Signup</button>
          <button className={styl.btn} onClick={back}>
            Back
          </button>
        </form>
      ) : (
        ""
      )}
    </>
  );
};
export default User;
