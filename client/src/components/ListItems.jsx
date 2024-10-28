import { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
// import { accesory, gaming, laptop, smartphone, tablet } from "../assets";
import smartphone from "../assets/smartphone.webp";
import accessory from "../assets/accessory.webp";
import laptop from "../assets/laptop.webp";
import gaming from "../assets/gaming.webp";
import tablet from "../assets/tablet.webp";

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

  const imgType = {
    smartphone,
    accessory,
    gaming,
    laptop,
    tablet,
  };
  return (
    <>
      <h1>All Items</h1>
      <div className="grid grid-cols-3 gap-4 mt-6 align-middle justify-between">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between  sm:place-items-center  my-4"
          >
            <Link to={`/items/${item.id}`}>
              <p className="sm:text-2xl text-sm font-bold min-h-8 sm:min-h-6 truncate">
                {item.itemname}
              </p>
              <img className="w-60" src={imgType[item.itemtype]}>
                {console.log(item.itemtype)}
              </img>

              <p className="text-slate-600">{item.itemtype}</p>
              <p className="text-slate-800">{item.brand}</p>
              <p className="text-slate-800 font-bold">${item.price}</p>
              <p className="text-slate-800">{item.stock} units available</p>
            </Link>
            <div className="">
              <Link to={`/edit/${item.id}`}>
                <button className="my-2 mx-2 w-24 border-blue-400 p-1 rounded">
                  Edit
                </button>
              </Link>
              <button
                className="w-24 border-red-400  p-1 rounded"
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <Link
          className="my-auto h-2/3 align-middle place-items-center -center"
          to="/create"
        >
          <button className="bg-blue-400 text-white">Add Item +</button>
        </Link>
      </div>
    </>
  );
}

export default ListItems;
