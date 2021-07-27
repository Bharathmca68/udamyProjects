const express = require("express");
const router = express.Router();

const Taskcontroller = require("../controllers/Task");
const Usercontroller = require("../controllers/User");

// Routes for Task
router.get("/getalltask", Taskcontroller.fetchtask);
router.post("/addtask", Taskcontroller.createtask);
router.get("/gettask/:id", Taskcontroller.TaskById);
router.delete("/deletetask/:id", Taskcontroller.DeleteTask);
router.patch("/updatetask/:id", Taskcontroller.UpdateTask);

// Routes for User
router.post("/signin", Usercontroller.signin);
router.post("/login", Usercontroller.login);

module.exports = router;
