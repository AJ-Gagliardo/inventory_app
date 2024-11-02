const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const pool = require("./db");
const path = require("path");

const port = process.env.PORT;

//middleware
app.use(cors());
app.use(express.json()); //req.body

//testing this part
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

// app.get("/", (req, res) => {
//   console.log("home");
//   res.send("home");
// });

// part above commented out for testing purpose

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

app.get("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`testing getting item with id: ${id}`);
    const itemById = await pool.query("SELECT * FROM items where id = $1", [
      id,
    ]);
    res.send(itemById.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteItem = await pool.query("DELETE FROM items WHERE id = $1", [
      id,
    ]);
    res.json("item was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { itemname, itemtype, brand, price, stock } = req.body;
    const updateItem = await pool.query(
      "UPDATE items SET itemname = $1, itemtype = $2, brand = $3, price = $4, stock = $5 WHERE id = $6",
      [itemname, itemtype, brand, price, stock, id]
    );

    res.json("item updated");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
