import express from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../models/userModel.js";

//router object
const router = express.Router();

//Create User || POST
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    //finding user by email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: "User Already Exists",
      });
    }
    //hashing password for seurity
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user to DataBase
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).send({
      success: true,
      message: "User Registered successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in register callback",
      success: false,
      error,
    });
  }
});

// Login || POST
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    return res.status(200).send({
      success: true,
      messgae: "login successfully",
      user,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in login callback",
      error,
    });
  }
});

//get all user || GET // for postman only
router.get("/alluser", async (req, res) => {
  try {
    const allusers = await UserModel.find({});
    return res.status(200).send({
      allusercount: allusers.length,
      success: true,
      message: "All Users Data...",
      allusers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in getting all users",
      error,
    });
  }
});

//exporting
export { router as userRouter };
