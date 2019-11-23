import React, { useState } from "react";

const generateList = num => {
  const initItems = [];
  while (initItems.length < num) {
    let r = Math.floor(Math.random() * 100) + 1;
    if (initItems.indexOf(r) === -1) initItems.push(r);
  }
  return initItems;
};

export default function QuickSort() {
  const [isSorted, setIsSorted] = useState(false);
  const [items, setItems] = useState(generateList(20));
  const [leftState, setLeft] = useState(0);
  const [rightState, setRight] = useState(0);
  const [leftPart, setLeftPart] = useState(0);
  const [rightPart, setRightPart] = useState(0);
  const [pivotState, setPivot] = useState(0);
  const [speed, setSpeed] = useState(20);
  const [isSorting, setIsSorting] = useState(false);
  const [amount, setAmount] = useState(20);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const swap = async (current, left, right) => {
    const copyItems = [...current];
    const temp = copyItems[left];
    copyItems[left] = copyItems[right];
    copyItems[right] = temp;
    setItems(copyItems);
    await sleep(400 / speed);
    return copyItems;
  };

  const quickSort = async e => {
    e.preventDefault();
    setIsSorting(true);
    let current = [...items];

    const actualSorting = async (left, right) => {
      let mid = Math.floor((left + right) / 2);
      let pivot = current[mid];
      setPivot(mid);
      setLeft(left);
      setRight(right);
      setLeftPart(left);
      setRightPart(right);
      let index = await partition(left, right, pivot);
      if (left < index - 1) {
        await actualSorting(left, index - 1);
      }
      if (index < right) {
        await actualSorting(index, right);
      }
    };

    const partition = async (left, right, pivot) => {
      while (left <= right) {
        while (current[left] < pivot) {
          left += 1;
          setLeft(left);
          await sleep(400 / speed);
        }

        while (current[right] > pivot) {
          right -= 1;
          setRight(right);
          await sleep(400 / speed);
        }

        if (left <= right) {
          current = await swap(current, left, right);
          left += 1;
          right -= 1;
          setRight(right);
          setLeft(left);
          await sleep(400 / speed);
        }
        await sleep(400 / speed);
      }
      setItems(current);
      await sleep(400 / speed);
      return left;
    };
    await actualSorting(0, items.length - 1);

    setIsSorting(false);
    setIsSorted(true);
  };

  const reset = e => {
    e.preventDefault();
    setItems(generateList(amount));
    setRight(0);
    setLeft(0);
    setPivot(0);
    setLeftPart(0);
    setRightPart(0);
    setIsSorted(false);
  };

  const handleSpeed = e => {
    setSpeed(e.target.value);
  };

  const handleN = e => {
    setAmount(e.target.value);
    setItems(generateList(amount));
    setRight(0);
    setLeft(0);
    setPivot(0);
    setLeftPart(0);
    setRightPart(0);
    setIsSorted(false);
  };

  return (
    <>
      <div className="top-part">
        <p>Quick Sort</p>
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
      <button disabled={isSorting} onClick={isSorted ? reset : quickSort}>
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
                  background: `${
                    ind === leftState || ind === rightState
                      ? "aqua"
                      : ind === leftPart || ind === rightPart
                      ? "red"
                      : "rebeccapurple"
                  }`,
                  height: `${item}%`,
                  opacity: `${
                    ind === pivotState || ind === leftPart || ind === rightPart
                      ? 0.55
                      : 1
                  }`
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </>
  );
}
