import React, { useState } from "react";

const initItems = [2, 1, 5, 3, 4, 10, 9, 8, 22, 11];

export default function Bubble() {
  const [isSorted, setIsSorted] = useState(false);
  const [items, setItems] = useState(initItems);
  const [i, setI] = useState(0);

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
    while (!!didSwap) {
      didSwap = false;
      for (let i = 0; i < items.length; i++) {
        if (current[i] > current[i + 1]) {
          current = await swap(i, current);
          didSwap = true;
          //   console.log(items);
        }
        await sleep(550);
      }
    }
  };

  return (
    <>
      <p>Bubble</p>
      <button
        onClick={e => {
          bubbleSort(e);
        }}
      >
        Step
      </button>
      <div className="visulaizer-box">
        {items.map(item => {
          return (
            <div
              key={item}
              className="item"
              style={{ height: `${(item * 200) / items.length}px` }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </>
  );
}
