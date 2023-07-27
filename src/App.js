
import GetPunk from "./components/GetPunk";
import { Route, Routes } from "react-router-dom";
import React from "react";

import "./App.css";

function App() {
 

  return (
    <div className="App">  
      <Routes>
        <Route
          path="/home"
          element={
            <GetPunk
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
