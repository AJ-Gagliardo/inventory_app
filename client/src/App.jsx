import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Create from "./components/Create";
import ListItems from "./components/ListItems";
import NavBar from "./components/NavBar";
import ItemDetail from "./components/ItemDetail";
import EditItem from "./components/EditItem";
// import { Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<ListItems />} />
        <Route path="/create" element={<Create />} />
        <Route path="items/:id" element={<ItemDetail />} />
        <Route path="edit/:id" element={<EditItem />} />
      </Routes>
    </Router>
  );
}

export default App;
