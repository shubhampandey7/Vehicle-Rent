import { useEffect, useState } from "react";
import axios from "axios";
import styl from "../style/login.module.css";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "./JwtToken";
const BookedVehicle = () => {
  const rd = useNavigate();
  const token = sessionStorage.getItem("token");
  const loggedStatus = () => {
    if (isTokenValid(token)) {
      alert("Session Expire !!! Please Login Again");
      rd("/login", { replace: true });
    }
  };
  const [car, setCar] = useState([]);
  const [bike, setBike] = useState([]);

  const getBookedVehicle = async () => {
    if (!loggedStatus()) {
      await axios
        .get("http://localhost:8090/vehicle/car/booked", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((rsp) => setCar(rsp.data));
      axios
        .get("http://localhost:8090/vehicle/bike/booked", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((rsp) => setBike(rsp.data));
    }
  };

  useEffect(() => {
    getBookedVehicle();
    const tm = setInterval(() => getBookedVehicle(), 60000);
    return clearInterval(tm);
  }, []);

  const carRetrun = (e, id) => {
    e.preventDefault();
    if (!loggedStatus()) {
      axios
        .delete(`http://localhost:8090/vehicle/car/booked/delete/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((rsp) => {
          rsp.data == true ? "Deleted Sucessfully!!" : "Invalid Car id";
        })
        .catch((error) => alert("Server Down Please try latter"));
    }
  };
  const bikeReturn = (e, id) => {
    e.preventDefault();
    if (!loggedStatus()) {
      axios
        .delete(`http://localhost:8090/vehicle/bike/booked/delete/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((rsp) => {
          rsp.data == true ? "Deleted Sucessfully!!" : "Invalid Bike id";
        })
        .catch((error) => alert("Server Down Please try latter"));
    }
  };

  return (
    <>
      <div className={styl.lgn}>
        <h1>Booked Car Details!!!</h1>
        <table border={1} className={styl.tbl}>
          <thead>
            <tr>
              <th>Id</th>
              <th>UserId</th>
              <th>Brand</th>
              <th>Name</th>
              <th>CarId</th>
              <th>Quantity</th>
              <th>Days</th>
              <th>Rate</th>
              <th>Total Amount</th>
              <th>Return</th>
            </tr>
          </thead>
          {car.map((itm, i) => (
            <tbody key={i}>
              <tr>
                <td>{itm.id}</td>
                <td>{itm.userEmail}</td>
                <td>{itm.carBrand}</td>
                <td>{itm.carName}</td>
                <td>{itm.carId}</td>
                <td>{itm.totalQuantity}</td>
                <td>{itm.days}</td>
                <td>{itm.rate}</td>
                <td>{itm.totalPrice}</td>
                <td>
                  <button onClick={(e) => carRetrun(e, itm.id)}>Return</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <br></br>
        <br></br>
        <h1>Booked Bike Details!!!</h1>
        <table border={1} className={styl.tbl}>
          <thead>
            <tr>
              <th>Id</th>
              <th>UserId</th>
              <th>Brand</th>
              <th>Name</th>
              <th>BikeId</th>
              <th>Quantity</th>
              <th>Days</th>
              <th>Rate</th>
              <th>Total Amount</th>
              <th>Return</th>
            </tr>
          </thead>
          {bike.map((itm, i) => (
            <tbody key={i}>
              <tr>
                <td>{itm.id}</td>
                <td>{itm.userEmail}</td>
                <td>{itm.bikeBrand}</td>
                <td>{itm.bikeName}</td>
                <td>{itm.bikeId}</td>
                <td>{itm.totalQuantity}</td>
                <td>{itm.days}</td>
                <td>{itm.rate}</td>
                <td>{itm.totalPrice}</td>
                <td>
                  <button onClick={(e) => bikeReturn(e, itm.id)}>Return</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};
export default BookedVehicle;
