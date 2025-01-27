import axios from "axios";
import { useState, useEffect } from "react";
import cl from "../style/color.module.css";
import styl from "../style/login.module.css";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "./JwtToken";

const Bike = () => {
  const rd = useNavigate();
  const token = sessionStorage.getItem("token");
  const loggedStatus = () => {
    if (isTokenValid(token)) {
      alert("Session Expire !!! Please Login Again");
      rd("/login", { replace: true });
    }
  };
  //bike basic info
  const [bike, setBike] = useState({
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

  // image of bike
  const [image, setImage] = useState();

  //errors for feild
  const [errors, setErrors] = useState({});

  //validating feilds
  const validate = (bike) => {
    const errors = {};
    if (!bike.brand.trim()) errors.brand = "Brand is requird";
    if (!bike.name.trim()) errors.name = "Name is requird";
    if (!bike.model.trim()) errors.model = "Model is requird";
    if (!bike.engineCapacity.trim())
      errors.engineCapacity = "EngineCapacity is requird";
    if (!bike.mileage.trim()) errors.mileage = "Mileage is requird";
    if (!bike.tank.trim()) errors.tank = "Tank Capacity is requird";
    if (!bike.speed.trim()) errors.speed = "Speed is requird";
    if (!bike.engineStart.trim()) errors.engineStart = "EngineStart is requird";
    if (!bike.date) errors.date = "Date is requird";
    if (!bike.quantity) errors.quantity = "Quantity is requird";
    if (!bike.rate) errors.rate = "Rate is requird";
    if (!image) errors.image = "file is required";
    return errors;
  };

  //submitting bike details
  const submit = async (e) => {
    e.preventDefault();
    const er = validate(bike);
    setErrors(er);
    if (Object.keys(er).length != 0) {
      alert("required all field values!!!");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    formData.append(
      "dto",
      new Blob([JSON.stringify(bike)], { type: "application/json" })
    );

    if (!loggedStatus()) {
      const ans = await axios
        .post("http://localhost:8090/vehicle/bike/create", formData, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((rsp) => {
          rsp.data == true
            ? alert("Two Wheeler added Successfully")
            : "Please enter all requird feild";
        });
    }

    setBike({
      name: "",
      brand: "",
      model: "",
      engineCapacity: "",
      mileage: "",
      tank: "",
      speed: "",
      engineStart: "",
      date: "",
      quantity: "",
      rate: "",
    });
    setImage("");
  };

  const input = (e) => {
    setBike({ ...bike, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className={styl.lgn}>
        <h1>Register Two Wheeler</h1>
        <input
          type="text"
          name="brand"
          placeholder="Enter Brand"
          value={bike.brand}
          onChange={(e) => input(e)}
        ></input>
        <br></br>
        {errors.brand && <span className={cl.text}>{errors.brand}</span>}
        <br></br> <br></br>
        <input
          type="text"
          name="name"
          placeholder="Ente  Name"
          onChange={(e) => input(e)}
          value={bike.name}
        ></input>
        <br></br>
        {errors.name && <span className={cl.text}>{errors.name}</span>}
        <br></br> <br></br>
        <input
          type="text"
          name="model"
          placeholder="Enter Model"
          value={bike.model}
          onChange={(e) => input(e)}
        ></input>
        <br></br>
        {errors.model && <span className={cl.text}>{errors.model}</span>}
        <br></br>
        <br></br>
        <input
          type="text"
          name="engineCapacity"
          placeholder="Enter Engine Capacity"
          onChange={(e) => input(e)}
          value={bike.engineCapacity}
        ></input>
        <br></br>
        {errors.engineCapacity && (
          <span className={cl.text}>{errors.engineCapacity}</span>
        )}
        <br></br> <br></br>
        <input
          type="text"
          name="mileage"
          placeholder="Enter Mileage"
          onChange={(e) => input(e)}
          value={bike.mileage}
        ></input>
        <br></br>
        {errors.mileage && <span className={cl.text}>{errors.mileage}</span>}
        <br></br> <br></br>
        <input
          type="text"
          name="tank"
          placeholder="Enter Tank Capacity "
          onChange={(e) => input(e)}
          value={bike.tank}
        ></input>
        <br></br>
        {errors.tank && <span className={cl.text}>{errors.tank}</span>}
        <br></br> <br></br>
        <input
          type="text"
          name="speed"
          placeholder="Enter Top Speed"
          onChange={(e) => input(e)}
          value={bike.speed}
        ></input>
        <br></br>
        {errors.speed && <span className={cl.text}>{errors.speed}</span>}
        <br></br> <br></br>
        <input
          type="text"
          name="engineStart"
          placeholder="Enter Engine Start"
          value={bike.engineStart}
          onChange={(e) => input(e)}
        ></input>
        <br></br>
        {errors.engineStart && (
          <span className={cl.text}>{errors.engineStart}</span>
        )}
        <br></br>
        <br></br>
        <input
          type="text"
          name="quantity"
          placeholder="Ente  Quantity"
          onChange={(e) => input(e)}
          value={bike.quantity}
        ></input>
        <br></br>
        {errors.quantity && <span className={cl.text}>{errors.quantity}</span>}
        <br></br>
        <br></br>
        <input
          type="text"
          name="rate"
          placeholder="Enter Rate"
          onChange={(e) => input(e)}
          value={bike.rate}
        ></input>
        <br></br>
        {errors.rate && <span className={cl.text}>{errors.rate}</span>}
        <br></br>
        <br></br>
        <input
          type="date"
          value={bike.date}
          name="date"
          onChange={(e) => input(e)}
        ></input>
        <br></br>
        {errors.date && <span className={cl.text}>{errors.date}</span>}
        <br></br>
        <br></br>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        ></input>
        <br></br>
        {errors.image && <span className={cl.text}>{errors.image}</span>}
        <br></br>
        <br></br>
        <button onClick={(e) => submit(e)}>Sumbit</button>
      </div>
    </>
  );
};
export default Bike;
