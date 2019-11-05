import React, { useState } from "react";

const initItems = [2, 1, 5, 3, 4, 10, 9, 8, 22, 11];

export default function Bubble() {
  const [isSorted, setIsSorted] = useState(false);
  const [items, setItems] = useState(initItems);
  const [i, setI] = useState(0);
  const [speed, setSpeed] = useState(10);
  const [isSorting, setIsSorting] = useState(false);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const swap = async (i, current) => {
    const copyItems = [...current];
    const temp = copyItems[i];
    copyItems[i] = copyItems[i + 1];
    copyItems[i + 1] = temp;
    setItems(copyItems);
    return copyItems;
  };

  const bubbleSort = async e => {
    e.preventDefault();
    let current = [...items];
    let didSwap = true;
    setIsSorting(true);
    while (!!didSwap) {
      didSwap = false;
      for (let i = 0; i < items.length - 1; i++) {
        if (current[i] > current[i + 1]) {
          current = await swap(i, current);
          didSwap = true;
          //   console.log(items);
        }
        setI(i);

        await sleep(1200 / speed);
      }
    }
    setIsSorting(false);
    setIsSorted(true);
  };

  const reset = e => {
    e.preventDefault();
    setItems(initItems);
    setI(0);
    setIsSorted(false);
  };

  const handleSpeed = e => {
    setSpeed(e.target.value);
  };

  return (
    <>
      <div className="top-part">
        <p>Bubble</p>
        <div className="speed">
          <input
            type="range"
            name="speed"
            min="1"
            max="10"
            step="0.5"
            onChange={handleSpeed}
            disabled={isSorting}
          />
          <label htmlFor="speed">Speed</label>
        </div>
      </div>
      <button onClick={isSorted ? reset : bubbleSort}>
        {isSorted ? "Reset" : "Sort"}
      </button>

      <div className="visulaizer-box">
        {items.map((item, ind) => {
          return (
            <div
              key={item}
              className="item-wrapper"
              style={{
                width: `${100 / items.length}%`
              }}
            >
              <div
                className="item"
                style={{
                  height: `${(item * 200) / items.length}px`,
                  opacity: `${ind === i ? 0.75 : 1}`
                }}
              ></div>
              {ind === i && <h2>·</h2>}
            </div>
          );
        })}
      </div>
    </>
  );
}
