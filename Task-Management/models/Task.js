// import the mongoose package
const mongoose = require("mongoose");

// create a Schema
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  Description: {
    type: String,
    required: true,
  },
  Completed: {
    type: Boolean,
    required: true,
  },
});

// export the model
module.exports = mongoose.model("Taskmanage", TaskSchema, "TaskManage");
