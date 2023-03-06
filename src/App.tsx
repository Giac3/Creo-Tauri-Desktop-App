import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";

import Paint from "./pages/Paint";

function App() {

  return (
    <div className="flex flex-row">
    <NavBar/>

    <Routes>
    
      <Route  path="/" element={<Home />} />
      <Route  path="/paint" element={<Paint />} />
    </Routes>
    </div>
  );
}

export default App;
