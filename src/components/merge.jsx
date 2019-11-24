import React, { useState } from "react";

const generateList = num => {
  const initItems = [];
  while (initItems.length < num) {
    let r = Math.floor(Math.random() * 100) + 1;
    if (initItems.indexOf(r) === -1) initItems.push(r);
  }
  return initItems;
};

export default function Merge() {
  const [isSorted, setIsSorted] = useState(false);
  const [items, setItems] = useState(generateList(20));
  const [leftState, setLeft] = useState(0);
  const [rightState, setRight] = useState(0);
  const [leftPart, setLeftPart] = useState(0);
  const [rightPart, setRightPart] = useState(0);
  const [indexState, setIndex] = useState(0);
  const [speed, setSpeed] = useState(20);
  const [isSorting, setIsSorting] = useState(false);
  const [amount, setAmount] = useState(20);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const mergeSort = async e => {
    e.preventDefault();
    setIsSorting(true);
    let current = [...items];
    const recursiveSplit = async (left, right) => {
      if (left >= right) return;
      setLeftPart(left);
      setRightPart(right);
      await sleep(400 / speed);
      const mid = Math.floor((left + right) / 2);
      await recursiveSplit(left, mid);
      await recursiveSplit(mid + 1, right);
      await mergeHalves(left, right);
    };

    const mergeHalves = async (leftStart, rightEnd) => {
      let leftEnd = Math.floor((rightEnd + leftStart) / 2);
      let rightStart = leftEnd + 1;
      let left = leftStart;
      let right = rightStart;
      let i = leftStart;
      setLeftPart(leftStart);
      setRightPart(rightEnd);

      while (left <= leftEnd && right <= rightEnd) {
        setLeft(left);
        setRight(right);
        if (current[left] <= current[right]) {
          left += 1;
          setLeft(left);
          await sleep(400 / speed);
        } else {
          let value = current[right];
          i = right;
          setIndex(i);
          while (i !== left) {
            current[i] = current[i - 1];
            i -= 1;
            setIndex(i);
            setItems(current);
            await sleep(400 / speed);
          }
          current[left] = value;

          left += 1;
          leftEnd += 1;
          right += 1;
          setLeft(left);
          setRight(right);
          setItems(current);
          await sleep(400 / speed);
        }
        setLeft(left);
        setRight(right);
        setItems(current);
        await sleep(400 / speed);
      }
    };
    await recursiveSplit(0, current.length - 1);

    setIsSorting(false);
    setIsSorted(true);
  };

  const reset = e => {
    e.preventDefault();
    setItems(generateList(amount));
    setRight(0);
    setLeft(0);
    setIndex(0);
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
    setIndex(0);
    setLeftPart(0);
    setRightPart(0);
    setIsSorted(false);
  };

  return (
    <>
      <div className="top-part">
        <p>Merge Sort (In Place)</p>
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
      <button disabled={isSorting} onClick={isSorted ? reset : mergeSort}>
        {isSorted ? "Reset" : "Sort"}
      </button>

      <div className="visulaizer-box">
        {items.map((item, ind) => {
          return (
            <div
              key={`${item} + ${ind}`}
              className="item-wrapper"
              style={{
                width: `${100 / items.length}%`
              }}
            >
              <div
                className="item"
                style={{
                  background: `${
                    ind === leftPart || ind === rightPart
                      ? "red"
                      : "rebeccapurple"
                  }`,
                  height: `${item}%`,
                  opacity: `${
                    ind === indexState || ind === leftPart || ind === rightPart
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
