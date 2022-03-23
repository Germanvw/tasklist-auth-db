import { combineReducers } from "redux";

import { uiReducer } from "./uiReducer";
import { authReducer } from "./authReducer";
import { taskReducer } from "./taskReducer";

export const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  task: taskReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
