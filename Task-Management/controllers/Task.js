//importing Task model
const TaskMD = require("../models/Task");

exports.fetchtask = (req, res) => {
  const { Completed, Limit = 1 } = req.query;
  let filters = {};

  if (Completed) {
    filters.Completed = Completed;
  }

  TaskMD.find(filters)
    .then((result) => {
      let page_size = 3;

      let temp;

      function paginate(array, page_size, page_number) {
        return array.slice(
          (page_number - 1) * page_size,
          page_number * page_size
        );
      }

      temp = paginate(result, page_size, Limit);

      res.status(201).json({
        message: "Task Fetched",
        Tasks: temp,
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
      if (!result) {
        return res.status(404).send("Task not found");
      }
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
