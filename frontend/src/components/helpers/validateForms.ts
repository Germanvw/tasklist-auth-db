import { uiSetError, uiClearError } from "../redux/actions/uiActions";

interface Form {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export const validateForms = (form: Form, dispatch: any) => {
  const { username, email, password, confirmPassword } = form;

  if (username && username.trim().length >= 4) {
    if (validateEmail(email)) {
      if (password.trim().length >= 6) {
        if (password === confirmPassword) {
          dispatch(uiClearError());
          return true;
        } else {
          dispatch(uiSetError("Passwords must match"));
          return false;
        }
      } else {
        dispatch(uiSetError("Password length must be 6 or higher"));
        return false;
      }
    } else {
      dispatch(uiSetError("Invalid email"));
      return false;
    }
  } else if (!username) {
    dispatch(uiSetError("Invalid username"));
    return false;
  } else {
    console.log(username);
    if (validateEmail(email)) {
      if (password.trim().length >= 6) {
        dispatch(uiClearError());
        return true;
      } else {
        dispatch(uiSetError("Password length must be 6 or higher"));
        return false;
      }
    } else {
      dispatch(uiSetError("Invalid email"));
      return false;
    }
  }
};

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
