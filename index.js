const express = require("express");

const app = express();

const morgan = require("morgan");

app.use(morgan("dev"));

app.listen(process.env.PORT || 4000, () =>
  console.log(`Listening on port ${4000}`)
);
