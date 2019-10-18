const express = require("express");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  let name = "Shibnath Roy";
  res.json("Hello Mr. " + name);
});

app.listen(3000, err => {
  if (err) throw err;
  console.log("Server is running on port 3000");
});
