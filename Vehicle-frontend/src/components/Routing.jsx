import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import LoggedIn from "./LoggedIn";
import Car from "./Car";
import Logout from "./Logout";
import CarDashboard from "./CarDashboard";
import PageNotFound from "./PageNotFound";
import Bike from "./Bike";
import UnSignedCarHome from "./UnsignedCarHome";
import AdminNavbar from "./AdminNavbar";
import AllCar from "./AllCar";
import AllBike from "./AllBike";
import AdminLogout from "./AdminLogout";
import User from "./User";
import BookedVehicle from "./BookedVehicle";
import BikeDashboard from "./BikeDashboard";
import BookingDetails from "./BookingDetails";
import AdminProtect from "./AdminProtect";
import UserProtect from "./UserProtect";
import UnSignedBikeHome from "./UnsignedBikeHome";

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          //unsigned user
          <Route path="/" element={<UnSignedCarHome />} />
          <Route path="/car" element={<UnSignedCarHome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bike" element={<UnSignedBikeHome />} />
          //for Admin
          <Route element={<AdminProtect />}>
            <Route path="/admin" element={<AdminNavbar />}>
              <Route path="carregister" element={<Car />} />
              <Route path="bikeregister" element={<Bike />} />
              <Route path="cars" element={<AllCar />} />
              <Route path="bikes" element={<AllBike />} />
              <Route path="users" element={<User />} />
              <Route path="bookedvehicle" element={<BookedVehicle />}></Route>
              <Route path="logout" element={<AdminLogout />} />
            </Route>
          </Route>
          // for client
          <Route element={<UserProtect />}>
            <Route path="/user" element={<LoggedIn />}>
              <Route path="carbook" element={<CarDashboard />} />
              <Route path="bikebook" element={<BikeDashboard />}></Route>
              <Route path="bookingdetails" element={<BookingDetails />}></Route>
              <Route path="logout" element={<Logout />}></Route>
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Routing;
