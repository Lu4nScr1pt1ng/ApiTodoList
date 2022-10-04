require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkEnv = require("./utils/chekcEnv");

// env check information
const PORT = process.env.PORT;
const DBURL = process.env.DATABASE_URL;
const SECRET = process.env.SECRET;
checkEnv();

// express
const app = express();

// receive json
app.use(express.json());

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/board", require("./routes/todo"));

// mongoose connection
mongoose
  .connect(DBURL)
  .then(
    console.log("[#] Connection with MongoDB is running"),
    app.listen(PORT, () => {
      console.log("[#] App running on port " + PORT);
    })
  )
  .catch((err) => {
    console.log("[!] Error on connecting with MongoDB");
    console.log("[!] Error log: " + err);
    throw new Error("[!] Error on connecting with MongoDB");
  });
