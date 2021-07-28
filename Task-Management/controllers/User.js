require("dotenv").config();
const UserMD = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.imgupload = (req, res) => {
  res.json({
    success: 1,
    profile_url: `http://localhost:3000/profile/${req.file.filename}`,
  });
};

exports.signin = (req, res) => {
  const { UserName, Password } = req.body;

  //encryption of password
  // const md5sum = crypto.createHash("md5");
  // const hashpass = md5sum.update(Password).digest("hex");

  // const userObj = new UserMD({
  //   UserName: UserName,
  //   Password: hashpass,
  // });

  UserMD.find({ UserName })
    .exec()
    .then((data) => {
      if (data.length >= 1) {
        return res.status(409).json({
          message: "Mail Already Exist",
        });
      } else {
        bcrypt.hash(Password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const userObj = new UserMD({
              UserName: UserName,
              Password: hash,
            });
            userObj
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "user created successfully",
                  User: result,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  Error: err,
                });
              });
          }
        });
      }
      // const token = jwt.sign(
      //   { _id: UserMD._id.toString() },
      //   "thisismynewcourse"
      // );
      // res.status(201).json({
      //   Message: "User Created Successfully",
      //   UserData: data,
      //   token,
      // });
    })
    .catch((err) => {
      res.status(500).json({
        Error: err,
      });
    });
};

exports.login = async (req, res) => {
  const { UserName, Password } = req.body;

  // console.log(Password);
  // const md5sum = crypto.createHash("md5");
  // const hashpass = md5sum.update(Password).digest("hex");
  // console.log(hashpass);

  UserMD.find({ UserName })
    .then((data) => {
      if (data.length < 1) {
        return res.status(404).json({
          Message: "Auth failed",
        });
      }
      bcrypt.compare(Password, data[0].Password, (error, response) => {
        if (error) {
          return res.status(404).json({
            message: "Auth Failed",
          });
        }
        if (response) {
          const token = jwt.sign(
            {
              UserName: data[0].UserName,
              UserId: data[0]._id,
            },
            process.env.AccessKey,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth Successfull",
            token,
          });
        }
        res.status(401).json({
          message: "Auth Failed",
        });
      });

      // data.length > 0
      //   ? res.status(200).json({
      //       Message: "Login Successfull",
      //     })
      //   : res.status(404).json({
      //       Message: "Invalid UserName and Password",
      //     });
    })
    .catch((err) => {
      res.status(500).json({
        Error: err,
      });
    });
};
