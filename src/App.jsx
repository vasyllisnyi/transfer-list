import { useState } from 'react';
import items from './items';

import './App.scss';



function App() {



  const [leftData, setLeftData] = useState({
    items,
    checkedItems: []
  })

  const [rightData, setRightData] = useState({
    items: [],
    checkedItems: []
  })

  // all data from one side to another
  const moveAllTo = (side) => {
    if (side === "left") {
      setLeftData(prev => ({ items, checkedItems: [] }))
      setRightData(prev => ({ ...prev, items: [] }))
    } else {
      setRightData(prev => ({ checkedItems: [], items }))
      setLeftData(prev => ({ ...prev, items: [] }))
    }
  }


  // mark item as "active" or "unactive"
  const onToggleItem = (item, side) => {
    if (side === "left") {
      if (leftData.checkedItems.includes(item)) {
        setLeftData(prev => ({
          ...prev,
          checkedItems: prev.checkedItems.filter(el => el !== item)
        }))
        return
      }

      setLeftData(prev => ({
        ...prev,
        checkedItems: [...prev.checkedItems, item]
      }))

    } else {
      if (rightData.checkedItems.includes(item)) {
        setRightData(prev => ({
          ...prev,
          checkedItems: prev.checkedItems.filter(el => el !== item)
        }))
        return
      }

      setRightData(prev => ({
        ...prev,
        checkedItems: [...prev.checkedItems, item]
      }))
    }
  }

  // move from one side to another 
  const moveTo = (side) => {
    // from left to right 
    if (side === "left") {
      setRightData(prev => ({ ...prev, items: [...prev.items, ...leftData.checkedItems] }))
      setLeftData(prev => ({
        ...prev,
        items: prev.items.filter(el => !leftData.checkedItems.includes(el)),
        checkedItems: []
      }))

      // from right to left
    } else {
      setLeftData(prev => ({ ...prev, items: [...prev.items, ...rightData.checkedItems] }))
      setRightData(prev => ({
        ...prev,
        items: prev.items.filter(el => !rightData.checkedItems.includes(el)),
        checkedItems: []
      }))
    }
  }

  return (
    <div className="container">
      <div className="flex-wrapper">
        <div className="box-container">
          <div className="box-container-options">
            <h1>Left</h1>
            {leftData.items.map((item, index) => {
              return (
                <div key={index}>
                  <label
                    htmlFor={item}
                    className={`${leftData.checkedItems.includes(item) ? "checked" : ""}`}>
                    {item}
                  </label>
                  <input type="checkbox"
                    id={item}
                    value={item}
                    onChange={(e) => onToggleItem(item, "left")}
                    checked={leftData.checkedItems.includes(item) ? true : false}
                  />
                </div>
              )
            })}

          </div>
        </div>

        {/* move all to right */}
        <article className="column-wrapper">
          <button
            onClick={moveAllTo}
            disabled={!leftData.items.length}
          >
            <i className="fa-solid fa-angles-right"></i>
          </button>

          {/*  move from left to rigth  */}
          <button
            onClick={() => moveTo("left")}
            disabled={!leftData.checkedItems.length}

          >
            <i className="fas fa-chevron-right"></i>
          </button>

          {/* move from right to left */}
          <button
            onClick={moveTo}
            disabled={!rightData.checkedItems.length}
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          {/* move all from right to left */}
          <button
            onClick={() => moveAllTo("left")}
            disabled={!rightData.items.length}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
        </article>

        <div className="box-container">
          <div className="box-container-options">
            <h1>Right</h1>
            {rightData.items.map((item, index) => {
              return (
                <article key={index}>
                  <label
                    htmlFor={index}
                    className={`${rightData.checkedItems.includes(item) ? "checked" : ""}`}>
                    {item}
                  </label>
                  <input type="checkbox"
                    id={index}
                    value={item}
                    onChange={(e) => onToggleItem(item)}
                    checked={rightData.checkedItems.includes(item) ? true : false}
                  />
                </article>
              )
            })}
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
