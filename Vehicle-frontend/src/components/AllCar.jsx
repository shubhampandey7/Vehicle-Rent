import axios from "axios";
import { useEffect, useState } from "react";
import styl from "../style/login.module.css";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "./JwtToken";
const AllCar = () => {
  const rd = useNavigate();
  const token = sessionStorage.getItem("token");
  const loggedStatus = () => {
    if (isTokenValid(token)) {
      alert("Session Expire !!! Please Login Again");
      rd("/login", { replace: true });
    }
  };

  const [car, setCar] = useState([]);
  useEffect(() => {
    if (!loggedStatus()) {
      axios
        .get("http://localhost:8090/vehicle/car/")
        .then((rsp) => setCar(rsp.data));
    }
  }, []);

  //selecting car which needs to update
  const [updateCar, setUpdateCar] = useState({});
  const [show, setShow] = useState(false);
  const update = (e, car) => {
    e.preventDefault();
    setShow(true);
    setUpdateCar({
      id: car.id,
      name: car.name,
      type: car.type,
      brand: car.brand,
      transmission: car.transmission,
      date: car.date,
      description: car.description,
      color: car.color,
      price: car.price,
      model: car.model,
      quantity: car.quantity,
    });
  };
  //field validation
  const [error, setError] = useState({});
  const validate = (info) => {
    const error = {};

    if (!info.brand.trim()) error.brand = "Brand  is required";

    if (!info.name.trim()) error.name = "Name is required";

    if (!info.price) error.price = "Price  is required";

    if (!info.transmission.trim())
      error.transmission = "Transmission  is required";

    if (!info.type.trim()) error.type = "Type  is required";

    if (!info.model.trim()) error.model = "Model  is required";

    if (!info.date.trim()) error.date = "Date  is required";

    if (!info.color.trim()) error.color = "Color  is required";

    if (!info.description.trim())
      error.description = "Description  is required";

    if (!info.quantity) error.color = "Quantity is required";

    return error;
  };

  //update filed input
  const carInput = (e) => {
    e.preventDefault();
    setUpdateCar({ ...updateCar, [e.target.name]: e.target.value });
  };

  const updateCarInfo = (e) => {
    e.preventDefault();
    const er = validate(updateCar);
    setError(er);
    if (Object.keys(er).length > 0) {
      alert("All Field value Required!!!");
      return;
    }
    if (!loggedStatus()) {
      axios
        .put("http://localhost:8090/vehicle/car/update", updateCar, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((rsp) => alert("Car Updated Successfully!!!"))
        .catch((error) => alert("Server down Please try later!!!"));

      setUpdateCar({
        id: "",
        name: "",
        type: "",
        brand: "",
        transmission: "",
        date: "",
        description: "",
        color: "",
        price: "",
        model: "",
        quantity: "",
      });
    }
  };
  const deleteCar = (e, id) => {
    e.preventDefault();
    if (!loggedStatus()) {
      axios
        .delete(`http://localhost:8090/vehicle/car/delete/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((rsp) => {
          rsp.data == true
            ? alert("Deleted Successfully!!!")
            : alert("Something went Wrong");
        })
        .catch((error) => alert("Serever down Please try latter!!"));
    }
  };
  const cancle = (e) => {
    e.preventDefault();
    setShow(false);
  };
  return (
    <>
      <div className={styl.lgn}>
        <h1>All Cars Details</h1>
        <table border={2} className={styl.tbl}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Brand</th>
              <th>Name</th>
              <th>Model</th>
              <th>Type</th>
              <th>Color</th>
              <th>Transmission</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Release Date</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          {car.map((itm, i) => (
            <tbody key={i}>
              <tr>
                <td>{itm.id}</td>
                <td>{itm.brand}</td>
                <td>{itm.name}</td>
                <td>{itm.model}</td>
                <td>{itm.type}</td>
                <td>{itm.color}</td>
                <td>{itm.transmission}</td>
                <td>{itm.description}</td>
                <td>{itm.quantity}</td>
                <td>{itm.price}</td>
                <td>{itm.date}</td>

                <td>
                  <button onClick={(e) => update(e, itm)}>Update</button>
                </td>
                <td>
                  <button onClick={(e) => deleteCar(e, itm.id)}>Delete</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        {show == true ? (
          <form className={styl.lgn}>
            <h1>Update Car</h1>
            <label>
              Id:
              <input
                type="text"
                name="id"
                value={updateCar.id}
                onChange={(e) => carInput(e)}
                readOnly
              ></input>
            </label>

            <br></br>
            <br></br>
            <label>
              Brand:
              <input
                type="text"
                name="brand"
                value={updateCar.brand}
                readOnly
              ></input>
            </label>
            <br></br>
            <br></br>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={updateCar.name}
                onChange={(e) => carInput(e)}
                placeholder="Enter car name"
              ></input>
            </label>
            <br></br>
            {error.name && <span className={styl.text}>{error.name} </span>}

            <br></br>
            <br></br>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={updateCar.description}
                onChange={(e) => carInput(e)}
                placeholder="Enter car description"
              ></input>
            </label>
            <br></br>
            {error.description && (
              <span className={styl.text}>{error.description} </span>
            )}
            <br></br>
            <br></br>
            <label>
              Type:
              <input
                type="text"
                name="type"
                value={updateCar.type}
                onChange={(e) => carInput(e)}
                placeholder="Enter car type"
              ></input>
            </label>
            <br></br>
            {error.type && <span className={styl.text}>{error.type} </span>}
            <br></br>
            <br></br>
            <label>
              Model:{" "}
              <input
                type="text"
                name="model"
                value={updateCar.model}
                onChange={(e) => carInput(e)}
                placeholder="Enter car model"
              ></input>
            </label>
            <br></br>
            {error.model && <span className={styl.text}>{error.model} </span>}
            <br></br>
            <br></br>
            <label>
              Price:
              <input
                type="text"
                name="price"
                value={updateCar.price}
                onChange={(e) => carInput(e)}
                placeholder="Enter car price"
              ></input>
            </label>
            <br></br>
            {error.price && <span className={styl.text}>{error.price} </span>}
            <br></br>
            <br></br>
            <label>
              Quantity:
              <input
                type="text"
                name="quantity"
                value={updateCar.quantity}
                onChange={(e) => carInput(e)}
                placeholder="Enter number of car"
              ></input>
            </label>
            <br></br>
            {error.transmission && (
              <span className={styl.text}>{error.quantity} </span>
            )}
            <br></br>
            <br></br>
            <label>
              Transmission:{" "}
              <input
                type="text"
                name="transmission"
                value={updateCar.transmission}
                onChange={(e) => carInput(e)}
                placeholder="Enter car transmission"
              ></input>
            </label>
            <br></br>
            {error.transmission && (
              <span className={styl.text}>{error.transmission} </span>
            )}
            <br></br>
            <br></br>
            <label>
              Color:{" "}
              <input
                type="text"
                name="color"
                value={updateCar.color}
                onChange={(e) => carInput(e)}
                placeholder="Enter car color"
              ></input>
            </label>
            <br></br>
            {error.color && <span className={styl.text}>{error.color} </span>}
            <br></br>
            <br></br>

            <label>
              Date:{" "}
              <input
                type="date"
                name="date"
                value={updateCar.date}
                onChange={(e) => carInput(e)}
                placeholder="select car release date"
              ></input>
            </label>
            <br></br>
            {error.date && <span className={styl.text}>{error.date} </span>}
            <br></br>
            <br></br>
            <button className={styl.btn} onClick={(e) => updateCarInfo(e)}>
              Update
            </button>
            <button onClick={(e) => cancle(e)}>Cancle</button>
          </form>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default AllCar;
