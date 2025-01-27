import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <h1>
        Page not found go back to home page <NavLink to="/">click</NavLink>
      </h1>
    </>
  );
};
export default PageNotFound;
