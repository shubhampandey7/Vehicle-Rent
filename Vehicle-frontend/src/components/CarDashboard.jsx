import axios from "axios";
import { useEffect, useState } from "react";
import stl from "../style/car.module.css";
import st from "../style/navbar.module.css";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "./JwtToken";
const CarDashboard = () => {
  const rd = useNavigate();
  const token = sessionStorage.getItem("token");
  const loggedStatus = () => {
    if (isTokenValid(token)) {
      alert("Session Expire !!! Please Login Again");
      rd("/login", { replace: true });
    }
  };

  const [car, setCar] = useState([]);
  const getCar = async () => {
    if (!loggedStatus()) {
      const rsp = await axios.get("http://localhost:8090/vehicle/car/");

      setCar(rsp.data);
    }
  };
  useEffect(() => {
    getCar();
    const tm = setInterval(() => getCar(), 60000);
    return () => clearInterval(tm);
  }, []);

  const [book, setBook] = useState({
    userEmail: "",
    days: "",
    carId: "",
    totalQuantity: "",
    hireDate: "",
  });

  const Book = (e, id, quantity) => {
    e.preventDefault();
    loggedStatus();
    book.carId = id;
    book.userEmail = sessionStorage.getItem("email");
    if (book.totalQuantity > quantity) {
      alert("Please Check Quantity");
      return;
    }

    if (book.days <= 0 || book.totalQuantity <= 0) {
      alert("invalid days and quantity");
      return;
    }

    const hd = new Date(book.hireDate).toLocaleDateString();

    const d = new Date().toLocaleDateString();
    if (hd < d) {
      alert("Invalid Booking date!!");
      return;
    }
    if (!loggedStatus()) {
      axios
        .post(`http://localhost:8090/vehicle/car/book/`, book, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((rsp) => {
          if (rsp.data) setShow(0);
          rsp.data == true
            ? alert("car booked")
            : alert("please check car availability");
        })
        .catch((error) => alert("Server down Please try latter!!"));
    }

    setBook({
      userEmail: "",
      days: "",
      carId: "",
      hireDate: "",
      totalQuantity: "",
    });
    setShow(0);
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

  const find = async (e) => {
    e.preventDefault();
    loggedStatus();
    if (search.length < 3) {
      alert("Enter Valid Brand Name");
      setSearch("");
      return;
    }

    if (!loggedStatus()) {
      try {
        await axios
          .get(`http://localhost:8090/vehicle/car/${search}`, {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          })
          .then((rsp) => {
            if (rsp.data.length == 0) alert("Invalid brand name");
            else setCar(rsp.data);
          });
      } catch (error) {
        alert("Invalid Brand Name");
      }
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
        ></input>
        <button className={stl.btn} onClick={(e) => find(e)}>
          Search
        </button>
      </h1>
      <hr></hr>
      <br></br>
      {car.map((itm, i) => (
        <div key={i} className={st.one}>
          <div>
            <img
              key={i}
              src={"data:image/jpeg;base64," + itm.image} // converting byte array to base64 and displaying as image
              height={350}
              width={660}
            />

            <h1>
              Name:{itm.name} Brand:{itm.brand} Rate:{itm.price}
            </h1>
            <div>
              {itm.id == show ? (
                <div className={stl.btn}>
                  <ul>
                    <li>
                      Quantity:
                      {itm.quantity}
                    </li>
                    <li>Type:{itm.type}</li>
                    <li>Description:{itm.description}</li>
                    <li>Model:{itm.model}</li>
                    <li>Transmission:{itm.transmission}</li>
                    <li>Color:{itm.color}</li>
                    <li>Release Date:{itm.date}</li>
                  </ul>

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

                  <input
                    type="number"
                    value={book.totalQuantity}
                    min={1}
                    name="totalQuantity"
                    onChange={(e) => getInput(e)}
                    placeholder="Enter Car Number "
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
            <button className={stl.btn} onClick={(e) => showDetails(e, itm.id)}>
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
export default CarDashboard;
