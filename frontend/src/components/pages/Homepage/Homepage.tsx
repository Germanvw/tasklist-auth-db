import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonTheme } from "../../ButtonTheme/ButtonTheme";
import {
  startTaskFetchAll,
  taskSetActive,
} from "../../redux/actions/taskActions";
import { RootState } from "../../redux/reducers/rootReducer";
import { TaskBody } from "../../Task/TaskBody";
import { TaskList } from "../../Task/TaskList";

import "./homepage.scss";

interface newTaskProp {
  title: string;
  description: string;
  created: any;
  user?: {};
}

const initialState: newTaskProp = {
  title: "",
  description: "",
  created: null,
  user: {},
};

export const Homepage = () => {
  const [task, setTask] = useState(initialState);

  const dispatch = useDispatch();

  const { tasks, active } = useSelector((state: RootState) => state.task);

  const handleCreate = () => {
    dispatch(taskSetActive({ _id: null }));
  };

  useEffect(() => {
    dispatch(startTaskFetchAll());
  }, []);

  return (
    <div className="homepage">
      <div className="tasklist-container">
        <div className="left">
          <div className="left-header">
            <ButtonTheme />
            <div className="user-nav">
              <div className="user">
                <i className="fa-solid fa-user"></i> <p>Usuario</p>
              </div>
              <button className="btn-logout">Logout</button>
            </div>
          </div>
          <div className="middle">
            <TaskList />
          </div>
          <div className="bottom">
            <button className="submit" onClick={handleCreate}>
              Crear task
            </button>
          </div>
        </div>
        <div className="right">
          {active ? (
            <TaskBody />
          ) : (
            <div>Please, select a task to edit or create a new one!</div>
          )}
        </div>
      </div>
    </div>
  );
};
