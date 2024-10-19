import { useState } from "react";

import "./App.css";
import Create from "./components/create";
import ListItems from "./components/ListItems";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Create />
      <ListItems />
    </>
  );
}

export default App;
