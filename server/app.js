const express = require("express");
const app = express();
require("dotenv").config();

const fport = process.env.FPORT;

app.listen(fport, () => {
  console.log(`listening to port ${fport}`);
});
