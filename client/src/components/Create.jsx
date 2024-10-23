import { useState } from "react";

function Create({ existingItem, isEdit }) {
  const [itemName, setItemName] = useState(
    existingItem ? existingItem.itemname : ""
  );
  const [itemtype, setItemType] = useState(
    existingItem ? existingItem.itemtype : ""
  );
  const [brand, setBrand] = useState(existingItem ? existingItem.brand : "");
  const [price, setPrice] = useState(existingItem ? existingItem.price : "");
  const [stock, setStock] = useState(existingItem ? existingItem.stock : "");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { itemname: itemName, itemtype, brand, price, stock };
      // { itemName: itemName, price: price, stock: stock };

      const requestUrl = isEdit
        ? `http://localhost:3000/items/${existingItem.id}`
        : "http://localhost:3000/create";

      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(requestUrl, {
        method: method,
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
    <>
      <h1 className="w-screen">Insert a new item</h1>
      <>
        <form
          onSubmit={onSubmitForm}
          className="grid grid-cols-[1fr,4fr] text-start gap-2 my-8 sm:w-3/4 mx-auto"
        >
          <h2>Item Name</h2>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="border border-spacing-1 border-slate-600 px-1"
          />
          <h2>Item Type</h2>
          <select
            className="border border-spacing-1 border-slate-600 px-1"
            name="itemtype"
            value={itemtype}
            onChange={(e) => setItemType(e.target.value)}
          >
            <option value="smartphone">SmartPhone</option>
            <option value="tablet">Tablet</option>
            <option value="laptop">Laptop</option>
            <option value="gaming">Gaming</option>
            <option value="accesory">Accesory</option>
          </select>

          <h2>Brand</h2>
          <input
            type="text"
            className="border border-spacing-1 border-slate-600 px-1"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
            }}
          />
          <h2>Price</h2>
          <input
            className="border border-spacing-1 border-slate-600 px-1"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <h2>Stock</h2>
          <input
            className="border border-spacing-1 border-slate-600 px-1"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <button className="col-span-2 my-2 hover:scale-110 bg-slate-300">
            {" "}
            Add
          </button>
        </form>
      </>
    </>
  );
}

export default Create;
