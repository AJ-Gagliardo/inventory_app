const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const pool = require("./db");

const fport = process.env.FPORT;

//middleware
app.use(cors());
app.use(express.json()); //req.body

app.get("/", (req, res) => {
  console.log("home");
  res.send("home");
});

app.post("/create", async (req, res) => {
  try {
    const { id, itemname, itemtype, brand, price, stock } = req.body;

    console.log(`created ${itemname}`);
    const newItem = await pool.query(
      "INSERT INTO items(itemname, itemtype, brand, price, stock) VALUES($1,$2,$3,$4,$5);",
      [itemname, itemtype, brand, price, stock]
    );

    res.json(newItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/allItems", async (req, res) => {
  try {
    // console.log("requesting all items from the inventory");
    const allItems = await pool.query("SELECT * FROM items;");
    // console.log(allItems.rows);
    res.json(allItems.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(fport, () => {
  console.log(`listening to port ${fport}`);
});
