const express = require("express");
const router = express.Router();
const pool = require("./db");

router.post("/create", async (req, res) => {
  try {
    const { itemname, itemtype, brand, price, stock } = req.body;

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

router.get("/allItems", async (req, res) => {
  try {
    // console.log("requesting all items from the inventory");
    const allItems = await pool.query("SELECT * FROM items;");
    // console.log(allItems.rows);
    res.json(allItems.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/items/:id", async (req, res) => {
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

router.delete("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM items WHERE id = $1", [id]);
    res.json("item was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { itemname, itemtype, brand, price, stock } = req.body;
    await pool.query(
      "UPDATE items SET itemname = $1, itemtype = $2, brand = $3, price = $4, stock = $5 WHERE id = $6",
      [itemname, itemtype, brand, price, stock, id]
    );

    res.json("item updated");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
