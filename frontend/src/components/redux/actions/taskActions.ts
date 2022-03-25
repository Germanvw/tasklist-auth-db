import { types } from "../types";
import { fetchToken } from "../../hooks/useFetch";
import Swal from "sweetalert2";

interface taskProps {
  title: string;
  description: string;
  created?: any;
  user?: {};
}

export const startTaskCreate = (form: taskProps) => {
  return async (dispatch: any, getState: any) => {
    const { uid } = getState().auth;

    form.user = { uid: uid };
    form.created = new Date().getDate();
    const req = await fetchToken("task", form, "POST");
    const answ = await req.json();
    if (answ.status) {
      dispatch(taskCreate(answ.task));
      Swal.fire("Success", "Task created successfully", "success");
    } else {
      Swal.fire("Error", answ.msg, "error");
    }
    try {
    } catch (error) {}
  };
};

export const startTaskEdit = (form: taskProps) => {
  return async (dispatch: any, getState: any) => {
    const { active } = getState().task;
    form.user = { uid: active.uid };
    form.created = active.created;
    const req = await fetchToken(`task/${active._id}`, form, "PUT");
    const answ = await req.json();
    if (answ.status) {
      dispatch(taskEdit(answ.task));
      Swal.fire("Success", "Task edited successfully", "success");
    } else {
      Swal.fire("Error", answ.msg, "error");
    }
    try {
    } catch (error) {}
  };
};

export const startTaskDelete = (_id: string) => {
  return async (dispatch: any) => {
    const req = await fetchToken(`task/${_id}`, {}, "DELETE");
    const answ = await req.json();
    if (answ.status) {
      dispatch(taskDelete(_id));
      Swal.fire("Success", "Task deleted successfully", "success");
    } else {
      Swal.fire("Error", answ.msg, "error");
    }
    try {
    } catch (error) {}
  };
};

export const startTaskFetchAll = () => {
  return async (dispatch: any) => {
    const req = await fetchToken(`task`, {}, "GET");
    const tasks = await req.json();
    if (!tasks.status) tasks.tasks = [];
    dispatch(taskFetchAll(tasks.tasks));
  };
};

export const taskSetActive = (task: any) => ({
  type: types.taskSetActive,
  payload: task,
});

export const taskClearActive = () => ({
  type: types.taskClearActive,
});

const taskFetchAll = (tasks: taskProps[]) => ({
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

const taskEdit = (task: any) => ({
  type: types.taskEdit,
  payload: task,
});
