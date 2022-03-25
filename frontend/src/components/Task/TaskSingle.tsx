import { useDispatch } from "react-redux";
import { startTaskDelete, taskSetActive } from "../redux/actions/taskActions";

export const TaskSingle = ({ task }: any) => {
  const { _id, title, description } = task;
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(taskSetActive(task));
  };
  const handleDelete = () => {
    dispatch(startTaskDelete(_id));
  };
  return (
    <div className="task-single" key={_id}>
      <h4>{title}</h4>
      <p>{description}</p>
      <div className="options">
        <button className="edit" onClick={handleEdit}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button className="delete" onClick={handleDelete}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
};
