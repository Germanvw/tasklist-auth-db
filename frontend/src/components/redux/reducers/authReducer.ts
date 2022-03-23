import { types } from "../types";

interface stateProp {
  validating: boolean;
  username?: string;
  email?: string;
}

const initialState: stateProp = {
  validating: true,
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        validating: false,
      };
    case types.authLogout:
      return {
        validating: false,
      };

    case types.authEndValidation:
      return {
        ...state,
        validating: false,
      };

    default:
      return state;
  }
};
