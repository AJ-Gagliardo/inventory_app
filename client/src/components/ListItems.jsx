import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";

function ListItems() {
  const [items, setItems] = useState([]);

  const getAllItems = async () => {
    try {
      console.log("starting getAllItems");
      const response = await fetch("http://localhost:3000/allItems");
      const jsonData = await response.json();
      console.log(jsonData);

      setItems(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteItem = async (id) => {
    try {
      console.log(`deleting item with id ${id}...`);
      const response = await fetch(`http://localhost:3000/items/${id}`, {
        method: "DELETE",
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  // to mount the items
  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <>
      <h1>All Items</h1>
      <div className="grid grid-cols-3 mt-6">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col my-4">
            <p className="text-xl font-bold">{item.itemname}</p>
            <p className="">{item.itemtype}</p>
            <p className="">{item.brand}</p>
            <p className="font-bold">${item.price}</p>
            <p className="">{item.stock} units available</p>
            <div className="">
              <button className="my-2 mx-2 w-24">Edit</button>
              <button className="w-24" onClick={() => deleteItem(item.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ListItems;
