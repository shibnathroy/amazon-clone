const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var ejsmate = require("ejs-mate");
// models
const User = require("./models/user");

mongoose.connect(
  "mongodb://roy:keepLearning123@ds337418.mlab.com:37418/ecommerce",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to the database");
});

const app = express();

// Middlewares
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.engine("ejs", ejsmate);
app.set("view engine", "ejs");

const mainRoutes = require("./routes/main");
const userRoutes = require("./routes/user");

app.use(mainRoutes);
app.use(userRoutes);

app.listen(3000, err => {
  if (err) throw err;
  console.log("Server is running on port 3000");
});
