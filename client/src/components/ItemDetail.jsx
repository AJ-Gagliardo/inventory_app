import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import smartphone from "../assets/smartphone.webp";
import accessory from "../assets/accessory.webp";
import laptop from "../assets/laptop.webp";
import gaming from "../assets/gaming.webp";
import tablet from "../assets/tablet.webp";

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  const getItem = async () => {
    try {
      console.log(id);
      const response = await fetch(`http://localhost:3000/items/${id}`);
      const jsonData = await response.json();
      setItem(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getItem();
  }, [id]);

  const imgType = {
    smartphone,
    accessory,
    gaming,
    laptop,
    tablet,
  };

  return item ? (
    <div className="flex flex-col place-items-center">
      <h2 className="font-bold text-3xl">{item.itemname}</h2>
      <img className="w-80" src={imgType[item.itemtype]}>
        {console.log(item.itemtype)}
      </img>
      <p className="font-thin">{item.itemtype}</p>
      <p>{item.brand}</p>
      <p className="font-bold">${item.price}</p>
      <p>{item.stock} units available</p>
      <div className="">
        <Link to={`/edit/${item.id}`}>
          <button className="my-2 mx-2 w-24 bg-blue-500 text-white p-1 rounded">
            Edit
          </button>
        </Link>
        <button
          className="w-24 bg-red-400 text-white p-1 rounded"
          onClick={() => deleteItem(item.id)}
        >
          Delete
        </button>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default ItemDetail;
