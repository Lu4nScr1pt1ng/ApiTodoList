// pegar as informações do dotenv
require("dotenv").config();

const express = require('express');
const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado!" });
  }

  try {
    jwt.verify(token, process.env.SECRET);
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token inválido!" });
  }
}


module.exports = checkToken