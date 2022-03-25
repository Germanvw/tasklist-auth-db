import { types } from "../types";

import Swal, { SweetAlertOptions } from "sweetalert2";
import { fetchNoToken, fetchToken } from "../../hooks/useFetch";

export const startAuthLogin = (form: { email: string; password: string }) => {
  return async (dispatch: any) => {
    const req = await fetchNoToken("auth/login", form, "POST");
    const answ = await req.json();

    if (answ.status) {
      localStorage.setItem("x-token", answ.token);

      dispatch(authLogin({ uid: answ.uid, username: answ.username }));
    } else {
      localStorage.removeItem("x-token");
      Swal.fire("Error", answ.msg, "error");
    }
  };
};

export const startAuthRegister = async (
  form: {
    username: string;
    email: string;
    password: string;
  },
  navigate: any
) => {
  const req = await fetchNoToken("auth/register", form, "POST");
  const answ = await req.json();

  if (answ.status) {
    // Successful registration
    Swal.fire({
      title: "Success",
      text: "User registrated correctly",
      icon: "success",
    } as SweetAlertOptions).then((result) => {
      if (result.value) {
        navigate("/login", { replace: true });
      }
    });
  } else {
    //Register error
    Swal.fire("Error", answ.msg, "error");
  }
};

export const startAuthValidation = () => {
  return async (dispatch: any) => {
    const req = await fetchToken("auth/renew", {});

    const answ = await req.json();
    if (answ.status) {
      localStorage.setItem("x-token", answ.token);

      dispatch(
        authLogin({
          uid: answ.uid,
          username: answ.name,
        })
      );
    } else {
      //Register error
      localStorage.removeItem("x-token");
      dispatch(authEndValidation());
    }
  };
};

const authEndValidation = () => ({
  type: types.authEndValidation,
});

const authLogin = (user: { uid: string; username: string }) => ({
  type: types.authLogin,
  payload: user,
});
const authLogout = () => ({
  type: types.authLogout,
});
