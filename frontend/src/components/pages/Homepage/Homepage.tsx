import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startTaskCreate } from "../../redux/actions/taskActions";
import { RootState } from "../../redux/reducers/rootReducer";

interface newTaskProp {
  title: string;
  description: string;
  created: any;
  user?: {};
}

const initialState: newTaskProp = {
  title: "nuevo task",
  description: "nueva descripcion",
  created: null,
  user: {},
};

export const Homepage = () => {
  const [task, setTask] = useState(initialState);

  const dispatch = useDispatch();
  const handleInitiate = () => {
    setTask({
      ...task,
      created: new Date(),
    });
  };

  const handleCreate = () => {
    dispatch(startTaskCreate(task));
  };

  return (
    <>
      <button onClick={handleInitiate}>Inicializar task</button>
      <button onClick={handleCreate}>Crear task</button>
    </>
  );
};
