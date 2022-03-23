import { types } from "../types";

interface Props {
  modalOpen: boolean;
  loading: boolean;
  errorMsg: boolean | null;
  darkMode: boolean;
}

const initialState: Props = {
  modalOpen: false,
  loading: false,
  errorMsg: null,
  darkMode: false,
};

export const uiReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.uiChangeTheme:
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    case types.uiOpenModal:
      return {
        ...state,
        modalOpen: true,
      };

    case types.uiCloseModal:
      return {
        ...state,
        modalOpen: false,
      };

    case types.uiSetError:
      return {
        ...state,
        errorMsg: action.payload,
      };

    case types.uiClearError:
      return {
        ...state,
        errorMsg: null,
      };

    default:
      return state;
  }
};
