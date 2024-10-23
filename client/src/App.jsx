import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Create from "./components/create";
import ListItems from "./components/ListItems";
import NavBar from "./components/NavBar";
import ItemDetail from "./components/ItemDetail";
// import { Router } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<ListItems />} />
        <Route path="/create" element={<Create />} />
        <Route path="items/:id" element={<ItemDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
