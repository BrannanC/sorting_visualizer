import React, { useState } from "react";
import "./App.css";

import Bubble from "./components/bubble";
import Selection from "./components/selection";
import Insertion from "./components/insertion";

function App() {
  const [selectSort, setSelectSort] = useState("bubble");

  const handleChange = e => {
    e.preventDefault();
    setSelectSort(e.target.value);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sorting Algorithm Visualizer</h1>
        <select
          name="pets"
          id="pet-select"
          value={selectSort}
          onChange={handleChange}
        >
          <option value="bubble">Bubble</option>
          <option value="selection">Selection</option>
          <option value="insertion">Insertion</option>
        </select>
      </header>
      {selectSort === "bubble" && <Bubble />}
      {selectSort === "selection" && <Selection />}
      {selectSort === "insertion" && <Insertion />}
    </div>
  );
}

export default App;
