import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/reducers/rootReducer";
import { startTaskCreate, startTaskEdit } from "../redux/actions/taskActions";

import Swal from "sweetalert2";
import "./tasks.scss";
interface formProps {
  title: string;
  description: string;
}

const initialState: formProps = {
  title: "",
  description: "",
};

export const TaskBody = () => {
  const [form, setForm] = useState(initialState);

  const { active } = useSelector((state: RootState) => state.task);
  const dispatch = useDispatch();
  useEffect(() => {
    if (active._id !== null) {
      setForm(active);
    }
  }, [active]);

  const clear = () => {
    setForm(initialState);
  };
  const handleSubmit = () => {
    if (form.title.trim().length > 1 && form.description.trim().length > 1) {
      // submit edit/create
      if (active._id === null) {
        //create new
        dispatch(startTaskCreate(form));
      } else {
        dispatch(startTaskEdit(form));
      }
      clear();
    } else {
      Swal.fire("Error", "Task must have a title and description", "error");
    }
  };

  return (
    <div className="tasknew">
      <div className="header">
        <input
          type="text"
          placeholder="Task's title..."
          className="title-input"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        ></input>
        <button
          type="submit"
          placeholder="Task's description..."
          onClick={handleSubmit}
        >
          {active._id === null ? "Crear" : "Editar"}
        </button>
      </div>
      <div className="description">
        <textarea
          value={form.description}
          placeholder="Task's description..."
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>
      </div>
    </div>
  );
};
