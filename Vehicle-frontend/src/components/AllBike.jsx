import axios from "axios";
import { useEffect, useState } from "react";
import styl from "../style/login.module.css";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "./JwtToken";
const AllBike = () => {
  const rd = useNavigate();
  const token = sessionStorage.getItem("token");
  const loggedStatus = () => {
    if (isTokenValid(token)) {
      alert("Session Expire !!! Please Login Again");
      rd("/login", { replace: true });
    }
  };

  const [bike, setBike] = useState([]);
  useEffect(() => {
    if (!loggedStatus()) {
      axios
        .get("http://localhost:8090/vehicle/bike/")
        .then((rsp) => setBike(rsp.data));
    }
  }, []);

  //deletion of registered bike
  const bikeDelete = (e, id) => {
    e.preventDefault();
    if (!loggedStatus()) {
      axios
        .delete(`http://localhost:8090/vehicle/bike/delete/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((rsp) => {
          rsp.data == true
            ? alert("Deleted Sucessfully !!!")
            : alert("Please Select Properly !!!");
        });
    }
  };

  //updation of registered bike
  const [update, setUpdate] = useState();

  // to show update field
  const [show, setShow] = useState(false);

  const bikeUpdate = (e, bike) => {
    e.preventDefault();
    setUpdate({
      id: bike.id,
      name: bike.name,
      brand: bike.brand,
      model: bike.model,
      date: bike.date,
      engineCapacity: bike.engineCapacity,
      mileage: bike.mileage,
      tank: bike.tank,
      speed: bike.speed,
      engineStart: bike.engineStart,
      quantity: bike.quantity,
      rate: bike.rate,
    });
    setShow(true);
  };

  //updating values
  const updateInput = (e) => {
    e.preventDefault();
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  //validating input fields
  const [errors, setErrors] = useState({});

  const validate = (bik) => {
    const errors = {};
    if (!bik.name.trim()) errors.name = "Name is requird";
    if (!bik.model.trim()) errors.model = "Model is requird";
    if (!bik.engineCapacity.trim())
      errors.engineCapacity = "EngineCapacity is requird";
    if (!bik.mileage.trim()) errors.mileage = "Mileage is requird";
    if (!bik.tank.trim()) errors.tank = "Tank Capacity is requird";
    if (!bik.speed.trim()) errors.speed = "Speed is requird";
    if (!bik.engineStart.trim()) errors.engineStart = "EngineStart is requird";
    if (!bik.date) errors.date = "Date is requird";
    if (!bik.quantity) errors.quantity = "Quantity is requird";
    if (!bik.rate) errors.rate = "Rate is requird";

    return errors;
  };

  //updating in db
  const updateBike = async (e) => {
    e.preventDefault();
    const er = validate(update);
    setErrors(er);
    if (Object.keys(er).length == 0 && !loggedStatus()) {
      await axios
        .put("http://localhost:8090/vehicle/bike/update", update, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((rsp) => {
          rsp.data == true
            ? alert("Updated Sucessfully !!!")
            : alert("Please Enter all field Properly !!!");
        })
        .catch((error) => alert("Server not responding Please try later!!!"));

      setUpdate({
        id: "",
        name: "",
        brand: "",
        model: "",
        date: "",
        engineCapacity: "",
        mileage: "",
        tank: "",
        speed: "",
        engineStart: "",
        quantity: "",
        rate: "",
      });
    }
  };
  const cancel = (e) => {
    e.preventDefault();
    setShow(false);
  };
  return (
    <>
      <div className={styl.lgn}>
        <table border={2} className={styl.tbl}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Brand</th>
              <th>Name</th>
              <th>Model</th>
              <th>Tank</th>
              <th>EngineCapacity</th>
              <th>EngineStart</th>
              <th>Mileage</th>
              <th>Speed</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Release Date</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          {bike.map((itm, i) => (
            <tbody key={i}>
              <tr>
                <td>{itm.id}</td>
                <td>{itm.brand}</td>
                <td>{itm.name}</td>
                <td>{itm.model}</td>
                <td>{itm.tank}</td>
                <td>{itm.engineCapacity}</td>
                <td>{itm.engineStart}</td>
                <td>{itm.mileage}</td>
                <td>{itm.speed}</td>
                <td>{itm.quantity}</td>
                <td>{itm.rate}</td>
                <td>{itm.date}</td>

                <td>
                  <button
                    onClick={(e) => {
                      bikeUpdate(e, itm);
                    }}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button onClick={(e) => bikeDelete(e, itm.id)}>Delete</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>

        {show == true ? (
          <form className={styl.lgn} onSubmit={updateBike}>
            <div>
              <h1>Update Two Wheeler</h1>
              <label>
                Id <input type="text" value={update.id} readOnly></input>
              </label>
              <br></br> <br></br>
              <label>
                Brand <input type="text" value={update.brand} readOnly></input>
              </label>
              <br></br> <br></br>
              <label>
                Name{" "}
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  onChange={(e) => updateInput(e)}
                  value={update.name}
                ></input>
              </label>
              <br></br>
              {errors.name && <span className={styl.text}>{errors.name}</span>}
              <br></br> <br></br>
              <label>
                Model{" "}
                <input
                  type="text"
                  name="model"
                  placeholder="Enter Model"
                  value={update.model}
                  onChange={(e) => updateInput(e)}
                ></input>
              </label>
              <br></br>
              {errors.model && (
                <span className={styl.text}>{errors.model}</span>
              )}
              <br></br>
              <br></br>
              <label>
                EngineCapacity{" "}
                <input
                  type="text"
                  name="engineCapacity"
                  onChange={(e) => updateInput(e)}
                  value={update.engineCapacity}
                  placeholder="Enter EngineCapacity"
                ></input>
                <br></br>
                {errors.engineCapacity && (
                  <span className={styl.text}>{errors.engineCapacity}</span>
                )}
              </label>
              <br></br> <br></br>
              <label>
                Mileage{" "}
                <input
                  type="text"
                  name="mileage"
                  placeholder="Enter Mileage"
                  onChange={(e) => updateInput(e)}
                  value={update.mileage}
                ></input>{" "}
              </label>
              <br></br>
              {errors.mileage && (
                <span className={styl.text}>{errors.mileage}</span>
              )}
              <br></br> <br></br>
              <label>
                Tank{" "}
                <input
                  type="text"
                  name="tank"
                  placeholder="Enter Tank Capacity "
                  onChange={(e) => updateInput(e)}
                  value={update.tank}
                ></input>
              </label>
              <br></br>
              {errors.tank && <span className={styl.text}>{errors.tank}</span>}
              <br></br> <br></br>
              <label>
                Speed{" "}
                <input
                  type="text"
                  name="speed"
                  placeholder="Enter Top Speed"
                  onChange={(e) => updateInput(e)}
                  value={update.speed}
                ></input>
              </label>
              <br></br>
              {errors.speed && (
                <span className={styl.text}>{errors.speed}</span>
              )}
              <br></br> <br></br>
              <label>
                EngineStart{" "}
                <input
                  type="text"
                  name="engineStart"
                  placeholder="Enter Engine Start"
                  value={update.engineStart}
                  onChange={(e) => updateInput(e)}
                ></input>
              </label>
              <br></br>
              {errors.engineStart && (
                <span className={styl.text}>{errors.engineStart}</span>
              )}
              <br></br>
              <br></br>
              <label>
                Quantity{" "}
                <input
                  type="text"
                  name="quantity"
                  placeholder="Ente  Quantity"
                  onChange={(e) => updateInput(e)}
                  value={update.quantity}
                ></input>
              </label>
              <br></br>
              {errors.quantity && (
                <span className={styl.text}>{errors.quantity}</span>
              )}
              <br></br>
              <br></br>
              <label>
                Rate{" "}
                <input
                  type="text"
                  name="rate"
                  placeholder="Enter Rate"
                  onChange={(e) => updateInput(e)}
                  value={update.rate}
                ></input>{" "}
              </label>
              <br></br>
              {errors.rate && <span className={styl.text}>{errors.rate}</span>}
              <br></br>
              <br></br>
              <label>
                Date{" "}
                <input
                  type="date"
                  value={update.date}
                  name="date"
                  onChange={(e) => updateInput(e)}
                ></input>
              </label>
              <br></br>
              {errors.date && <span className={styl.text}>{errors.date}</span>}
              <br></br>
              <br></br>
              <button className={styl.btn}>Update</button>
              <button onClick={(e) => cancel(e)}>Cancle</button>
            </div>
          </form>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default AllBike;
