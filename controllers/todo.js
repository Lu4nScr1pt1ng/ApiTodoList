require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const uuid = require("uuid");

// Models
const User = require("../models/User");

exports.index = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET);
  const userInfo = await User.findById(decoded.id, "-password");

  res.status(200).json({ tasks: userInfo.task });
};

exports.add = async (req, res, next) => {
  const { text } = req.body;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET);

  // check if have text
  if (!text) {
    res.status(422).json({ msg: "Please add a text to be added" });
  }

  try {
    const userInfo = await User.updateOne(
      { _id: decoded.id },
      {
        $push: { task: { id: uuid.v4(), text: text } },
      }
    );
    res.status(200).json({ msg: "Task added!" });
  } catch (err) {
    res.status(500).json({ msg: "Error please contact system administrator!" });
  }
};

exports.show = async (req, res, next) => {
  const taskId = req.params.id;

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET);

  const userById = await User.findById(decoded.id);
  const userTasks = userById.task;

  const userTaskById = userTasks.flatMap((e) => {
    return e.id !== taskId ? [] : e;
  });

  res.status(200).json({ task: userTaskById });
};

exports.deleteOne = async (req, res, next) => {
  const taskId = req.params.id;

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET);

  try {
    const deleteBy = await User.updateOne(
      { _id: decoded.id },
      { $pull: { task: { id: taskId } } },
      { multi: true }
    );
    res.status(200).json({ msg: "Deleted the task!" });
  } catch (err) {
    res.status(500).json({ msg: "Error please contact system administrator!" });
    console.log(err)
  }
};
