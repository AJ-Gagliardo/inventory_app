const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const pool = require("./db");
const path = require("path");

const PORT = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json()); //req.body

//testing this part
app.use("/api", require("./api-routes.js"));
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});
// end of test

// app.get("/", (req, res) => {
//   console.log("home");
//   res.send("home");
// });

// part above commented out for testing purpose

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
