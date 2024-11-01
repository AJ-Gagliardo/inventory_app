import { useEffect, useState } from "react";
import Create from "./Create";
import { useParams } from "react-router-dom";

function EditItem() {
  const [itemToEdit, setItemToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchItem = async () => {
    try {
      const response = await fetch(`http://localhost:3000/items/${id}`);
      const jsonData = await response.json();

      setItemToEdit(jsonData);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  return <Create existingItem={itemToEdit} isEdit={true} />;
}

export default EditItem;
