import { types } from "../types";

export const uiChangeTheme = () => ({
  type: types.uiChangeTheme,
});

export const uiOpenModal = () => ({
  type: types.uiOpenModal,
});

export const uiCloseModal = () => ({
  type: types.uiCloseModal,
});

export const uiSetError = (error: string) => ({
  type: types.uiSetError,
  payload: error,
});

export const uiClearError = () => ({
  type: types.uiClearError,
});
