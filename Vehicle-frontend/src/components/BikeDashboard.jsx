import axios from "axios";
import { useEffect, useState } from "react";
import stl from "../style/car.module.css";
import st from "../style/navbar.module.css";
import { isTokenValid } from "./JwtToken";
import { useNavigate } from "react-router-dom";

const BikeDashboard = () => {
  const token = sessionStorage.getItem("token");
  const rd = useNavigate();
  const loggedStatus = () => {
    if (isTokenValid(token)) {
      alert("Session Expire !!! Please Login Again");
      rd("/login", { replace: true });
    }
  };
  const [bike, setBike] = useState([]);

  const getBike = async () => {
    if (!loggedStatus()) {
      const rsp = await axios.get("http://localhost:8090/vehicle/bike/");

      setBike(rsp.data);
    }
  };
  useEffect(() => {
    getBike();
    const tm = setInterval(() => getBike(), 60000);
    return () => clearInterval(tm);
  }, []);

  const [book, setBook] = useState({
    userEmail: "",
    days: "",
    bikeId: "",
    totalQuantity: "",
    hireDate: "",
  });

  const Book = (e, id, quantity) => {
    e.preventDefault();

    book.bikeId = id;
    book.userEmail = sessionStorage.getItem("email");
    if (book.totalQuantity > quantity) {
      alert("Please Check Quantity!!! only " + quantity + " available");
      return;
    }

    const hd = new Date(book.hireDate).toLocaleDateString();

    const d = new Date().toLocaleDateString();
    if (hd < d) {
      alert("Invalid hire date!!");
      return;
    }

    if (book.days <= 0 || book.totalQuantity <= 0) {
      alert("Invalid days and quantity!!");
      return;
    }

    if (!loggedStatus()) {
      axios
        .post(`http://localhost:8090/vehicle/bike/book`, book, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((rsp) => {
          rsp.data == true
            ? alert("bike booked")
            : alert("please check bike availability");
        })
        .catch((error) => alert("Server down Please try latter!!"));

      setBook({
        userEmail: "",
        days: "",
        bikeId: "",
        totalQuantity: "",
        hireDate: "",
      });
      setShow(0);
    }
  };

  const getInput = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const [show, setShow] = useState();

  const showDetails = (e, id) => {
    e.preventDefault();
    setShow(id);
  };

  const hideDetails = (e, id) => {
    e.preventDefault();
    setShow(0);
  };

  const [search, setSearch] = useState("");

  const find = (e) => {
    e.preventDefault();
    loggedStatus();
    if (search.length < 3) {
      alert("Enter Valid Brand Name");
      return;
    }

    if (!loggedStatus()) {
      axios
        .get(`http://localhost:8090/vehicle/bike/${search}`, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((rsp) => {
          rsp.data.length != 0
            ? setBike(rsp.data)
            : alert(
                search.toUpperCase() + " Brand Not Found Please Surf Other!!!"
              );
        })
        .catch((error) => console.log("Server down Please try latter"));
      setSearch("");
    }
  };
  return (
    <>
      <h1 align="center">Book and Enjoy Ride</h1>
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
      <br></br>
      {bike.map((itm, i) => (
        <div key={i} className={st.one}>
          <div>
            <img
              key={i}
              src={"data:image/jpeg;base64," + itm.image} // converting byte array to base64 and displaying as image
              height={350}
              width={660}
            />

            <h1>
              Name:{itm.name} Brand:{itm.brand} Rate:{itm.rate}
            </h1>
            <div>
              {itm.id == show ? (
                <div className={stl.btn}>
                  <ul>
                    <li>Quantity:{itm.quantity}</li>
                    <li>EngineStart:{itm.engineStart}</li>
                    <li>Mileage:{itm.mileage} km/hr</li>
                    <li>Tank Capacity:{itm.tank} l </li>
                    <li>Model:{itm.model}</li>
                    <li>Top Speed:{itm.speed} km/hr</li>
                    <li>EngineCapacity:{itm.engineCapacity} cc</li>
                    <li>Release Date:{itm.date}</li>
                  </ul>
                  <label>Days</label>
                  <br></br>
                  <input
                    type="number"
                    min={1}
                    value={book.days}
                    name="days"
                    onChange={(e) => getInput(e)}
                    placeholder="Enter Days "
                  ></input>
                  <br></br>
                  <br></br>
                  <label>Quantity</label>
                  <br></br>
                  <input
                    type="number"
                    value={book.totalQuantity}
                    min={1}
                    name="totalQuantity"
                    onChange={(e) => getInput(e)}
                    placeholder="Enter Bike Number "
                  ></input>
                  <br></br>
                  <br></br>
                  <label>Pick-up date</label>
                  <br></br>
                  <input
                    type="date"
                    name="hireDate"
                    onChange={(e) => getInput(e)}
                  ></input>
                  <br></br>
                  <br></br>
                  <button
                    className={stl.btn}
                    onClick={(e) => Book(e, itm.id, itm.quantity)}
                  >
                    Book
                  </button>
                  <br></br>
                </div>
              ) : (
                ""
              )}
            </div>
            <br></br>
            <button
              className={stl.btn}
              onClick={(e) => showDetails(e, itm.id, itm.totalQuantity)}
            >
              MoreDetails
            </button>
            <button onClick={(e) => hideDetails(e, itm.id)}>HideDetails</button>
            <br></br>
            <br></br>
            <hr></hr>
          </div>
        </div>
      ))}
    </>
  );
};
export default BikeDashboard;
