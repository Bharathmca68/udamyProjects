// import the mongoose package
const mongoose = require("mongoose");

// create a Schema
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  Description: {
    type: String,
    required: true,
    trim: true,
  },
  Completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// export the model
module.exports = mongoose.model("Taskmanage", TaskSchema, "TaskManage");
