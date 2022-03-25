import { types } from "../types";
import { Reducer } from "redux";

interface taskProps {
  tasks: [];
  active: string | null;
}

const initialState: taskProps = {
  tasks: [],
  active: null,
};

export const taskReducer: Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.taskSetActive:
      return {
        ...state,
        active: action.payload,
      };
    case types.taskClearActive:
      return { ...state, active: null };

    case types.taskFetchAll:
      return {
        ...state,
        tasks: action.payload,
      };
    case types.taskCreate:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        active: null,
      };
    case types.taskEdit:
      return {
        ...state,
        tasks: state.tasks.map((task: any) =>
          task._id === action.payload._id ? action.payload : task
        ),
        active: null,
      };
    case types.taskDelete:
      return {
        ...state,
        tasks: state.tasks.filter((task: any) => task._id !== action.payload),
        active: null,
      };
    default:
      return state;
  }
};
