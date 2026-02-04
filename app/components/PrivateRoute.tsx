import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/localStorageHelpers";
import type { JSX } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isLoggedIn() ? children : <Navigate to="/" replace />; 
};

export default PrivateRoute;
