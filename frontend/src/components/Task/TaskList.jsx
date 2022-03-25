import { TaskSingle } from "./TaskSingle";
import { useSelector } from "react-redux";

import "./tasks.scss";
export const TaskList = () => {
  const { tasks } = useSelector((state) => state.task);

  return (
    <div className="task-container">
      <hr />
      <h3>Task List:</h3>
      <div className="tasklist">
        {tasks && tasks.length === 0 && (
          <>
            <p>No tasks yet</p>
            <hr />
          </>
        )}
        {tasks &&
          tasks.map((task) => <TaskSingle key={task._id} task={task} />)}
      </div>
    </div>
  );
};
