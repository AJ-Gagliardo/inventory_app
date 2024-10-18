import { useState } from "react";

function Create() {
  const [itemName, setItenName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { itemname: itemName, price, stock };
      // { itemName: itemName, price: price, stock: stock };
      const response = await fetch("http://localhost:3000/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <h1>Insert new item to the inventory</h1>
      <form onSubmit={onSubmitForm}>
        <h2>Item Name</h2>
        <input type="text" onChange={(e) => setItenName(e.target.value)} />
        <h2>Price</h2>
        <input type="number" onChange={(e) => setPrice(e.target.value)} />
        <h2>Stock</h2>
        <input type="number" onChange={(e) => setStock(e.target.value)} />
        <button> Add</button>
      </form>
    </div>
  );
}

export default Create;
