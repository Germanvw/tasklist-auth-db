const Task = require("../Models/Task");

const createTask = async (req, res) => {
  const task = new Task(req.body);
  try {
    task.user = req.uid;
    const eventDB = await task.save();
    console.log(eventDB);
    return res.status(201).json({
      status: true,
      msg: "Task created successfully",
      task: eventDB,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, msg: "Error at the request." });
  }
};
const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findById({ _id: taskId });

    if (!task) {
      return res.status(404).json({
        status: false,
        msg: "Task not found",
      });
    }

    // validate authorization
    if (task.user._id.toString() !== req.uid) {
      return res.status(403).json({ status: false, msg: "Not authorized" });
    }

    await Task.findByIdAndDelete(taskId);

    return res
      .status(200)
      .json({ status: true, msg: "Task deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, msg: "Error at the request." });
  }
};
const editTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, description } = req.body;
  try {
    let task = await Task.findById({ _id: taskId });
    if (!task) {
      return res.status(404).json({
        status: false,
        msg: "Task not found",
      });
    }

    // validate authorization
    if (task.user._id.toString() !== req.uid) {
      return res.status(403).json({ status: false, msg: "Not authorized" });
    }

    task = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        description,
      },
      { returnOriginal: false }
    );

    return res.status(200).json({
      status: true,
      msg: "Task edited successfully",
      task,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, msg: "Error at the request." });
  }
};
const getTask = async (req, res) => {
  const taskId = req.params.id;
  const uid = req.uid;
  try {
    const task = await Task.findById({ _id: taskId });

    if (!task) {
      return res.status(404).json({
        status: false,
        msg: "Task not found",
      });
    }

    // validate authorization
    if (task.user._id.toString() !== uid) {
      return res.status(403).json({ status: false, msg: "Not authorized" });
    }

    return res.status(200).json({
      status: true,
      msg: "Task found",
      task,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, msg: "Error at the request." });
  }
};
const getTasks = async (req, res) => {
  const uid = req.uid;
  try {
    const taskList = await Task.find({ user: uid });

    if (taskList.length === 0) {
      return res.status(400).json({
        status: false,
        msg: "No tasks found",
      });
    } else {
      return res.status(200).json({
        status: true,
        tasks: taskList,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, msg: "Error at the request." });
  }
};

module.exports = { createTask, deleteTask, editTask, getTask, getTasks };
