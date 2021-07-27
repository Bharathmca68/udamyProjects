//importing Task model
const TaskMD = require("../models/Task");

exports.fetchtask = (req, res) => {
  TaskMD.find()
    .then((result) => {
      res.status(201).json({
        message: "Task Fetched",
        Tasks: result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "error 404",
        err,
      });
    });
};

exports.TaskById = (req, res) => {
  const Taskid = req.params.id;

  TaskMD.findById({ _id: Taskid })
    .then((result) => {
      res.status(201).json({
        message: "Task Fetched",
        Tasks: result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "error 404",
        err,
      });
    });
};

exports.createtask = (req, res) => {
  const { Description, Completed } = req.body;

  const Taskobj = new TaskMD({
    Description: Description,
    Completed: Completed,
  });

  Taskobj.save()
    .then((result) => {
      res.status(201).json({
        message: "Task Recorded",
        "Task Status": result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "error 404",
        err,
      });
    });
};

exports.DeleteTask = (req, res) => {
  const Taskid = req.params.id;

  TaskMD.findByIdAndDelete({ _id: Taskid })
    .then((result) => {
      res.status(201).json({
        message: "Task deleted",
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "error 404",
        err,
      });
    });
};

exports.UpdateTask = (req, res) => {
  TaskMD.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
    if (err) {
      return res
        .status(500)
        .send({ error: "Problem with Updating the Task  " });
    }
    res.send({ success: "Updation successfull" });
  });
};
