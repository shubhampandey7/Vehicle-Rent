import axios from "axios";
import { useEffect, useState } from "react";
import styl from "../style/login.module.css";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "./JwtToken";
const BookingDetails = () => {
  const rd = useNavigate();
  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");
  const loggedStatus = () => {
    if (isTokenValid(token)) {
      alert("Session Expire !!! Please Login Again");
      rd("/login", { replace: true });
    }
  };
  const [reserve, setReserve] = useState([]);
  const [tableShow, setTableShow] = useState(false);
  const [reserveBike, setReserveBike] = useState([]);

  const getBookingDetails = () => {
    setTableShow(true);
    if (!loggedStatus()) {
      axios
        .get(`http://localhost:8090/vehicle/car/booked/${email}`, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((rsp) => {
          setReserve(rsp.data);
        })
        .catch((error) => alert("time out please login again!!!"));
      axios
        .get(`http://localhost:8090/vehicle/bike/booked/${email}`, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((rsp) => setReserveBike(rsp.data))
        .catch((error) => alert("server down Please try latter!!!"));
    }
  };
  useEffect(() => {
    getBookingDetails();
    const tm = setInterval(() => getBookingDetails(), 30000);
    return () => clearInterval(tm);
  }, []);

  const hideBookingDetails = () => {
    setTableShow(false);
  };

  let bikAmount = 0;
  let carAmount = 0;

  // car deletion and updation
  const [change, setChange] = useState({
    id: "",
    carId: "",
    days: "",
    quantity: "",
  });
  const [show, setShow] = useState(false);

  const update = (id, carId, day, quantity) => {
    setChange({ id: id, carId: carId, days: day, quantity: quantity });
    setShow(true);
  };

  const UpdateDetails = () => {
    if (change.days <= 0 || change.quantity <= 0) {
      alert("days or quantity cannot be zero");
      return;
    }
    if (!loggedStatus()) {
      axios
        .post("http://localhost:8090/vehicle/car/booked/update/", change, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((rsp) => {
          if (rsp.data == true) setShow(false);
          rsp.data == true
            ? alert("updated successfully")
            : alert("Entered data Invalid");
        });
    }

    setChange({
      id: "",
      carId: "",
      days: "",
      quantity: "",
    });
  };
  const deleteCar = (id) => {
    loggedStatus();
    if (id < 0) {
      alert("invalid id");
      return;
    }
    if (!loggedStatus()) {
      axios
        .delete(`http://localhost:8090/vehicle/car/booked/delete/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((rsp) => {
          rsp.data == true
            ? alert("Deleted sucessfully!!")
            : alert("Please Select properly!!");
        });
    }
  };

  // bike deletion and updation
  const [changeBike, setChangeBike] = useState({
    id: "",
    bikeId: "",
    days: "",
    quantity: "",
  });
  const [showBike, setShowBike] = useState(false);

  const updateBike = (id, bikeId, day, quantity) => {
    setChangeBike({ id: id, bikeId: bikeId, days: day, quantity: quantity });

    setShowBike(true);
  };

  const UpdateBikeDetails = () => {
    if (changeBike.days <= 0 || changeBike.quantity <= 0) {
      alert("days or quantity cannot be zero");
      return;
    }
    if (!loggedStatus()) {
      axios
        .post("http://localhost:8090/vehicle/bike/booked/update/", changeBike, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((rsp) => {
          if (rsp.data == true) setShowBike(false);
          rsp.data == true
            ? alert("updated successfully")
            : alert("Entered data Invalid");
        });
    }

    setChangeBike({
      id: "",
      bikeId: "",
      days: "",
      quantity: "",
    });
  };
  const deleteBike = (id) => {
    if (id < 0) {
      alert("invalid id");
      return;
    }
    if (!loggedStatus()) {
      axios
        .delete(`http://localhost:8090/vehicle/bike/booked/delete/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((rsp) => {
          rsp.data == true
            ? alert("Deleted sucessfully!!")
            : alert("Please Select properly!!");
        });
    }
  };

  const Cancle = (e) => {
    e.preventDefault();
    setShow(false);
    setShowBike(false);
  };

  return (
    <>
      <div className={styl.lgn}>
        {tableShow == false ? (
          <button onClick={getBookingDetails}>
            <h1>Booking-Details</h1>
          </button>
        ) : (
          ""
        )}
        <div className={styl.bg}>
          {tableShow == true && reserve.length > 0 ? (
            <>
              <h1>Car Booking Details</h1>
              <table border={1} className={styl.tbl}>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>UserId</th>
                    <th>Brand</th>
                    <th>Name</th>
                    <th>CarId</th>
                    <th>Quantity</th>
                    <th>Hire-Date</th>
                    <th>Days</th>
                    <th>Rate</th>
                    <th>Total Amount</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                {reserve.map(
                  (itm, i) => (
                    (carAmount += itm.totalPrice),
                    (
                      <tbody key={i}>
                        <tr>
                          <td>{itm.id}</td>
                          <td>{itm.userEmail}</td>
                          <td>{itm.carBrand}</td>
                          <td>{itm.carName}</td>
                          <td>{itm.carId}</td>
                          <td>{itm.totalQuantity}</td>
                          <td>{itm.hireDate}</td>
                          <td>{itm.days}</td>
                          <td>{itm.rate}</td>
                          <td>{itm.totalPrice}</td>
                          <td>
                            <button
                              onClick={(e) =>
                                update(
                                  itm.id,
                                  itm.carId,
                                  itm.days,
                                  itm.totalQuantity
                                )
                              }
                            >
                              Update
                            </button>
                          </td>
                          <td>
                            <button onClick={(e) => deleteCar(itm.id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    )
                  )
                )}
                <tfoot>
                  <tr>
                    <td>Total</td>
                    <td>Rs {carAmount}</td>
                  </tr>
                </tfoot>
              </table>
              <br></br>
              <br></br>
            </>
          ) : (
            ""
          )}
          {tableShow == true && reserveBike.length > 0 ? (
            <>
              <h1>Bike Booking Details</h1>
              <table border={1} className={styl.tbl}>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>UserId</th>
                    <th>Brand</th>
                    <th>Name</th>
                    <th>BikeId</th>
                    <th>Quantity</th>
                    <th>Hire-Date</th>
                    <th>Days</th>
                    <th>Rate</th>
                    <th>Total Amount</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                {reserveBike.map(
                  (itm, i) => (
                    (bikAmount += itm.totalPrice),
                    (
                      <tbody key={i}>
                        <tr>
                          <td>{itm.id}</td>
                          <td>{itm.userEmail}</td>
                          <td>{itm.bikeBrand}</td>
                          <td>{itm.bikeName}</td>
                          <td>{itm.bikeId}</td>
                          <td>{itm.totalQuantity}</td>
                          <td>{itm.hireDate}</td>
                          <td>{itm.days}</td>
                          <td>{itm.rate}</td>
                          <td>{itm.totalPrice}</td>
                          <td>
                            <button
                              onClick={(e) =>
                                updateBike(
                                  itm.id,
                                  itm.bikeId,
                                  itm.days,
                                  itm.totalQuantity
                                )
                              }
                            >
                              Update
                            </button>
                          </td>
                          <td>
                            <button onClick={(e) => deleteBike(itm.id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    )
                  )
                )}
                <tfoot>
                  <tr>
                    <td>Total</td>
                    <td>Rs {bikAmount}</td>
                  </tr>
                </tfoot>
              </table>
              <h1>Total Amount= Rs {bikAmount + carAmount}</h1>
            </>
          ) : (
            ""
          )}
          {show == true ? (
            <div>
              <br></br>
              <br></br>
              <label>
                Days:{" "}
                <input
                  type="number"
                  min={1}
                  placeholder="Enter days"
                  value={change.days}
                  onChange={(e) =>
                    setChange({ ...change, days: e.target.value })
                  }
                ></input>
              </label>
              <br></br>
              <br></br>
              <label>
                Quantity:{" "}
                <input
                  type="number"
                  min="1"
                  placeholder="Enter quantity"
                  value={change.quantity}
                  onChange={(e) =>
                    setChange({ ...change, quantity: e.target.value })
                  }
                ></input>
              </label>
              <br></br>
              <br></br>

              <button className={styl.btn} onClick={(e) => UpdateDetails(e)}>
                UpdateDetails
              </button>
              <button onClick={(e) => Cancle(e)}>Cancle</button>

              <br></br>
            </div>
          ) : (
            ""
          )}
          {showBike == true ? (
            <div>
              <br></br>
              <br></br>
              <label>
                Days:{" "}
                <input
                  type="number"
                  min={1}
                  placeholder="Enter days"
                  value={changeBike.days}
                  onChange={(e) =>
                    setChangeBike({ ...changeBike, days: e.target.value })
                  }
                ></input>
              </label>
              <br></br>
              <br></br>
              <label>
                Quantity:{" "}
                <input
                  type="number"
                  min="1"
                  placeholder="Enter quantity"
                  value={changeBike.quantity}
                  onChange={(e) =>
                    setChangeBike({ ...changeBike, quantity: e.target.value })
                  }
                ></input>
              </label>
              <br></br>
              <button onClick={(e) => UpdateBikeDetails(e)}>
                UpdateDetails
              </button>
              <button onClick={(e) => Cancle(e)}>Cancle</button>
            </div>
          ) : (
            ""
          )}

          <br></br>
          <br></br>
          {(reserve.length > 0 || reserveBike.length > 0) &&
          tableShow == true ? (
            <div>
              <button onClick={hideBookingDetails}>
                <h1>HideBookingDetails</h1>
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
export default BookingDetails;
