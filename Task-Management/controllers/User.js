const UserMD = require("../models/User");

exports.signin = (req, res) => {
  const { UserName, Password } = req.body;

  const userObj = new UserMD({
    UserName: UserName,
    Password: Password,
  });

  userObj
    .save()
    .then((data) => {
      res.status(201).json({
        Message: "User Created Successfully",
        UserData: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        Error: err,
      });
    });
};

exports.login = (req, res) => {
  const { UserName, Password } = req.body;

  UserMD.find({ UserName, Password })
    .then((data) => {
      //   console.log(data);
      data.length > 0
        ? res.status(200).json({
            Message: "Login Successfull",
          })
        : res.status(404).json({
            Message: "Invalid UserName and Password",
          });
    })
    .catch((err) => {
      res.status(500).json({
        Error: err,
      });
    });
};
