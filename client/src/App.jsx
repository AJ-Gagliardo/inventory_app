import { useState } from "react";

import "./App.css";
import Create from "./components/create";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Create />
    </>
  );
}

export default App;
