import styl from "../style/login.module.css";
import axios from "axios";
import { useState } from "react";
import cl from "../style/color.module.css";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "./JwtToken";
const Car = () => {
  const rd = useNavigate();
  const token = sessionStorage.getItem("token");
  const loggedStatus = () => {
    if (isTokenValid(token)) {
      alert("Session Expire !!! Please Login Again");
      rd("/login", { replace: true });
    }
  };

  // car info
  const [carInfo, setCarInfo] = useState({
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
    mileage: "",
  });

  //image variable
  const [image, setImage] = useState();

  //object for form validation field
  const [error, setError] = useState({});

  // setting carinfo with user input with one method
  const carInput = (e) => {
    setCarInfo({ ...carInfo, [e.target.name]: e.target.value });
  };

  // saving only image name
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  //posting carinfo with api call
  const submit = async (e) => {
    e.preventDefault();
    const er = formValidation(carInfo);
    setError(er);
    //helps to combine both data and files
    const formData = new FormData();
    //addding image file to formdata
    formData.append("image", image);
    //addding carinfo as json as backend takes object(json)
    formData.append(
      "dto",
      new Blob([JSON.stringify(carInfo)], { type: "application/json" })
    );

    if (!loggedStatus()) {
      const ans = await axios
        .post("http://localhost:8090/vehicle/car/create", formData, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((rsp) => {
          if (rsp.data) alert("Car Added Sucessfully!!");
          setCarInfo({
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
            mileage: "",
          });
        })
        .catch((error) => alert("Server Down Please Try Later!!"));
    }
  };

  //field validation
  const formValidation = (info) => {
    const error = {};

    if (!info.brand.trim()) error.brand = "Brand  is required";

    if (!info.name.trim()) error.name = "Name is required";

    if (!info.price.trim()) error.price = "Price  is required";

    if (!info.transmission.trim())
      error.transmission = "Transmission  is required";

    if (!info.type.trim()) error.type = "Type  is required";

    if (!info.model.trim()) error.model = "Model  is required";
    if (!info.mileage.trim()) error.mileage = "Mileage  is required";

    if (!info.date.trim()) error.date = "Date  is required";

    if (!info.color.trim()) error.color = "Color  is required";

    if (!info.description.trim())
      error.description = "Description  is required";

    if (!info.quantity.trim()) error.color = "Quantity is required";

    return error;
  };

  return (
    <>
      <form className={styl.lgn}>
        <h1>Register Car</h1>
        <label>
          Brand:
          <input
            type="text"
            name="brand"
            value={carInfo.brand}
            onChange={(e) => carInput(e)}
            placeholder="Enter car brand"
          ></input>
        </label>
        <br></br>
        {error.brand && <span className={cl.text}>{error.brand} </span>}

        <br></br>
        <br></br>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={carInfo.name}
            onChange={(e) => carInput(e)}
            placeholder="Enter car name"
          ></input>
        </label>
        <br></br>
        {error.name && <span className={cl.text}>{error.name} </span>}
        <br></br>
        <br></br>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={carInfo.description}
            onChange={(e) => carInput(e)}
            placeholder="Enter car description"
          ></input>
        </label>
        <br></br>
        {error.description && (
          <span className={cl.text}>{error.description} </span>
        )}
        <br></br>
        <br></br>
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={carInfo.type}
            onChange={(e) => carInput(e)}
            placeholder="Enter car type"
          ></input>
        </label>
        <br></br>
        {error.type && <span className={cl.text}>{error.type} </span>}
        <br></br>
        <br></br>
        <label>
          Model:{" "}
          <input
            type="text"
            name="model"
            value={carInfo.model}
            onChange={(e) => carInput(e)}
            placeholder="Enter car model"
          ></input>
        </label>
        <br></br>
        {error.model && <span className={cl.text}>{error.model} </span>}
        <br></br>
        <br></br>
        <label>
          Mileage:
          <input
            type="text"
            name="mileage"
            value={carInfo.mileage}
            onChange={(e) => carInput(e)}
            placeholder="Enter car mileager"
          ></input>
        </label>
        <br></br>
        {error.mileage && <span className={cl.text}>{error.mileage} </span>}
        <br></br>
        <br></br>
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={carInfo.price}
            onChange={(e) => carInput(e)}
            placeholder="Enter car price"
          ></input>
        </label>
        <br></br>
        {error.price && <span className={cl.text}>{error.price} </span>}
        <br></br>
        <br></br>
        <label>
          Quantity:
          <input
            type="text"
            name="quantity"
            value={carInfo.quantity}
            onChange={(e) => carInput(e)}
            placeholder="Enter number of car"
          ></input>
        </label>
        <br></br>
        {error.quantity && <span className={cl.text}>{error.quantity} </span>}
        <br></br>
        <br></br>
        <label>
          Transmission:{" "}
          <input
            type="text"
            name="transmission"
            value={carInfo.transmission}
            onChange={(e) => carInput(e)}
            placeholder="Enter car transmission"
          ></input>
        </label>
        <br></br>
        {error.transmission && (
          <span className={cl.text}>{error.transmission} </span>
        )}
        <br></br>
        <br></br>
        <label>
          Color:{" "}
          <input
            type="text"
            name="color"
            value={carInfo.color}
            onChange={(e) => carInput(e)}
            placeholder="Enter car color"
          ></input>
        </label>
        <br></br>
        {error.color && <span className={cl.text}>{error.color} </span>}
        <br></br>
        <br></br>

        <label>
          Date:{" "}
          <input
            type="date"
            name="date"
            value={carInfo.date}
            onChange={(e) => carInput(e)}
            placeholder="select car release date"
          ></input>
        </label>
        <br></br>
        {error.date && <span className={cl.text}>{error.date} </span>}
        <br></br>
        <br></br>
        <label>
          Picture:<input type="file" onChange={(e) => handleImage(e)}></input>
        </label>
        <br></br>
        <br></br>
        <button value={image} onClick={(e) => submit(e)}>
          <br></br>
          submit
        </button>
      </form>
    </>
  );
};
export default Car;
