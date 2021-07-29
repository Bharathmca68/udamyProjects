const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const check_Auth = require("../middleware/chech-auth");

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

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

//Routes for file upload
router.post("/upload", upload.single("profile"), Usercontroller.imgupload);

module.exports = router;
