import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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

  return item ? (
    <div>
      <h2 className="font-bold text-3xl">{item.itemname}</h2>
      <p className="font-thin">{item.itemtype}</p>
      <p>{item.brand}</p>
      <p className="font-bold">${item.price}</p>
      <p>{item.stock} units available</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default ItemDetail;
