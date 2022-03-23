import { types } from "../types";
import { fetchToken } from "../../hooks/useFetch";
import Swal from "sweetalert2";

interface taskProps {
  title: string;
  description: string;
  created: any;
  user?: {};
}

export const startTaskCreate = (form: taskProps) => {
  return async (dispatch: any, getState: any) => {
    const { uid } = getState().auth;

    form.user = { uid: uid };
    console.log(form);
    const req = await fetchToken("task", form, "POST");
    const answ = await req.json();

    if (answ.status) {
      dispatch(taskCreate(form));
    } else {
      Swal.fire("Error", answ.msg, "error");
    }
    try {
    } catch (error) {}
  };
};

export const taskSetActive = (task: any) => ({
  type: types.taskSetActive,
  payload: task,
});

export const taskClearActive = () => ({
  type: types.taskClearActive,
});

const taskFetchAll = (tasks: any) => ({
  type: types.taskFetchAll,
  payload: tasks,
});

const taskDelete = (_id: string) => ({
  type: types.taskDelete,
  payload: _id,
});

const taskCreate = (task: taskProps) => ({
  type: types.taskCreate,
  payload: task,
});

const taskEdit = (task: any, _id: string) => ({
  type: types.taskEdit,
  payload: { task, _id },
});
