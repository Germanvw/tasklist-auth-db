import { Homepage } from "../pages/Homepage/Homepage";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";

interface Props {
  path: string;
  name: string;
  Component: () => JSX.Element;
}

export const unauthRoutes: Props[] = [
  {
    path: "/login",
    name: "Login",
    Component: Login,
  },
  {
    path: "/register",
    name: "Register",
    Component: Register,
  },
];

export const authRoutes: Props[] = [
  {
    path: "/",
    name: "Homepage",
    Component: Homepage,
  },
];
