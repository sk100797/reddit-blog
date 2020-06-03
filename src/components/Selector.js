import React from "react";

const Selector = ({ redditValue,options,onSelect }) => {

    const handleSelectorOnChange = (e) => {
        onSelect(e.target.value)
      }

  return (
    <div>
      <h1>{redditValue}</h1>
      <select value={redditValue}  onChange={handleSelectorOnChange} >
        {options.map((option) => {
            return (
                <option value={option} key={option}>
                    {option}
                </option>
            )
        })}
      </select>
    </div>
  );
};

export default Selector
