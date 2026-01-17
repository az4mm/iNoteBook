const express = require("express");
const router = express.Router();
const user = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = process.env.JWT_TOKEN;

//create a user using: POST "/api/auth/createuser". No login required

router.post(
  "/createuser",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("name", "Name must be atleast 3 char").isLength({ min: 3 }),
    body("password", "Password must be atleast 5 char").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // if there are errors, return bad request and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //check whether the user with this email exists already
    try {
      let users = await user.findOne({ email: req.body.email });
      console.log(users);
      if (users) {
        return res.status(400).json({
          success,
          error: "Sorry a user with this email already exists",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      users = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: users.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      //   console.log(jwtData);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, error: "Some error occured" });
    }
  },
);
//Authenticate a user using: POST "/api/auth/login". No login required

router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // if there are errors, return bad request and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //check whether the user with this email exists already
    try {
      let users = await user.findOne({ email: req.body.email });
      console.log(users);
      if (!users) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }
      const passwordCompare = await bcrypt.compare(
        req.body.password,
        users.password,
      );
      if (!passwordCompare) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }
      const data = {
        user: {
          id: users.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, error: "Some error occured" });
    }
  },
);

//Get loggedin user details using: POST "/api/auth/getuser". login required
router.post("/getuser", fetchuser, async (req, res) => {
  let success = false;
  try {
    const userId = req.user.id;
    const users = await user.findById(userId).select("-password");
    success = true;
    res.json({ success, user: users });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Some error occured" });
  }
});
module.exports = router;
