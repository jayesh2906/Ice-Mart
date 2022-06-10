import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(422).json({ error: "Please add all the fields!" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(422)
        .json({ error: "User already exists with this email!" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await new User({
      email,
      password: hashedPassword,
    }).save();
    res.status(200).json({ message: "Signup success, You can login now!" });
  } catch (err) {
    console.log("error", err);
  }
};

export const signin = async (req, res) => {
  // admin@gmail.com
  // admin@123
  const { email, password, isAdmin } = req.body;
  try {
    if (!email || !password) {
      return res.status(422).json({ error: "Please add all the fields!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ error: "User does not exist with this email!" });
    }
    if (isAdmin && !user.isAdmin) {
      return res
        .status(404)
        .json({ error: "User does not exist with this email!" });
    }
    if (!isAdmin && user.isAdmin) {
      return res
        .status(404)
        .json({ error: "User does not exist with this email!" });
    }
    const doMatch = await bcrypt.compare(password, user.password);
    if (doMatch) {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      res.status(201).json({ token, email: user.email, userId: user._id });
    } else {
      return res.status(401).json({ error: "Email or password is invalid!" });
    }
  } catch (err) {
    console.log("error", err);
  }
};
