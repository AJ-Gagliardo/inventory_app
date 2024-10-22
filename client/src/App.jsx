import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Create from "./components/create";
import ListItems from "./components/ListItems";
// import { Router } from "react-router-dom";

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
