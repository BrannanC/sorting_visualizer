import React, { useState } from "react";

const generateList = num => {
  const initItems = [];
  while (initItems.length < num) {
    let r = Math.floor(Math.random() * 100) + 1;
    if (initItems.indexOf(r) === -1) initItems.push(r);
  }
  return initItems;
};

export default function Bubble() {
  const [isSorted, setIsSorted] = useState(false);
  const [items, setItems] = useState(generateList(20));
  const [i, setI] = useState(0);
  const [speed, setSpeed] = useState(20);
  const [isSorting, setIsSorting] = useState(false);
  const [amount, setAmount] = useState(20);

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
    setItems(generateList(amount));
    setI(0);
    setIsSorted(false);
  };

  const handleSpeed = e => {
    setSpeed(e.target.value);
  };

  const handleN = e => {
    setAmount(e.target.value);
    setItems(generateList(amount));
    setI(0);
    setIsSorted(false);
  };

  return (
    <>
      <div className="top-part">
        <p>Bubble</p>
        <div className="n">
          <input
            type="range"
            name="n"
            min="5"
            max="100"
            step="0.5"
            onChange={handleN}
            disabled={isSorting}
            value={amount}
          />
          <label htmlFor="speed">n (# of items)</label>
        </div>
        <div className="speed">
          <input
            type="range"
            name="speed"
            min="1"
            max="100"
            step="0.5"
            onChange={handleSpeed}
            disabled={isSorting}
            value={speed}
          />
          <label htmlFor="speed">Speed</label>
        </div>
      </div>
      <button disabled={isSorting} onClick={isSorted ? reset : bubbleSort}>
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
                  height: `${item}%`,
                  opacity: `${ind === i ? 0.75 : 1}`
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </>
  );
}
