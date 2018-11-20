const express = require("express");
const path = require("path");

const app = express();

const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./dist")));

app.listen(process.env.PORT || 4000, () =>
  console.log(`Listening on port ${4000}`)
);
