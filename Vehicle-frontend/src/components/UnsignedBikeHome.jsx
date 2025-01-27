import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";
import stl from "../style/navbar.module.css";
const UnSignedBikeHome = () => {
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
  const [bike, setBike] = useState([]);
  const getBike = async () => {
    const rsp = await axios
      .get("http://localhost:8090/vehicle/bike/")
      .catch((error) => alert("Server down!!! Please  try latter"));

    setBike(rsp.data);
  };
  useEffect(() => {
    getBike();
    const tm = setInterval(() => getBike(), 120000);
    return clearInterval(tm);
  }, []);
  const login = (e) => {
    e.preventDefault();
    alert("Please sigup for booking!!!");
    rd("/login");
  };

  const [search, setSearch] = useState("");

  const find = (e) => {
    e.preventDefault();

    if (search.length < 3) {
      alert("Enter Valid Brand Name");
      getBike();
      return;
    }

    axios
      .get(`http://localhost:8090/vehicle/bike/${search}`)
      .then((rsp) => {
        rsp.data.length != 0
          ? setBike(rsp.data)
          : alert(
              search.toUpperCase() + " Brand Not Found Please Surf Other!!!"
            );
        if (rsp.data.length == 0) getBike();
      })
      .catch((error) => console.log("Server down Please try latter"));
    setSearch("");
  };

  return (
    <>
      <HomeNavbar />
      <h1 align="center">Welcome to Shubham Vehicle Lease</h1>
      <br></br>
      <hr></hr>
      <h1 align="center">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter brand name"
          value={search}
        ></input>
        <button className={stl.btn} onClick={(e) => find(e)}>
          Search
        </button>
      </h1>
      <hr></hr>
      {bike.map((itm, i) => (
        <div className={stl.one} key={i}>
          <img
            src={"data:image/jpeg;base64," + itm.image}
            width={660}
            height={350}
          ></img>

          <h1>
            Brand:{itm.brand} Name:{itm.name} Price:{itm.rate}
          </h1>
          <button onClick={(e) => login(e)}>Book</button>

          <hr></hr>
        </div>
      ))}
    </>
  );
};
export default UnSignedBikeHome;
