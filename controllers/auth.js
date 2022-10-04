require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Models
const User = require("../models/User");

// register call
exports.register = async (req, res, next) => {
  // get information of body
  const { name, email, password, confirmpassword } = req.body;

  // validations
  if (!name) {
    return res.status(422).json({ msg: "Name is missing!" });
  }

  if (!email) {
    return res.status(422).json({ msg: "E-mail is missing!" });
  }

  if (!password) {
    return res.status(422).json({ msg: "Password is missing!" });
  }

  if (password !== confirmpassword) {
    return res.status(422).json({ msg: "Password confirmation dont match!" });
  }

  // check if e-mail is already registered
  const emailIsUsed = await User.findOne({ email: email });

  if (emailIsUsed) {
    return res.status(422).json({ msg: "This e-mail is already used!" });
  }

  // password hashing
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // New user
  const user = new User({
    name,
    email,
    password: passwordHash,
  });

  try {
    await user.save();
    res.status(201).json({ msg: "user created!" });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// login call
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ msg: "Please insert a e-mail" });
  }
  if (!password) {
    return res.status(422).json({ msg: "Please insert a password" });
  }

  // check user by email
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ msg: "E-mail not found" });
  }

  // check password match
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Invalid password!" });
  }

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign({ id: user._id }, secret);
    res.status(200).json({ msg: "Logged in!", token });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};





// user info call
exports.user =  async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET);

    const userInfo = await User.findById(decoded.id, '-password')

    res.status(200).json({ user: userInfo });
}